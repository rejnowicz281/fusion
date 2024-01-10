"use client";

import PresenceAvatar from "@/components/general/PresenceAvatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useOptimistic, useTransition } from "react";
import CreateMessage from "./CreateMessage";
import MessagesList from "./MessagesList";
import css from "./index.module.css";

export default function MessagesContainer({ messages, recipient }) {
    const [isPending, startTransition] = useTransition();
    const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);

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
                    filter: `sender_id=eq.${recipient.id}`,
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
        startTransition(() => {
            setOptimisticMessages(messages); // Ensure messages update
        });
    }, [messages]);

    function addOptimisticMessage(message) {
        setOptimisticMessages((messages) => [...messages, message]);
    }

    function deleteOptimisticMessage(id) {
        setOptimisticMessages((messages) => messages.filter((message) => message.id !== id));
    }

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <div className={css.top}>
                    <PresenceAvatar
                        className={css["recipient-avatar"]}
                        width={60}
                        height={60}
                        src={recipient.avatar_url}
                        userId={recipient.id}
                        alt={recipient.display_name}
                    />
                    <div className={css["recipient-info"]}>
                        <div className={css["recipient-name"]}>{recipient.display_name}</div>
                        {recipient.email !== recipient.display_name && (
                            <div className={css["recipient-email"]}>{recipient.email}</div>
                        )}
                    </div>
                </div>
                <MessagesList messages={optimisticMessages} deleteOptimisticMessage={deleteOptimisticMessage} />

                <CreateMessage recipientId={recipient.id} addOptimisticMessage={addOptimisticMessage} />
            </div>
        </div>
    );
}
