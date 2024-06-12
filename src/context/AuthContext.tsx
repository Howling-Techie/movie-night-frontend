import React, {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface User {
    user_id: string,
    username: string,
    display_name: string,
    avatar: string,
    banner: string | null,
    banner_color: string,
    tokens: {
        access_token: string,
        refresh_token: string
    }
    expiration: { auth: Date, refresh: Date }
}

interface AuthContextProps {
    user: null | User;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();


    useEffect(() => {
        //See if any user data is in storage
        const checkTokenStorage = async () => {
            const userString = localStorage.getItem("user_info");
            if (userString) {
                try {
                    setUser(JSON.parse(userString));
                } catch (error) {
                    console.error("Error parsing user from local storage:", error);
                    return null;
                }
            }
        };
        if (user === null)
            checkTokenStorage();
    }, []);
    const login = () => {
        // Redirect logic to Discord OAuth URL
        window.location.href = `https://discord.com/oauth2/authorize?client_id=1037090073222598736&response_type=code&redirect_uri=${import.meta.env.VITE_BASE_URL}%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds+email&client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}`;
    };

    const logout = () => {
        localStorage.removeItem("user_info");
        setUser(null);
    };

    useEffect(() => {
        const handleDiscordCallback = async () => {
            // Check if the current route is the Discord callback route
            if (location.pathname === "/auth/discord/callback") {
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
                            // Set the user object and save the data in local storage
                            localStorage.setItem("user_info", JSON.stringify(data));
                            setUser(data);
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
    }, [location.search]);

    useEffect(() => {
        // If the auth token has expired, fetch a new one
        console.log("checking token");
        const checkTokenExpiration = async () => {
            if (user && user.expiration.auth < Date.now()) {
                if (user.expiration.refresh > Date.now()) {
                    try {
                        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({refresh_token: user.tokens.refresh_token}),
                        });

                        if (response.ok) {
                            const refreshedUser = await response.json();
                            console.log(`Applied updated user: ${JSON.stringify(refreshedUser)}`);
                            setUser(refreshedUser);
                        } else {
                            logout();
                        }
                    } catch (error) {
                        console.error("Error refreshing token:", error);
                        logout();
                    }
                } else {
                    logout();
                }
            }
        };

        checkTokenExpiration();
    }, [location]);

    return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
