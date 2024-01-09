"use client";

import { useSearchParams } from "next/navigation";
import css from "./index.module.css";

export default function FormMessages() {
    const messages = useSearchParams().getAll("message");

    if (!messages.length) return null;

    return (
        <div className={css.container}>
            {messages.map((message, idx) => (
                <li key={idx} className={css.message}>
                    {message}
                </li>
            ))}
        </div>
    );
}
