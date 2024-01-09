"use client";

import useAuthContext from "@/providers/AuthProvider";
import removeDuplicates from "@/utils/general/removeDuplicates";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const PresenceContext = createContext();

export function PresenceProvider({ children }) {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const { user } = useAuthContext();
    const [loggedUsers, setLoggedUsers] = useState([]);
    const [presenceEnabled, setPresenceEnabled] = useState(true);

    useEffect(() => {
        const presenceChannel = supabase.channel("presence#public");

        presenceChannel
            .on("presence", { event: "sync" }, () => {
                const newState = presenceChannel.presenceState();
                console.log("sync", newState);
                const newStateArray = Object.values(newState).map((arr) => arr[0].user_id);
                const pushArray = removeDuplicates(newStateArray);
                setLoggedUsers(pushArray);
            })
            .subscribe(async (status) => {
                if (status !== "SUBSCRIBED") {
                    return;
                }

                if (presenceEnabled) {
                    const presenceTrackStatus = await presenceChannel.track({ user_id: user.id });
                    console.log("Presence Track Status -", presenceTrackStatus);
                }
            });

        return () => {
            presenceChannel.unsubscribe();
            presenceChannel.untrack();
        };
    }, [supabase, router, presenceEnabled]);

    function togglePresence() {
        setPresenceEnabled(!presenceEnabled);
    }

    return (
        <PresenceContext.Provider
            value={{
                togglePresence,
                loggedUsers,
                setLoggedUsers,
                presenceEnabled,
                setPresenceEnabled,
            }}
        >
            {children}
        </PresenceContext.Provider>
    );
}

export default function usePresenceContext() {
    const context = useContext(PresenceContext);

    if (!context) throw new Error("usePresenceContext must be used within a PresenceContext Provider");

    return context;
}
