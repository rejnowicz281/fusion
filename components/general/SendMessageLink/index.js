"use client";

import useAuthContext from "@/providers/AuthProvider";
import Link from "next/link";

export default function SendMessageLink({ className, userId }) {
    const { user } = useAuthContext();

    if (user.id === userId) return null;

    return (
        <Link className={className} href={`/users/${userId}/chat`}>
            Send a message
        </Link>
    );
}
