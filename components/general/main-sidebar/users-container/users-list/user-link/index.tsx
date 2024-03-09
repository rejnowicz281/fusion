import NavLink from "@/components/general/nav-link";
import PresenceAvatar from "@/components/general/presence-avatar";
import { User } from "@/types/user";
import { FC } from "react";
import { IoStar } from "react-icons/io5";
import css from "./index.module.css";

const UserLink: FC<{ user: User }> = ({ user }) => {
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
            </div>
            {user.bookmark && <IoStar className={css.bookmark} />}
        </NavLink>
    );
};

export default UserLink;
