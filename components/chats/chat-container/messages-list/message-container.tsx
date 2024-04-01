import deleteMessage from "@/actions/chats/modify/delete-message";
import Avatar from "@/components/general/avatar";
import SubmitButton from "@/components/general/submit-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { bobEmail } from "@/constants/bob";
import useAuthContext from "@/providers/auth-provider";
import useChatContext from "@/providers/chat-provider";
import { Message } from "@/types/message";
import formatMessageDate from "@/utils/general/format-message-date";
import { AiOutlineLoading } from "@react-icons/all-files/ai/AiOutlineLoading";
import { RiDeleteBinLine } from "@react-icons/all-files/ri/RiDeleteBinLine";
import clsx from "clsx";
import { FC } from "react";

type MessageContainerProps = {
    message: Message;
    previousMessageCreatedDate: string | null;
    nextMessageCreatedDate: string | null;
};

const MessageContainer: FC<MessageContainerProps> = ({
    message,
    previousMessageCreatedDate,
    nextMessageCreatedDate,
}) => {
    const { user } = useAuthContext();
    const { deleteOptimisticMessage, talkingToBob } = useChatContext();

    const isSender = message.sender.id === user.id;

    const handleDelete = async (formData: FormData) => {
        const idFormData = formData.get("id");
        const id = typeof idFormData === "string" ? idFormData : "";
        if (id) {
            deleteOptimisticMessage(id);
            deleteMessage(formData);
        }
    };

    const isContinuation = (date: string | null) => {
        const timeSincePreviousMessage = date
            ? Math.abs(new Date(message.created_at).getTime() - new Date(date).getTime())
            : null;

        // if date given is less than a minute from this message, it is a continuation of this message
        return timeSincePreviousMessage ? timeSincePreviousMessage < 60000 : false;
    };

    const previousMessageContinuation = isContinuation(previousMessageCreatedDate);

    const nextMessageContinuation = isContinuation(nextMessageCreatedDate);

    const showAvatar = !isSender && !nextMessageContinuation;

    return (
        <div
            className={clsx(
                previousMessageContinuation ? "mt-1" : "mt-4",
                "group flex gap-4",
                isSender ? "flex-row-reverse" : "flex-row"
            )}
        >
            {showAvatar && (
                <Tooltip>
                    <TooltipContent>{message.sender.display_name}</TooltipContent>
                    <TooltipTrigger asChild>
                        <div className="self-end">
                            <Avatar
                                aiMode={message.sender.ai_mode}
                                avatarSize={40}
                                src={message.sender.avatar_url}
                                markerSize={12}
                                userId={message.sender.id}
                            />
                        </div>
                    </TooltipTrigger>
                </Tooltip>
            )}
            <Tooltip>
                <TooltipContent>{formatMessageDate(message.created_at)}</TooltipContent>
                <TooltipTrigger asChild>
                    <div
                        className={clsx(
                            nextMessageContinuation && (isSender ? "rounded-br-md" : "rounded-bl-md ml-14"),
                            previousMessageContinuation && (isSender ? "rounded-tr-md" : "rounded-tl-md"),
                            isSender ? "bg-blue-500" : "bg-zinc-600 dark:bg-[rgb(43,43,43)]",
                            "p-2.5 rounded-3xl flex items-center justify-center text-white word-break xl:max-w-[700px]"
                        )}
                    >
                        {message.text}
                    </div>
                </TooltipTrigger>
            </Tooltip>

            {(isSender || message.sender.email === bobEmail) && (
                <div className={clsx(isSender && "ml-6", "self-center")}>
                    {message.loading ? (
                        <AiOutlineLoading className="animate-spin" />
                    ) : (
                        <form action={handleDelete}>
                            <input type="hidden" name="id" value={message.id} />
                            <SubmitButton
                                className="text-gray-500 opacity-0 transition-opacity group-hover:opacity-100"
                                content={<RiDeleteBinLine />}
                                loading={<AiOutlineLoading className="animate-spin" />}
                            />
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default MessageContainer;
