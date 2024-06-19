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

const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | undefined>();
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [refreshToken, setRefreshToken] = useState<string | undefined>();
    const [tokenExpiration, setTokenExpiration] = useState<{ auth: number, refresh: number } | undefined>();
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        //See if any user data is in storage
        const userJson = localStorage.getItem("user");
        const storedUser: User = userJson ? JSON.parse(userJson) : undefined;
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        const tokenExpirationJson = localStorage.getItem("tokenExpiration");
        const storedTokenExpiration = tokenExpirationJson ? JSON.parse(tokenExpirationJson) : undefined;

        if (storedUser && storedAccessToken && storedRefreshToken) {
            setUser(storedUser);
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            setTokenExpiration(storedTokenExpiration);
        }
        setLoaded(true);

    }, []);

    // Update stored tokens
    useEffect(() => {
        if (user && accessToken && refreshToken) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("tokenExpiration", JSON.stringify(tokenExpiration));
        }
    }, [user, accessToken, refreshToken, tokenExpiration]);

    const login = () => {
        // Redirect logic to Discord OAuth URL
        window.location.href = `https://discord.com/oauth2/authorize?client_id=1037090073222598736&response_type=code&redirect_uri=${import.meta.env.VITE_BASE_URL}%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds+email&client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}`;
    };

    const logout = () => {
        setUser(undefined);
        setAccessToken(undefined);
        setRefreshToken(undefined);
        setTokenExpiration(undefined);

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tokenExpiration");
    };

    useEffect(() => {
        const handleDiscordCallback = async () => {
            // Check if the current route is the Discord callback route
            if (location.pathname === import.meta.env.VITE_HOMEPAGE_DIRECTORY + "auth/discord/callback") {
                const searchParams = new URLSearchParams(location.search);
                const code = searchParams.get("code");
                navigate("/");
                if (code) {
                    // Make a request to your backend to exchange the code for an access token
                    try {
                        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({code}),
                        });

                        if (response.ok) {
                            const data = await response.json();
                            setUser(data.user);
                            setAccessToken(data.tokens.access_token);
                            setRefreshToken(data.tokens.refresh_token);
                            setTokenExpiration(data.expiration);
                        } else {
                            console.error("Token exchange failed");
                        }
                    } catch (error) {
                        console.error("Error during token exchange:", error);
                    }
                }
            }
        };

        handleDiscordCallback();
    }, [navigate]);

    useEffect(() => {
        // If the auth token has expired, fetch a new one
        const checkTokenExpiration = async () => {
            if (user) {
                if (tokenExpiration && tokenExpiration.auth < Date.now()) {
                    if (tokenExpiration.refresh > Date.now()) {
                        try {
                            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({refresh_token: refreshToken}),
                            });

                            if (response.ok) {
                                const data = await response.json();
                                setUser(data.user);
                                setAccessToken(data.tokens.access_token);
                                setRefreshToken(data.tokens.refresh_token);
                                setTokenExpiration(data.expiration);
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
        };

        checkTokenExpiration();
    }, [refreshToken, tokenExpiration, user]);

    return <AuthContext.Provider
        value={{user, login, logout, loaded, accessToken, refreshToken}}>{children}</AuthContext.Provider>;
};

export {AuthContext, AuthProvider};
