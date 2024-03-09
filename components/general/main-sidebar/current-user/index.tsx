import { User } from "@/types/user";
import Image from "next/image";
import { FC } from "react";
import css from "./index.module.css";

const CurrentUser: FC<{ user: User }> = ({ user }) => {
    return (
        <div className={css.container}>
            <Image className={css.avatar} width={150} height={150} alt="Your avatar" src={user.avatar_url} />
            <div className={css.name}>{user.display_name}</div>
            {user.email !== user.display_name && <div className={css.email}>{user.email}</div>}
        </div>
    );
};

export default CurrentUser;
