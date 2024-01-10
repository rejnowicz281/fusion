"use client";

import { deleteUser } from "@/actions/auth";
import AsyncButton from "@/components/general/AsyncButton";
import useAuthContext from "@/providers/AuthProvider";

export default function DeleteAccountButton(demoUserId) {
    const { user } = useAuthContext();

    if (user.id === demoUserId || user.email === "demo@demo.demo") return;

    return (
        <AsyncButton
            content="Delete your account"
            loading="Deleting..."
            onClick={async () => {
                await deleteUser(user.id);
            }}
        />
    );
}
