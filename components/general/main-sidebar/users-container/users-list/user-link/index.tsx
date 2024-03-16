import NavLink from "@/components/general/nav-link";
import PresenceAvatar from "@/components/general/presence-avatar";
import useAuthContext from "@/providers/auth-provider";
import { User } from "@/types/user";
import timePassedSinceDate from "@/utils/general/time-passed-since-date";
import { IoStar } from "@react-icons/all-files/io5/IoStar";
import { FC } from "react";
import css from "./index.module.css";

const UserLink: FC<{ user: User }> = ({ user }) => {
    const { user: currentUser } = useAuthContext();

    const mostRecentMessageSection = () => {
        if (user.most_recent_message) {
            const senderId = user.most_recent_message.sender_id;
            const prefix = senderId === currentUser.id ? "You: " : "";
            const timePassed = timePassedSinceDate(user.most_recent_message.created_at);

            return (
                <div>
                    <div>{`${prefix}${user.most_recent_message.text}`}</div>
                    <div>{timePassed}</div>
                </div>
            );
        }
    };

    return (
        <NavLink href={`/users/${user.id}`} className={css.link} activeClassName={css.active} key={user.id}>
            <div className={css["info-container"]}>
                <PresenceAvatar
                    userId={user.id}
                    width={50}
                    height={50}
                    alt={user.display_name}
                    src={user.avatar_url}
                    className={css.avatar}
                />
                <div className={css["display-name"]}>{user.display_name}</div>
                {mostRecentMessageSection()}
            </div>
            {user.bookmark_id && <IoStar className={css.bookmark} />}
        </NavLink>
    );
};

export default UserLink;
