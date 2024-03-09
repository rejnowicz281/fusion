import deleteMessage from "@/actions/chats/modify/delete-message";
import PresenceAvatar from "@/components/general/presence-avatar";
import SubmitButton from "@/components/general/submit-button";
import useAuthContext from "@/providers/auth-provider";
import { Message } from "@/types/message";
import formatMessageDate from "@/utils/general/format-message-date";
import { FC } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import css from "./index.module.css";

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
        <div
            className={`${css.message}${isSender ? ` ${css["flex-row-reverse"]}` : ` ${css["flex-row"]}`}`}
            key={message.id}
        >
            <div data-tooltip-content={message.sender.display_name} className={css["avatar-wrapper"]}>
                <PresenceAvatar
                    className={css.avatar}
                    height={50}
                    width={50}
                    src={message.sender.avatar_url}
                    alt={message.sender.display_name}
                    userId={message.sender.id}
                />
            </div>
            <Tooltip anchorSelect={`.${css["avatar-wrapper"]}`} />
            <div
                data-tooltip-content={formatMessageDate(message.created_at)}
                className={`${css["text-box"]}${` ${isSender ? css["text-box-black"] : css["text-box-grey"]}`}`}
            >
                {message.text}
            </div>
            <Tooltip anchorSelect={`.${css["text-box"]}`} />
            <div className={css.options}>
                {message.loading ? (
                    <div className={css.loading}>
                        <AiOutlineLoading className={css["loading-spin"]} />
                    </div>
                ) : (
                    message.sender.id === user.id && (
                        <form action={handleDelete}>
                            <input type="hidden" name="id" value={message.id} />
                            <SubmitButton
                                className={css.delete}
                                content={<RiDeleteBinLine />}
                                loading={<AiOutlineLoading className={css["loading-spin"]} />}
                            />
                        </form>
                    )
                )}
            </div>
        </div>
    );
};

export default MessageContainer;
