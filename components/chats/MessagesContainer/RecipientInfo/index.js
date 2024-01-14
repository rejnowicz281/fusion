import { createBookmark, deleteBookmark } from "@/actions/bookmarks";
import PresenceAvatar from "@/components/general/PresenceAvatar";
import SubmitButton from "@/components/general/SubmitButton";
import useAuthContext from "@/providers/AuthProvider";
import { AiOutlineLoading } from "react-icons/ai";
import { IoStar, IoStarOutline } from "react-icons/io5";
import css from "./index.module.css";

export default function RecipientInfo({ recipient }) {
    const { user } = useAuthContext();

    return (
        <div className={css.container}>
            <div className={css["recipient-section"]}>
                <PresenceAvatar
                    className={css.avatar}
                    width={60}
                    height={60}
                    src={recipient.avatar_url}
                    userId={recipient.id}
                    alt={recipient.display_name}
                />
                <div className={css["name-container"]}>
                    <div className={css.name}>{recipient.display_name}</div>
                    {recipient.email !== recipient.display_name && <div className={css.email}>{recipient.email}</div>}
                </div>
            </div>
            <div className={css["settings-section"]}>
                {recipient.bookmark ? (
                    <form action={deleteBookmark}>
                        <input type="hidden" name="id" value={recipient.bookmark} />
                        <SubmitButton
                            className={css["bookmark-button"]}
                            content={<IoStar />}
                            loading={<AiOutlineLoading className={css["bookmark-loading"]} />}
                        />
                    </form>
                ) : (
                    <form action={createBookmark}>
                        <input type="hidden" name="user_id" value={user.id} />
                        <input type="hidden" name="bookmarked_id" value={recipient.id} />
                        <SubmitButton
                            className={css["bookmark-button"]}
                            content={<IoStarOutline />}
                            loading={<AiOutlineLoading className={css["bookmark-loading"]} />}
                        />
                    </form>
                )}
            </div>
        </div>
    );
}
