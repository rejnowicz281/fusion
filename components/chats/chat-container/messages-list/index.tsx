"use client";

import { Message } from "@/types/message";
import formatMessageDate from "@/utils/general/format-message-date";
import { FC, useEffect, useRef } from "react";
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
        <div className="flex flex-col flex-1 relative">
            {messages.length > 0 ? (
                <div
                    ref={messagesRef}
                    className="p-4 absolute inset-0 overflow-auto word-break flex flex-col flex-1 gap-5"
                >
                    {messages.map((message) => (
                        <>
                            {message.timestamp && (
                                <div className="text-center text-neutral-600">
                                    {formatMessageDate(message.created_at)}
                                </div>
                            )}
                            <MessageContainer message={message} deleteOptimisticMessage={deleteOptimisticMessage} />
                        </>
                    ))}
                </div>
            ) : (
                <div className="p-4 flex-1 flex justify-center items-center font-semibold text-center">
                    <p>This chat is empty... How about writing a message?</p>
                </div>
            )}
        </div>
    );
};

export default MessagesList;
