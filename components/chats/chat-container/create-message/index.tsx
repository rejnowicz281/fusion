"use client";

import generateAiMessages from "@/actions/ai/read/generate-ai-messages";
import createAiMessages from "@/actions/chats/modify/create-ai-messages";
import createMessage from "@/actions/chats/modify/create-message";
import { Input } from "@/components/ui/input";
import useAuthContext from "@/providers/auth-provider";
import useChatContext from "@/providers/chat-provider";
import useSettingsContext from "@/providers/settings-provider";
import clsx from "clsx";
import { useOptimistic, useRef } from "react";
import PromptsContainer from "./prompts-container";

const CreateMessage = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { user } = useAuthContext();
    const { addOptimisticMessage, recipient, expandPrompts, setExpandPrompts, optimisticMessages, talkingToSelf } =
        useChatContext();
    const { promptsOn } = useSettingsContext();
    const [loading, setLoading] = useOptimistic(false);

    const beforeSend = () => {
        if (formRef.current) {
            const formData = new FormData(formRef.current);

            const text = formData.get("text");

            if (typeof text === "string" && text.trim().length > 0) setExpandPrompts(false);
        }
    };

    const handleSend = async (formData: FormData) => {
        const textFormData = formData.get("text");

        const text = typeof textFormData === "string" ? textFormData.trim() : null;

        if (text) {
            if (recipient.ai_mode) setLoading(true);

            formRef.current?.reset();

            const message = addOptimisticMessage(text);

            if (recipient.ai_mode && !talkingToSelf) {
                const freshMessages = [...optimisticMessages, message];

                const aiMessage = await generateAiMessages(user, recipient, freshMessages).then(
                    (res) => res.prompts[0]
                );

                if (recipient.ai_mode) setLoading(false);

                addOptimisticMessage(aiMessage, true, recipient);

                formData.append("ai_text", aiMessage);

                createAiMessages(formData, true); // create user message and AI response
            } else createMessage(formData);

            if (inputRef.current) inputRef.current.focus();
        }
    };

    return (
        <div
            className={clsx(
                expandPrompts && promptsOn && "flex flex-col flex-1",
                "border-t border-t-neutral-300 dark:border-t-neutral-800"
            )}
        >
            {promptsOn && (
                <PromptsContainer
                    onPromptClick={(text: string) => {
                        if (inputRef.current) {
                            inputRef.current.focus();
                            inputRef.current.value = text;
                        }
                    }}
                />
            )}
            <div className="flex items-center justify-center">
                <form className="flex-1 flex items-center justify-center" ref={formRef} action={handleSend}>
                    <input type="hidden" name="sender_id" value={user.id} />
                    <input type="hidden" name="recipient_id" value={recipient.id} />
                    <Input
                        className="text-md py-5 h-min rounded-none dark:bg-inherit border-none"
                        placeholder="Type your message here..."
                        type="text"
                        name="text"
                        ref={inputRef}
                        disabled={loading}
                    />
                    <button
                        disabled={loading}
                        className="text-md flex group justify-center p-3 items-center disabled:pointer-events-none disabled:opacity-50"
                        onClick={beforeSend}
                    >
                        <div className="p-2 text-blue-500 rounded-md transition-colors group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 font-bold">
                            SEND
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateMessage;
