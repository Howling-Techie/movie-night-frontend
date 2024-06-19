import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import User from "../interfaces/User.ts";

interface AuthContextProps {
    user: undefined | User,
    loaded: boolean,
    accessToken: string | undefined,
    refreshToken: string | undefined,
    login: () => void,
    logout: () => void,
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Constants for the OAuth URL and the headers required in the fetch calls
const DISCORD_OAUTH_URL = `https://discord.com/oauth2/authorize?client_id=1037090073222598736&response_type=code&redirect_uri=${import.meta.env.VITE_BASE_URL}%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds+email&client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}`;
const POST_HEADERS = {
    "Content-Type": "application/json",
};

interface stateInterface {
    user: User | undefined,
    accessToken: string | undefined,
    refreshToken: string | undefined,
    tokenExpiration: { auth: number, refresh: number } | undefined
}

const initialState: stateInterface = {
    user: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    tokenExpiration: undefined,
};

const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [state, setState] = useState(initialState);
    const {user, accessToken, refreshToken, tokenExpiration} = state;
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    // function to reset the state and localStorage
    const resetState = () => {
        setState(initialState);
        Object.keys(initialState).forEach(key => localStorage.removeItem(key));
    };

    // initialization useEffect
    useEffect(() => {
        const savedState = Object.keys(initialState)
            .reduce((acc, key) => {
                const item = localStorage.getItem(key);
                if (item !== null) {
                    try {
                        // @ts-expect-error error catcher in place in case unexpected item is returned
                        acc[key] = JSON.parse(item);
                    } catch {
                        resetState();
                    }
                }
                return acc;
            }, {...initialState});
        setState(savedState);
        setLoaded(true);
    }, []);

    // storage useEffect
    useEffect(() => {
        if (user && accessToken && refreshToken) {
            Object.entries(state)
                .forEach(([key, value]) => localStorage.setItem(key, JSON.stringify(value)));
        }
    }, [state]);

    const login = () => window.location.href = DISCORD_OAUTH_URL;

    const logout = resetState;

    // discord callback useEffect
    useEffect(() => {
        (async () => {
            if (location.pathname === import.meta.env.VITE_HOMEPAGE_DIRECTORY + "auth/discord/callback") {
                const searchParams = new URLSearchParams(location.search);
                const code = searchParams.get("code");
                navigate("/");
                if (code) {
                    try {
                        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
                            method: "POST",
                            headers: POST_HEADERS,
                            body: JSON.stringify({code}),
                        });
                        if (response.ok) {
                            const data = await response.json();
                            setState({
                                user: data.user,
                                accessToken: data.tokens.access_token,
                                refreshToken: data.tokens.refresh_token,
                                tokenExpiration: data.expiration,
                            });
                        } else {
                            console.error("Token exchange failed");
                        }
                    } catch (error) {
                        console.error("Error during token exchange:", error);
                    }
                }
            }
        })();
    }, [navigate]);

    // token expiration useEffect
    useEffect(() => {
        (async () => {
            if (user && tokenExpiration) {
                if (tokenExpiration.auth < Date.now()) {
                    if (tokenExpiration.refresh > Date.now()) {
                        try {
                            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
                                method: "POST",
                                headers: POST_HEADERS,
                                body: JSON.stringify({refresh_token: refreshToken}),
                            });
                            if (response.ok) {
                                const data = await response.json();
                                setState({
                                    user: data.user,
                                    accessToken: data.tokens.access_token,
                                    refreshToken: data.tokens.refresh_token,
                                    tokenExpiration: data.expiration,
                                });
                            } else {
                                logout();
                            }
                        } catch (error) {
                            logout();
                        }
                    } else {
                        logout();
                    }
                }
            }
        })();
    }, [state]);

    return <AuthContext.Provider value={{...state, login, logout, loaded}}>{children}</AuthContext.Provider>;
};

export {AuthContext, AuthProvider};
