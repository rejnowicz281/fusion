"use client";

import _generatePrompt, { generateInitialPrompts as _generateInitialPrompts } from "@/actions/prompt";
import { bobEmail } from "@/constants/bob";
import useAuthContext from "@/providers/auth-provider";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import { assignTimestamp } from "@/utils/general/generate-timestamps";
import { FC, ReactNode, createContext, useContext, useOptimistic, useState } from "react";
import useSettingsContext from "./settings-provider";

const ChatContext = createContext<{
    addOptimisticMessage: (text: string, sender?: any) => void;
    deleteOptimisticMessage: (id: string) => void;
    optimisticMessages: Message[];
    recipient: User;
    expandPrompts: boolean;
    setExpandPrompts: React.Dispatch<React.SetStateAction<boolean>>;
    toggleExpandPrompts: () => void;
    generatePrompt: () => Promise<string> | string;
    generateInitialPrompts: () => Promise<string[]> | string[];
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
    const { englishPrompts } = useSettingsContext();

    const talkingToSelf = user.id === recipient.id;
    const talkingToBob = recipient.email === bobEmail;

    const toggleExpandPrompts = () => setExpandPrompts((expand) => !expand);

    const toggleHelperSection = () => setShowHelperSection((show) => !show);

    const generatePrompt = () => {
        if (talkingToSelf) return "Am I really talking to myself? I need to get some sleep.";
        else return _generatePrompt(user, recipient, optimisticMessages, englishPrompts).then((res) => res.prompt);
    };

    const generateInitialPrompts = () => {
        if (talkingToSelf) {
            const prompt = "Am I really talking to myself? I need to get some sleep.";

            return [prompt, prompt, prompt];
        } else
            return _generateInitialPrompts(user, recipient, optimisticMessages, englishPrompts).then(
                (res) => res.prompts
            );
    };

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
                talkingToSelf,
                addOptimisticMessage,
                deleteOptimisticMessage,
                optimisticMessages,
                recipient,
                toggleExpandPrompts,
                expandPrompts,
                setExpandPrompts,
                generatePrompt,
                generateInitialPrompts,
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
