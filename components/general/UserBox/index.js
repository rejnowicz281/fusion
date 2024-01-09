import Image from "next/image";
import Link from "next/link";
import css from "./index.module.css";

export default function UserBox({ user, tag = null, href }) {
    const path = href || "/users/" + user.id;

    return (
        <Link href={path} className={css.box}>
            <Image height={50} width={50} src={user.avatar_url} alt="?" />
            {user.display_name} {tag && `(${tag})`}
        </Link>
    );
}
