"use client";

import createMessage from "@/actions/chats/modify/create-message";
import generatePrompt from "@/actions/prompt";
import AsyncButton from "@/components/general/async-button";
import useAuthContext from "@/providers/auth-provider";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import { FC, useRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { TbPrompt } from "react-icons/tb";
import css from "./index.module.css";

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
        <div className={css.container}>
            <AsyncButton
                onClick={async () => alert(await generatePrompt(user, recipient, messages))}
                className={css["prompt-button"]}
                content={<TbPrompt />}
                loading={<AiOutlineLoading className={css["prompt-loading"]} />}
            />
            <form className={css.form} ref={formRef} action={handleSend}>
                <input type="hidden" name="sender_id" value={user.id} />
                <input type="hidden" name="recipient_id" value={recipient.id} />
                <input placeholder="Type your message here..." className={css.input} type="text" name="text" />
                <button className={css.submit}>SEND</button>
            </form>
        </div>
    );
};

export default CreateMessage;
