"use client";

import { deleteMessage } from "@/actions/chats";
import AsyncButton from "@/components/general/AsyncButton";
import UserBox from "@/components/general/UserBox";
import useAuthContext from "@/providers/AuthProvider";
import formatMessageDate from "@/utils/general/formatMessageDate";
import { useEffect, useRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import css from "./index.module.css";

export default function MessagesList({ messages }) {
    const { user } = useAuthContext();

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
                        <div className={css.message} key={message.id}>
                            <div className={css["message-top"]}>
                                <UserBox user={message.sender} />
                                {message.created_at && (
                                    <div className={css["message-date"]}>{formatMessageDate(message.created_at)}</div>
                                )}
                            </div>
                            {message.loading ? (
                                <div className={css["message-loading"]}>
                                    Message is being sent...{" "}
                                    <AiOutlineLoading className={css["message-loading-spin"]} />
                                </div>
                            ) : (
                                message.sender.id === user.id && (
                                    <AsyncButton
                                        className={css.delete}
                                        onClick={() => deleteMessage(message.id)}
                                        content="Delete Message"
                                        loading="Deleting..."
                                    />
                                )
                            )}
                            <div className={css.content}>{message.text}</div>
                        </div>
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
