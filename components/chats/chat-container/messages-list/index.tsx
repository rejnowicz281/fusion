"use client";

import useChatContext from "@/providers/chat-provider";
import formatMessageDate from "@/utils/general/format-message-date";
import clsx from "clsx";
import { Fragment, useEffect, useRef } from "react";
import MessageContainer from "./message-container";

const MessagesList = () => {
    const messagesRef = useRef<HTMLDivElement>(null);
    const previousMessageCount = useRef(0);
    const { optimisticMessages: messages, expandPrompts } = useChatContext();

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
        <div className={clsx(expandPrompts ? "hidden" : "flex", "flex-col flex-1 relative")}>
            {messages.length > 0 ? (
                <div ref={messagesRef} className="p-4 absolute inset-0 overflow-auto flex flex-col flex-1 gap-5">
                    {messages.map((message) => (
                        <Fragment key={message.id}>
                            {message.timestamp && (
                                <div className="text-center text-neutral-600">
                                    {formatMessageDate(message.created_at)}
                                </div>
                            )}
                            <MessageContainer message={message} />
                        </Fragment>
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
