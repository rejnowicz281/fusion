"use client";

import useAuthContext from "@/providers/auth-provider";
import { createClient } from "@/utils/supabase/client";
import { RealtimePresenceState } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { FC, createContext, useContext, useEffect, useState } from "react";

type PresenceContextType = {
    togglePresence: () => void;
    loggedUsers: Set<string>;
    setLoggedUsers: React.Dispatch<React.SetStateAction<Set<string>>>;
    presenceEnabled: boolean;
    setPresenceEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn: (userId: string) => boolean;
};

type PresenceProviderProps = {
    children: React.ReactNode;
};

type PresenceStateType = {
    [key: string]: [
        {
            user_id: string;
            presence_ref: string;
        }
    ];
};

const PresenceContext = createContext<PresenceContextType | null>(null);

export const PresenceProvider: FC<PresenceProviderProps> = ({ children }) => {
    const router = useRouter();
    const supabase = createClient();
    const { user } = useAuthContext();
    const [loggedUsers, setLoggedUsers] = useState<Set<string>>(new Set());
    const [presenceEnabled, setPresenceEnabled] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;

        const saved = localStorage.getItem(`presenceEnabled-${user.id}`);

        // if the user has never toggled presence, default to true

        return saved ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        const presenceChannel = supabase.channel("presence#public");

        presenceChannel
            .on("presence", { event: "sync" }, () => {
                const newState: RealtimePresenceState<PresenceStateType> = presenceChannel.presenceState();

                const newStateArray = Object.values(newState).map((arr) => arr[0].user_id) as unknown as string[];
                const newSet = new Set(newStateArray);

                setLoggedUsers(newSet);
            })
            .subscribe(async (status) => {
                if (status !== "SUBSCRIBED") {
                    return;
                }

                if (presenceEnabled && user) await presenceChannel.track({ user_id: user.id });
            });

        return () => {
            presenceChannel.unsubscribe();
            presenceChannel.untrack();
        };
    }, [supabase, router, presenceEnabled]);

    const isLoggedIn = (userId: string) => loggedUsers.has(userId);

    const togglePresence = () => setPresenceEnabled(!presenceEnabled);

    useEffect(() => {
        localStorage.setItem(`presenceEnabled-${user.id}`, JSON.stringify(presenceEnabled));
    }, [presenceEnabled]);

    return (
        <PresenceContext.Provider
            value={{
                togglePresence,
                loggedUsers,
                setLoggedUsers,
                presenceEnabled,
                setPresenceEnabled,
                isLoggedIn
            }}
        >
            {children}
        </PresenceContext.Provider>
    );
};

const usePresenceContext = () => {
    const context = useContext(PresenceContext);

    if (!context) throw new Error("usePresenceContext must be used within a PresenceContext Provider");

    return context;
};

export default usePresenceContext;
