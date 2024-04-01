"use client";

import generateAiMessages from "@/actions/ai/read/generate-ai-message";
import { bobEmail } from "@/constants/bob";
import useAuthContext from "@/providers/auth-provider";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import { assignTimestamp } from "@/utils/general/generate-timestamps";
import { FC, ReactNode, createContext, useContext, useOptimistic, useState } from "react";

const ChatContext = createContext<{
    addOptimisticMessage: (text: string, loading?: boolean, sender?: any) => Message;
    deleteOptimisticMessage: (id: string) => void;
    optimisticMessages: Message[];
    recipient: User;
    expandPrompts: boolean;
    setExpandPrompts: React.Dispatch<React.SetStateAction<boolean>>;
    toggleExpandPrompts: () => void;
    generatePrompts: (n: number) => Promise<string[]> | string[];
    showHelperSection: boolean;
    setShowHelperSection: React.Dispatch<React.SetStateAction<boolean>>;
    toggleHelperSection: () => void;
    talkingToBob: boolean;
    talkingToSelf: boolean;
} | null>(null);

export const ChatProvider: FC<{
    initialMessages: Message[];
    recipient: User;
    children: ReactNode;
}> = ({ initialMessages, recipient, children }) => {
    const { user } = useAuthContext();
    const [optimisticMessages, setOptimisticMessages] = useOptimistic(initialMessages);
    const [expandPrompts, setExpandPrompts] = useState(false);
    const [showHelperSection, setShowHelperSection] = useState(false);

    const talkingToSelf = user.id === recipient.id;
    const talkingToBob = recipient.email === bobEmail;

    const toggleExpandPrompts = () => setExpandPrompts((expand) => !expand);

    const toggleHelperSection = () => setShowHelperSection((show) => !show);

    const generatePrompts = (n = 1) => {
        if (talkingToSelf) {
            const prompt = "Am I really talking to myself? I need to get some sleep.";

            const prompts = Array.from({ length: n }, () => prompt);

            return prompts;
        } else {
            const prompts = generateAiMessages(recipient, user, optimisticMessages, n).then((res) => res.prompts);

            return prompts;
        }
    };

    function addOptimisticMessage(text: string, loading = true, sender = user) {
        const message = {
            id: Math.random().toString(),
            text,
            sender,
            loading,
            created_at: new Date().toISOString(),
        };

        setOptimisticMessages((messages) => {
            const lastMessage = messages[messages.length - 1];
            assignTimestamp(message, lastMessage);

            return [...messages, message];
        });

        return message;
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
                talkingToSelf,
                addOptimisticMessage,
                deleteOptimisticMessage,
                optimisticMessages,
                recipient,
                toggleExpandPrompts,
                expandPrompts,
                setExpandPrompts,
                generatePrompts,
                showHelperSection,
                setShowHelperSection,
                talkingToBob,
                toggleHelperSection,
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
