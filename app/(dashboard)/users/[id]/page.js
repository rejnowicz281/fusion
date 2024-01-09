import { getUserInfo } from "@/actions/users";
import DeleteUserButton from "@/components/auth/DeleteUserButton";
import SendMessageLink from "@/components/general/SendMessageLink";
import Image from "next/image";
import css from "./page.module.css";

export default async function UserPage({ params: { id } }) {
    const userInfo = await getUserInfo(id);

    if (userInfo.error)
        return (
            <div className={css["error-container"]}>
                An error occured while fetching this user's information. Are you sure the ID is correct? 🤔
            </div>
        );

    return (
        <div className={css.container}>
            <div className={css.header}>
                <h1 className={css["user-name"]}>{userInfo.display_name}</h1>
                <Image height="200" width="200" src={userInfo.avatar_url} alt="404" />
            </div>
            {id !== process.env.DEMO_USER_ID && <DeleteUserButton id={id} />}
            <SendMessageLink userId={id} className={css["chat-link"]} />
        </div>
    );
}
