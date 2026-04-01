import useAuthContext from "@/providers/auth-provider";
import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const useRealtime = () => {
    const { user: currentUser } = useAuthContext();
    const router = useRouter();
    const supabase = createClient();

    const usersChannelRef = useRef<RealtimeChannel | null>(null);
    const messagesChannelRef = useRef<RealtimeChannel | null>(null);

    useEffect(() => {
        if (!currentUser) return;

        const initializeRealtime = async () => {
            await supabase.realtime.setAuth();

            usersChannelRef.current = supabase
                .channel("users")
                .on(
                    "postgres_changes",
                    {
                        schema: "public",
                        event: "*",
                        table: "users",
                        filter: `id=neq.${currentUser.id}`
                    },
                    (payload) => {
                        console.log("User change → refresh", payload);
                        router.refresh();
                    }
                )
                .subscribe();

            messagesChannelRef.current = supabase
                .channel("messages")
                .on(
                    "postgres_changes",
                    {
                        schema: "public",
                        event: "*",
                        table: "messages"
                    },
                    (payload) => {
                        console.log("Message change → refresh", payload);
                        router.refresh();
                    }
                )
                .subscribe();
        };

        initializeRealtime();

        return () => {
            if (usersChannelRef.current) {
                supabase.removeChannel(usersChannelRef.current);

                usersChannelRef.current = null;
            }
            if (messagesChannelRef.current) {
                supabase.removeChannel(messagesChannelRef.current);

                messagesChannelRef.current = null;
            }
        };
    }, [currentUser]);
};

export default useRealtime;
