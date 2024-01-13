"use client";

import { createBookmark, deleteBookmark } from "@/actions/bookmarks";
import AsyncButton from "@/components/general/AsyncButton";
import PresenceAvatar from "@/components/general/PresenceAvatar";
import { assignTimestamp } from "@/utils/general/generateTimestamps";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useOptimistic, useTransition } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { IoStar, IoStarOutline } from "react-icons/io5";
import CreateMessage from "./CreateMessage";
import MessagesList from "./MessagesList";
import css from "./index.module.css";

export default function MessagesContainer({ messages, recipient }) {
    const [isPending, startTransition] = useTransition();
    const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);

    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const messagesChannel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "*",
                    table: "messages",
                    filter: `sender_id=eq.${recipient.id}`,
                },
                (payload) => {
                    console.log("Change received", payload.new);
                    router.refresh();
                }
            )
            .subscribe();

        console.log("Connected to messages channel", messagesChannel.topic);

        return () => {
            supabase.removeChannel(messagesChannel);
        };
    }, [supabase, router]);

    useEffect(() => {
        startTransition(() => {
            setOptimisticMessages(messages); // Ensure messages update
        });
    }, [messages]);

    function addOptimisticMessage(message) {
        setOptimisticMessages((messages) => {
            const lastMessage = messages[messages.length - 1];
            assignTimestamp(message, lastMessage);

            return [...messages, message];
        });
    }

    function deleteOptimisticMessage(id) {
        setOptimisticMessages((messages) => {
            const messageIndex = messages.findIndex((message) => message.id === id);
            assignTimestamp(messages[messageIndex + 1], messages[messageIndex - 1]);

            return messages.filter((message) => message.id !== id);
        });
    }

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <div className={css.top}>
                    <div className={css["top-left"]}>
                        <PresenceAvatar
                            className={css["recipient-avatar"]}
                            width={60}
                            height={60}
                            src={recipient.avatar_url}
                            userId={recipient.id}
                            alt={recipient.display_name}
                        />
                        <div className={css["recipient-info"]}>
                            <div className={css["recipient-name"]}>{recipient.display_name}</div>
                            {recipient.email !== recipient.display_name && (
                                <div className={css["recipient-email"]}>{recipient.email}</div>
                            )}
                        </div>
                    </div>
                    <div className={css["top-right"]}>
                        <AsyncButton
                            className={css["bookmark-button"]}
                            content={recipient.bookmark ? <IoStar /> : <IoStarOutline />}
                            loading={<AiOutlineLoading className={css["bookmark-loading"]} />}
                            onClick={async () => {
                                recipient.bookmark
                                    ? await deleteBookmark(recipient.bookmark)
                                    : await createBookmark(recipient.id);
                            }}
                        />
                    </div>
                </div>
                <MessagesList messages={optimisticMessages} deleteOptimisticMessage={deleteOptimisticMessage} />

                <CreateMessage recipient={recipient} messages={messages} addOptimisticMessage={addOptimisticMessage} />
            </div>
        </div>
    );
}
