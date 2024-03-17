"use client";

import deleteAccount from "@/actions/auth/modify/delete-account";
import SubmitButton from "@/components/general/submit-button";
import useAuthContext from "@/providers/auth-provider";
import { FC } from "react";

const DeleteAccountButton: FC<{ demoUserId: string }> = ({ demoUserId }) => {
    const { user } = useAuthContext();

    if (user.id === demoUserId || user.email === "demo@demo.demo") return;

    return (
        <form action={deleteAccount}>
            <SubmitButton content="Delete your account" loading="Deleting..." />
        </form>
    );
};

export default DeleteAccountButton;
