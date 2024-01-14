"use client";

import { createMessage } from "@/actions/chats";
import generatePrompt from "@/actions/prompt";
import AsyncButton from "@/components/general/AsyncButton";
import useAuthContext from "@/providers/AuthProvider";
import { useRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { TbPrompt } from "react-icons/tb";
import css from "./index.module.css";

export default function CreateMessage({ recipient, addOptimisticMessage, messages }) {
    const formRef = useRef(null);
    const { user } = useAuthContext();

    function handleAction(formData) {
        const text = formData.get("text");
        if (!text) return;

        const optimisticMessage = {
            id: Math.random(),
            text,
            sender: user,
            loading: true,
            created_at: Date.now(),
        };

        addOptimisticMessage(optimisticMessage);

        formRef.current.reset();

        createMessage(formData);
    }

    return (
        <div className={css.container}>
            <AsyncButton
                onClick={async () => alert(await generatePrompt(user, recipient, messages))}
                className={css["prompt-button"]}
                content={<TbPrompt />}
                loading={<AiOutlineLoading className={css["prompt-loading"]} />}
            />
            <form className={css.form} ref={formRef} action={handleAction}>
                <input type="hidden" name="sender_id" value={user.id} />
                <input type="hidden" name="recipient_id" value={recipient.id} />
                <input placeholder="Type your message here..." className={css.input} type="text" name="text" />
                <button className={css.submit}>SEND</button>
            </form>
        </div>
    );
}
