import useAuthContext from "@/providers/auth-provider";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRealtime = () => {
    const { user: currentUser } = useAuthContext();

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const usersChannel = supabase
            .channel("users")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "*",
                    table: "users",
                    filter: `id=neq.${currentUser.id}` // only listen for changes not related to the current user (those are revalidated on the server-side)
                },
                (payload) => {
                    console.log("User Change received, refreshing router", payload);
                    router.refresh();
                }
            )
            .subscribe();

        const messagesChannel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "*",
                    table: "messages"
                },
                (payload) => {
                    console.log("Messages Change received, refreshing router", payload);
                    router.refresh();
                }
            )
            .subscribe();

        console.log("Connected to messages channel", messagesChannel.topic);
        console.log("Connected to users channel", usersChannel.topic);

        return () => {
            supabase.removeChannel(messagesChannel);
            supabase.removeChannel(usersChannel);
        };
    }, [supabase, router]);
};

export default useRealtime;
