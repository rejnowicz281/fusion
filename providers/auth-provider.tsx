"use client";

import { User } from "@/types/user";
import { FC, createContext, useContext } from "react";

type AuthProviderProps = {
    children: React.ReactNode;
    user: User;
};

const AuthContext = createContext<{ user: User } | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children, user }) => {
    return (
        <AuthContext.Provider
            value={{
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuthContext must be used within a AuthContext Provider");

    return context;
};

export default useAuthContext;
