import useAuthContext from "@/providers/auth-provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRealtime = () => {
    const { user: currentUser } = useAuthContext();

    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const messagesChannel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "*",
                    table: "messages",
                    filter: `sender_id=neq.${currentUser.id}`, // only listen for messages not sent by the current user (those are revalidated on the server-side)
                },
                (payload) => {
                    console.log("Change received, refreshing router", payload);
                    router.refresh();
                }
            )
            .subscribe();

        console.log("Connected to messages channel", messagesChannel.topic);

        return () => {
            supabase.removeChannel(messagesChannel);
        };
    }, [supabase, router]);
};

export default useRealtime;
