"use client";

import deleteAccount from "@/actions/auth/modify/delete-account";
import SubmitButton from "@/components/general/submit-button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useAuthContext from "@/providers/auth-provider";
import { IoWarningOutline } from "@react-icons/all-files/io5/IoWarningOutline";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { FC, useState } from "react";
import SettingsButton from "./settings-button";

const DeleteAccountButton: FC<{ demoUserId: string }> = ({ demoUserId }) => {
    const { user } = useAuthContext();

    if (user.id === demoUserId || user.email === "demo@demo.demo") return;

    const [open, setOpen] = useState(false);

    async function handleDelete() {
        await deleteAccount();
        setOpen(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <SettingsButton>
                    <IoWarningOutline />
                    Delete Account
                </SettingsButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to permanently delete your account. Your chats and messages will be lost forever.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form className="flex flex-col" action={handleDelete}>
                        <AlertDialogAction className="flex gap-1 items-center" asChild>
                            <SubmitButton
                                content={
                                    <>
                                        <IoWarningOutline />
                                        Delete Account
                                    </>
                                }
                                loading={
                                    <>
                                        <VscLoading className="animate-spin" />
                                        Delete Account
                                    </>
                                }
                            />
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAccountButton;
