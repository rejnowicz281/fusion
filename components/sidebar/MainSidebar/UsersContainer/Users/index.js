"use client";

import NavLink from "@/components/general/NavLink";
import PresenceAvatar from "@/components/general/PresenceAvatar";
import usePresenceContext from "@/providers/PresenceProvider";
import { IoStar } from "react-icons/io5";
import css from "./index.module.css";

export default function Users({ users }) {
    const { loggedUsers } = usePresenceContext();

    users.sort((a, b) => {
        if (a.id === b.id) return 0; // if the users are the same, don't sort them
        if (a.bookmark && !b.bookmark) return -1; // if a is bookmarked and b is not, put a first
        if (!a.bookmark && b.bookmark) return 1; // if b is bookmarked and a is not, put b first
        if (loggedUsers.includes(a.id) && !loggedUsers.includes(b.id)) return -1; // if a is logged in and b is not, put a first
        if (!loggedUsers.includes(a.id) && loggedUsers.includes(b.id)) return 1; // if b is logged in and a is not, put b first
        return a.display_name.localeCompare(b.display_name); // sort by display name
    });

    return (
        <>
            <div className={css.top}>
                Contacts <span className={css["contacts-count"]}>({users.length})</span>
            </div>
            <div className={css.users}>
                {users.map((user) => (
                    <NavLink
                        href={`/users/${user.id}`}
                        className={css["user-link"]}
                        activeClassName={css["user-link-active"]}
                        key={user.id}
                    >
                        <div className={css["user-link-left"]}>
                            <PresenceAvatar
                                userId={user.id}
                                width={50}
                                height={50}
                                alt={user.display_name}
                                src={user.avatar_url}
                                className={css.avatar}
                            />
                            <div className={css["user-info"]}>
                                <div className={css["display-name"]}>{user.display_name}</div>
                            </div>
                        </div>
                        {user.bookmark && <IoStar className={css.bookmark} />}
                    </NavLink>
                ))}
            </div>
        </>
    );
}
