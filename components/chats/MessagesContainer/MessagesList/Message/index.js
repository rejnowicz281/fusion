import { deleteMessage } from "@/actions/chats";
import PresenceAvatar from "@/components/general/PresenceAvatar";
import SubmitButton from "@/components/general/SubmitButton";
import useAuthContext from "@/providers/AuthProvider";
import { AiOutlineLoading } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import css from "./index.module.css";

export default function Message({ message, deleteOptimisticMessage }) {
    const { user } = useAuthContext();

    const isSender = message.sender.id === user.id;

    return (
        <div
            className={`${css.message}${isSender ? ` ${css["flex-row-reverse"]}` : ` ${css["flex-row"]}`}`}
            key={message.id}
        >
            <div className={css["avatar-wrapper"]}>
                <PresenceAvatar
                    className={css.avatar}
                    height={50}
                    width={50}
                    src={message.sender.avatar_url}
                    alt={message.sender.display_name}
                    userId={message.sender.id}
                />
            </div>
            <div className={`${css["text-box"]}${` ${isSender ? css["text-box-black"] : css["text-box-grey"]}`}`}>
                {message.text}
            </div>
            <div className={css.options}>
                {message.loading ? (
                    <div className={css.loading}>
                        <AiOutlineLoading className={css["loading-spin"]} />
                    </div>
                ) : (
                    message.sender.id === user.id && (
                        <form
                            action={async (formData) => {
                                await deleteMessage(formData);

                                const id = formData.get("id");

                                deleteOptimisticMessage(id);
                            }}
                        >
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
}
