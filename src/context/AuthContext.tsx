import React, {createContext, useContext, useEffect, useState} from 'react';

interface User {
    username: string,
    displayName: string,
    avatar: string,
    banner: string,
    banner_color: string,
}

interface AuthContextProps {
    user: null | User;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    const login = () => {
        // Redirect logic to Discord OAuth URL
        window.location.href = `https://discord.com/oauth2/authorize?prompt=consent&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fdiscord%2Fcallback&scope=identify%20email%20guilds&client_id=${process.env.DISCORD_CLIENT_ID}`;
    };

    const logout = () => {
        // Implement logout logic if needed
        setUser(null);
    };

    useEffect(() => {
        const handleDiscordCallback = async () => {
            // Check if the current route is the Discord callback route
            if (location.pathname === '/auth/discord/callback') {
                const searchParams = new URLSearchParams(location.search);
                const code = searchParams.get('code');

                if (code) {
                    // Make a request to your backend to exchange the code for an access token
                    try {
                        const response = await fetch('http://localhost:5000/api/discord', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({code}),
                        });

                        if (response.ok) {
                            // Handle the response as needed
                            const data = await response.json();
                            console.log('Token exchange successful:', data);

                            // Set the user state using setUser()
                            setUser(data);
                        } else {
                            console.error('Token exchange failed');
                        }
                    } catch (error) {
                        console.error('Error during token exchange:', error);
                    }
                }
            }
        };

        handleDiscordCallback();
    }, [location.search]);

    return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
