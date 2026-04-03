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
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import useAuthContext from "@/providers/auth-provider";
import { IoWarningOutline } from "@react-icons/all-files/io5/IoWarningOutline";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { FC, useState } from "react";
import SettingsButton from "./settings-button";

const DeleteAccountButton: FC<{ demoUserId: string }> = ({ demoUserId }) => {
    const { user } = useAuthContext();

    const isDemoUser = user.id === demoUserId || user.email === "demo@demo.demo";

    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        if (!isDemoUser) await deleteAccount();

        setOpen(false);
    };

    const description = isDemoUser
        ? "The demo account cannot be deleted."
        : "This action cannot be undone. This will permanently delete your account and remove all your data.";

    const title = isDemoUser ? "Demo Account" : "Are you absolutely sure?";

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
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form className="flex flex-col" action={handleDelete}>
                        <AlertDialogAction className="flex gap-1 items-center" asChild>
                            <SubmitButton
                                disabled={isDemoUser}
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
