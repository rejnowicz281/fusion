"use client";

import useAuthContext from "@/providers/auth-provider";
import FreshDataProvider from "@/providers/fresh-data-provider";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import { assignTimestamp } from "@/utils/general/generate-timestamps";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FC, useEffect, useOptimistic, useTransition } from "react";
import CreateMessage from "./create-message";
import MessagesList from "./messages-list";
import TopSection from "./top-section";

type ChatContainerProps = {
    messages: Message[];
    recipient: User;
};

const ChatContainer: FC<ChatContainerProps> = ({ messages, recipient }) => {
    const { user } = useAuthContext();
    const [isPending, startTransition] = useTransition();
    const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);

    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        if (recipient.id === user.id) return;

        const messagesChannel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "*",
                    table: "messages",
                    filter: `recipient_id=eq.${user.id}`,
                },
                (payload) => {
                    console.log("Change received, refreshing router", payload.new);
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

    function addOptimisticMessage(text: string, sender = user) {
        const message = {
            id: Math.random().toString(),
            text,
            sender,
            loading: true,
            created_at: new Date().toISOString(),
        };

        setOptimisticMessages((messages) => {
            const lastMessage = messages[messages.length - 1];
            assignTimestamp(message, lastMessage);

            return [...messages, message];
        });
    }

    function deleteOptimisticMessage(id: string) {
        setOptimisticMessages((messages) => {
            const messageIndex = messages.findIndex((message) => message.id === id);
            assignTimestamp(messages[messageIndex + 1], messages[messageIndex - 1]);

            return messages.filter((message) => message.id !== id);
        });
    }

    return (
        <FreshDataProvider>
            <TopSection recipient={recipient} />
            <MessagesList messages={optimisticMessages} deleteOptimisticMessage={deleteOptimisticMessage} />
            <CreateMessage recipient={recipient} messages={messages} addOptimisticMessage={addOptimisticMessage} />
        </FreshDataProvider>
    );
};

export default ChatContainer;
