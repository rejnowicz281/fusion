import { getAllUsers } from "@/actions/users";
import NavLink from "@/components/general/NavLink";
import PresenceAvatar from "@/components/general/PresenceAvatar";
import { IoStar } from "react-icons/io5";
import css from "./index.module.css";

export default async function UsersContainer() {
    const users = await getAllUsers();

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
