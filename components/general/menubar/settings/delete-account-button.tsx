"use client";

import deleteAccount from "@/actions/auth/modify/delete-account";
import SubmitButton from "@/components/general/submit-button";
import useAuthContext from "@/providers/auth-provider";
import { IoWarningOutline } from "@react-icons/all-files/io5/IoWarningOutline";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { FC } from "react";
import SettingsButton from "./settings-button";

const DeleteAccountButton: FC<{ demoUserId: string }> = ({ demoUserId }) => {
    const { user } = useAuthContext();

    if (user.id === demoUserId || user.email === "demo@demo.demo") return;

    return (
        <form className="flex flex-col" action={deleteAccount}>
            <SettingsButton asChild={true}>
                <SubmitButton
                    content={
                        <>
                            <IoWarningOutline />
                            Delete Your Account
                        </>
                    }
                    loading={
                        <>
                            <VscLoading className="animate-spin" />
                            Delete Your Account
                        </>
                    }
                />
            </SettingsButton>
        </form>
    );
};

export default DeleteAccountButton;
