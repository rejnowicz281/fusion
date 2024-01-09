"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./error.module.css";

export default function ErrorPage() {
    const pathname = usePathname();

    return (
        <div className={css.container}>
            <p>An error has occured while loading the page. 🤔</p>
            <p>You might wanna try...</p>
            <ul>
                <li>
                    <a href={pathname}>Refreshing</a> the page
                </li>
                <li>Making sure the URL is correct</li>
                <li>
                    <Link href="/login">Logging in</Link>
                </li>
                <li>
                    <Link href="/">Going back to the homepage</Link>
                </li>
            </ul>
        </div>
    );
}
