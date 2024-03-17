"use client";

import createMessage from "@/actions/chats/modify/create-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthContext from "@/providers/auth-provider";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import { FC, useRef } from "react";

type CreateMessageProps = {
    recipient: User;
    addOptimisticMessage: (text: string) => void;
    messages: Message[];
};

const CreateMessage: FC<CreateMessageProps> = ({ recipient, addOptimisticMessage, messages }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { user } = useAuthContext();

    const handleSend = (formData: FormData) => {
        const textFormData = formData.get("text");

        const text = typeof textFormData === "string" ? textFormData.trim() : null;

        if (text) {
            addOptimisticMessage(text);

            createMessage(formData);

            formRef.current?.reset();
        }
    };

    return (
        <div className="border-t border-t-neutral-300 dark:border-t-neutral-800 flex items-center justify-center">
            <form className="flex-1 flex items-center justify-center" ref={formRef} action={handleSend}>
                <input type="hidden" name="sender_id" value={user.id} />
                <input type="hidden" name="recipient_id" value={recipient.id} />
                <Input
                    className="text-md py-8 rounded-none dark:bg-inherit border-none"
                    placeholder="Type your message here..."
                    type="text"
                    name="text"
                />
                <Button
                    className="text-md py-8 rounded-none text-blue-500 hover:text-blue-500 dark:hover:text-blue-500 font-bold"
                    variant="ghost"
                >
                    SEND
                </Button>
            </form>
        </div>
    );
};

export default CreateMessage;
