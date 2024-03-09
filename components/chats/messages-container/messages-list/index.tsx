"use client";

import { Message } from "@/types/message";
import formatMessageDate from "@/utils/general/format-message-date";
import { FC, useEffect, useRef } from "react";
import css from "./index.module.css";
import MessageContainer from "./message-container";

type MessagesListProps = {
    messages: Message[];
    deleteOptimisticMessage: (messageId: string) => void;
};

const MessagesList: FC<MessagesListProps> = ({ messages, deleteOptimisticMessage }) => {
    const messagesRef = useRef<HTMLDivElement>(null);
    const previousMessageCount = useRef(0);

    useEffect(() => {
        if (messages && messagesRef.current) {
            const container = messagesRef.current;
            const currentMessageCount = messages.length;

            // Scroll down only if a new message is added
            if (currentMessageCount > previousMessageCount.current) {
                const lastMessage = container.lastElementChild;
                if (lastMessage) lastMessage.scrollIntoView({ behavior: "smooth" });
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
                            <MessageContainer message={message} deleteOptimisticMessage={deleteOptimisticMessage} />
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
};

export default MessagesList;
