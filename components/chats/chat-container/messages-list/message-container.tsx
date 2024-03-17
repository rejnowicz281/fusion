import deleteMessage from "@/actions/chats/modify/delete-message";
import PresenceAvatar from "@/components/general/presence-avatar";
import SubmitButton from "@/components/general/submit-button";
import useAuthContext from "@/providers/auth-provider";
import { Message } from "@/types/message";
import { AiOutlineLoading } from "@react-icons/all-files/ai/AiOutlineLoading";
import { RiDeleteBinLine } from "@react-icons/all-files/ri/RiDeleteBinLine";
import clsx from "clsx";
import { FC } from "react";

type MessageContainerProps = {
    message: Message;
    deleteOptimisticMessage: (id: string) => void;
};

const MessageContainer: FC<MessageContainerProps> = ({ message, deleteOptimisticMessage }) => {
    const { user } = useAuthContext();

    const isSender = message.sender.id === user.id;

    const handleDelete = async (formData: FormData) => {
        const idFormData = formData.get("id");
        const id = typeof idFormData === "string" ? idFormData : "";
        if (id) {
            await deleteMessage(formData);
            deleteOptimisticMessage(id);
        }
    };

    return (
        <div className={clsx("group flex gap-4", isSender ? "flex-row-reverse" : "flex-row")}>
            {message.sender.id !== user.id && (
                <PresenceAvatar
                    avatarSize={40}
                    src={message.sender.avatar_url}
                    markerSize={12}
                    userId={message.sender.id}
                />
            )}
            <div
                className={clsx(
                    "p-2 rounded-2xl flex items-center justify-center text-white",
                    isSender ? "bg-blue-500" : "bg-zinc-600 dark:bg-[rgb(43,43,43)]"
                )}
            >
                {message.text}
            </div>
            <div className="self-center">
                {message.loading ? (
                    <AiOutlineLoading className="animate-spin" />
                ) : (
                    message.sender.id === user.id && (
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
