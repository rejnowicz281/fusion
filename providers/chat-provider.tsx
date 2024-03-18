"use client";

import useAuthContext from "@/providers/auth-provider";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import { assignTimestamp } from "@/utils/general/generate-timestamps";
import { FC, ReactNode, createContext, useContext, useOptimistic } from "react";

const ChatContext = createContext<{
    addOptimisticMessage: (text: string, sender?: any) => void;
    deleteOptimisticMessage: (id: string) => void;
    optimisticMessages: Message[];
    recipient: User;
} | null>(null);

export const ChatProvider: FC<{
    initialMessages: Message[];
    recipient: User;
    children: ReactNode;
}> = ({ initialMessages, recipient, children }) => {
    const { user } = useAuthContext();
    const [optimisticMessages, setOptimisticMessages] = useOptimistic(initialMessages);

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
        <ChatContext.Provider
            value={{
                addOptimisticMessage,
                deleteOptimisticMessage,
                optimisticMessages,
                recipient,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useChatContext = () => {
    const context = useContext(ChatContext);

    if (!context) throw new Error("useChat must be used within a ChatProvider");

    return context;
};

export default useChatContext;
