"use client";

import _generatePrompt, { generateInitialPrompts as _generateInitialPrompts } from "@/actions/prompt";
import useAuthContext from "@/providers/auth-provider";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import { assignTimestamp } from "@/utils/general/generate-timestamps";
import { FC, ReactNode, createContext, useContext, useOptimistic, useState } from "react";

const ChatContext = createContext<{
    addOptimisticMessage: (text: string, sender?: any) => void;
    deleteOptimisticMessage: (id: string) => void;
    optimisticMessages: Message[];
    recipient: User;
    expandPrompts: boolean;
    setExpandPrompts: React.Dispatch<React.SetStateAction<boolean>>;
    toggleExpandPrompts: () => void;
    generatePrompt: () => Promise<string>;
    generateInitialPrompts: () => Promise<string[]>;
} | null>(null);

export const ChatProvider: FC<{
    initialMessages: Message[];
    recipient: User;
    children: ReactNode;
}> = ({ initialMessages, recipient, children }) => {
    const { user } = useAuthContext();
    const [optimisticMessages, setOptimisticMessages] = useOptimistic(initialMessages);
    const [expandPrompts, setExpandPrompts] = useState(false);

    const toggleExpandPrompts = () => setExpandPrompts((expand) => !expand);

    const generatePrompt = () => _generatePrompt(user, recipient, optimisticMessages).then((res) => res.prompt);

    const generateInitialPrompts = () =>
        _generateInitialPrompts(user, recipient, optimisticMessages).then((res) => res.prompts);

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
                toggleExpandPrompts,
                expandPrompts,
                setExpandPrompts,
                generatePrompt,
                generateInitialPrompts,
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
