"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useOptimistic, useTransition } from "react";
import CreateMessage from "./CreateMessage";
import MessagesList from "./MessagesList";
import css from "./index.module.css";

export default function MessagesContainer({ messages, recipientId }) {
    const [isPending, startTransition] = useTransition();
    const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);

    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const messagesChannel = supabase
            .channel(`messages`)
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "*",
                    table: "messages",
                    // add filters here
                },
                (payload) => {
                    console.log("Change received", payload.new);
                    router.refresh();
                }
            )
            .subscribe();

        console.log("Connected to messages channel", messagesChannel.topic);

        return () => {
            supabase.removeChannel(messagesChannel);
        };
    }, [supabase, router]);

    useEffect(() => {
        // Ensure that the optimistic messages are always up to date
        startTransition(() => setOptimisticMessages(messages));
    }, [messages]);

    function addOptimisticMessage(message) {
        setOptimisticMessages([...optimisticMessages, message]);
    }

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <MessagesList messages={optimisticMessages} />

                <CreateMessage addOptimisticMessage={addOptimisticMessage} recipientId={recipientId} />
            </div>
        </div>
    );
}
