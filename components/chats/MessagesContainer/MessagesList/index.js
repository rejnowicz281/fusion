"use client";

import formatMessageDate from "@/utils/general/formatMessageDate";
import { useEffect, useRef } from "react";
import Message from "./Message";
import css from "./index.module.css";

export default function MessagesList({ messages, deleteOptimisticMessage }) {
    const messagesRef = useRef(null);
    const previousMessageCount = useRef(0);

    useEffect(() => {
        if (messages && messagesRef.current) {
            const container = messagesRef.current;
            const currentMessageCount = messages.length;

            // Scroll down only if a new message is added
            if (currentMessageCount > previousMessageCount.current) {
                const lastMessage = container.lastChild;
                lastMessage.scrollIntoView({ behavior: "smooth" });
            }

            previousMessageCount.current = currentMessageCount;
        }
    }, [messages]);

    return (
        <div className={css.wrapper}>
            <div ref={messagesRef} className={css.container}>
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <>
                            {message.timestamp && (
                                <div className={css.timestamp}>{formatMessageDate(message.created_at)}</div>
                            )}
                            <Message message={message} deleteOptimisticMessage={deleteOptimisticMessage} />
                        </>
                    ))
                ) : (
                    <div className={css["no-messages"]}>
                        <p>No messages found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
