"use client";

import { deleteUser } from "@/actions/auth";
import SubmitButton from "@/components/general/SubmitButton";
import useAuthContext from "@/providers/AuthProvider";

export default function DeleteAccountButton(demoUserId) {
    const { user } = useAuthContext();

    if (user.id === demoUserId || user.email === "demo@demo.demo") return;

    return (
        <form action={deleteUser}>
            <input type="hidden" name="id" value={user.id} />
            <SubmitButton content="Delete your account" loading="Deleting..." />
        </form>
    );
}
