"use client";

import { createMessage } from "@/actions/chats";
import ImagePicker from "@/components/general/ImagePicker";
import useAuthContext from "@/providers/AuthProvider";
import { useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import css from "./index.module.css";

export default function CreateMessage({ recipientId, addOptimisticMessage }) {
    const formRef = useRef(null);
    const { user } = useAuthContext();

    function handleAction(formData) {
        if (!formData.get("text")) return;
        formRef.current.reset();

        const optimisticMessage = {
            id: Math.random(),
            text: formData.get("text"),
            sender: user,
            loading: true,
        };

        addOptimisticMessage(optimisticMessage);

        createMessage(formData);
    }

    return (
        <form className={css.form} ref={formRef} action={handleAction}>
            <input type="hidden" name="recipient_id" value={recipientId} />
            <label htmlFor="image">Attach an image (optional)</label>
            <div className={css["image-picker-wrapper"]}>
                <ImagePicker name="image" id="image" />
            </div>
            <div className={css["input-box"]}>
                <input placeholder="Type your message here..." className={css.input} type="text" name="text" />
                <button className={css.submit}>
                    <AiOutlineSend />
                </button>
            </div>
        </form>
    );
}
