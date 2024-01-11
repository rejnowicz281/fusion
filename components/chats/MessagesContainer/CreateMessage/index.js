"use client";

import { createMessage } from "@/actions/chats";
import useAuthContext from "@/providers/AuthProvider";
import { useRef } from "react";
import css from "./index.module.css";

export default function CreateMessage({ recipientId, addOptimisticMessage }) {
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
        <form className={css.form} ref={formRef} action={handleAction}>
            <input type="hidden" name="recipient_id" value={recipientId} />
            <input placeholder="Type your message here..." className={css.input} type="text" name="text" />
            <button className={css.submit}>SEND</button>
        </form>
    );
}
