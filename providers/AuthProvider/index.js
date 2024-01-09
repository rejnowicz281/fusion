"use client";

import { createContext, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children, user }) {
    return (
        <AuthContext.Provider
            value={{
                user: {
                    ...user,
                    avatar_url: user.user_metadata.avatar_url,
                    display_name:
                        user.user_metadata.preferred_username ||
                        user.user_metadata.user_name ||
                        user.user_metadata.username ||
                        user.user_metadata.name ||
                        user.user_metadata.full_name ||
                        user.user_metadata.email,
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuthContext must be used within a AuthContext Provider");

    return context;
}
