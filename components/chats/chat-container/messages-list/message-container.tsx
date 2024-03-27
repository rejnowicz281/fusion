import deleteMessage from "@/actions/chats/modify/delete-message";
import BobAvatar from "@/components/general/bob-avatar";
import PresenceAvatar from "@/components/general/presence-avatar";
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
};

const MessageContainer: FC<MessageContainerProps> = ({ message }) => {
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

    return (
        <div className={clsx("group flex gap-4", isSender ? "flex-row-reverse" : "flex-row")}>
            {message.sender.id !== user.id && (
                <Tooltip>
                    <TooltipContent>{message.sender.display_name}</TooltipContent>
                    <TooltipTrigger asChild>
                        <div>
                            {talkingToBob ? (
                                <BobAvatar size={40} />
                            ) : (
                                <PresenceAvatar
                                    avatarSize={40}
                                    src={message.sender.avatar_url}
                                    markerSize={12}
                                    userId={message.sender.id}
                                />
                            )}
                        </div>
                    </TooltipTrigger>
                </Tooltip>
            )}
            <Tooltip>
                <TooltipContent>{formatMessageDate(message.created_at)}</TooltipContent>
                <TooltipTrigger asChild>
                    <div
                        className={clsx(
                            "p-2 rounded-2xl flex items-center justify-center text-white word-break xl:max-w-[700px]",
                            isSender ? "bg-blue-500" : "bg-zinc-600 dark:bg-[rgb(43,43,43)]"
                        )}
                    >
                        {message.text}
                    </div>
                </TooltipTrigger>
            </Tooltip>

            <div className="self-center">
                {message.loading ? (
                    <AiOutlineLoading className="animate-spin" />
                ) : (
                    (message.sender.id === user.id || message.sender.email === bobEmail) && (
                        <form action={handleDelete}>
                            <input type="hidden" name="id" value={message.id} />
                            <SubmitButton
                                className="text-gray-500 opacity-0 transition-opacity group-hover:opacity-100"
                                content={<RiDeleteBinLine />}
                                loading={<AiOutlineLoading className="animate-spin" />}
                            />
                        </form>
                    )
                )}
            </div>
        </div>
    );
};

export default MessageContainer;
