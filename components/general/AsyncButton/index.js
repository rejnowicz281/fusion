"use client";

import { useState } from "react";

export default function AsyncButton({ className, onClick, content, loading, type = "button" }) {
    const [pending, setPending] = useState(false);

    async function handleClick() {
        setPending(true);
        await onClick();
        setPending(false);
    }

    // if loading is a string, it will be used as the loading text, otherwise 'content' will always be used
    return (
        <button className={className} type={type} onClick={handleClick} disabled={pending}>
            {loading ? (pending ? loading : content) : content}
        </button>
    );
}
