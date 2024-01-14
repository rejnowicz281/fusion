import Image from "next/image";
import css from "./index.module.css";

export default function CurrentUser({ user }) {
    return (
        <div className={css.container}>
            <Image className={css.avatar} width={150} height={150} alt="Your avatar" src={user.avatar_url} />
            <div className={css.name}>{user.display_name}</div>
            {user.email !== user.display_name && <div className={css.email}>{user.email}</div>}
        </div>
    );
}
