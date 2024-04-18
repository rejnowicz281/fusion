import Avatar from "@/components/general/avatar";
import NavLink from "@/components/general/nav-link";
import useAuthContext from "@/providers/auth-provider";
import { User } from "@/types/user";
import timePassedSinceDate from "@/utils/general/time-passed-since-date";
import { IoStar } from "@react-icons/all-files/io5/IoStar";
import { FC } from "react";

const UserLink: FC<{ user: User }> = ({ user }) => {
    const { user: currentUser } = useAuthContext();

    const mostRecentMessageSection = () => {
        if (user.most_recent_message) {
            const senderId = user.most_recent_message.sender_id;
            const prefix = senderId === currentUser.id ? "You: " : "";
            const timePassed = timePassedSinceDate(user.most_recent_message.created_at);

            return (
                <div className="truncate flex flex-row text-gray-500 gap-1">
                    <div className="truncate">{`${prefix}${user.most_recent_message.text}`}</div>
                    <div>·</div>
                    <div>{timePassed}</div>
                </div>
            );
        }
    };

    return (
        <NavLink
            className="flex items-center p-4 justify-between gap-4 hover:bg-neutral-300 dark:hover:bg-neutral-700/70"
            activeClassName="bg-neutral-200 dark:bg-neutral-800"
            href={`/users/${user.id}`}
            key={user.id}
        >
            <div className="truncate flex items-center gap-3">
                <Avatar aiMode={user.ai_mode} userId={user.id} alt={user.display_name} src={user.avatar_url} />

                <div className="truncate flex flex-col">
                    <div className="truncate">{user.display_name}</div>
                    {mostRecentMessageSection()}
                </div>
            </div>
            {user.bookmark_id && <IoStar className="shrink-0 text-2xl text-blue-500 dark:text-white" />}
        </NavLink>
    );
};

export default UserLink;
