"use client";

import updateAccount from "@/actions/auth/modify/update-account";
import PasswordInput from "@/components/general/password-input";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AvatarPicker from "@/components/users/avatar-picker";
import useAuthContext from "@/providers/auth-provider";
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import SettingsButton from "./settings-button";

const EditAccountButton: FC<{ demoUserId: string }> = ({ demoUserId }) => {
    const { user } = useAuthContext();

    if (user.id === demoUserId || user.email === "demo@demo.demo") return;

    const formRef = useRef<HTMLFormElement>(null);

    const [error, setError] = useState<string | null>(null);

    const isEmailProvider = user.provider === "email";

    const handleUpdate = async (formData: FormData) => {
        const password = formData.get("password");

        if (typeof password === "string" && password.length > 1 && password.length < 6)
            setError("Password should be at least 6 characters.");
        else {
            const res = await updateAccount(formData);

            if (res.error) setError(res.error);
            else formRef.current?.reset();
        }
    };

    return (
        <Dialog onOpenChange={() => setError(null)}>
            <DialogTrigger asChild>
                <SettingsButton>
                    <MdEdit />
                    Edit Account
                </SettingsButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Account</DialogTitle>
                    <DialogDescription>
                        {isEmailProvider
                            ? "Here you can change your name, password, and avatar. To update the avatar, simply click on it. You can leave any field blank if you don't want to change it."
                            : "Here you can change your name. Only users who signed up with an email provider can change their password and avatar."}{" "}
                        Click Save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form ref={formRef} onSubmit={() => setError(null)} action={handleUpdate}>
                    <div className="flex flex-col items-center gap-3">
                        {isEmailProvider ? (
                            <AvatarPicker defaultUrl={user.avatar_url} />
                        ) : (
                            <Image
                                src={user.avatar_url}
                                width={100}
                                height={100}
                                alt="Your avatar"
                                className="rounded-[50%]"
                            />
                        )}
                        <div className="text-gray-500">{user.display_name}</div>
                    </div>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="display_name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="display_name"
                                name="display_name"
                                placeholder={user.display_name}
                                className="col-span-3"
                            />
                        </div>
                        {isEmailProvider && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="password" className="text-right">
                                        Password
                                    </Label>
                                    <PasswordInput
                                        className="col-span-3"
                                        placeholder="Must have at least 6 characters"
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <Checkbox name="reset_avatar" id="reset_avatar" />
                                    <Label className="pl-2 text-zinc-800 dark:text-zinc-300" htmlFor="reset_avatar">
                                        Reset Avatar
                                    </Label>
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter className="gap-2">
                        {error && <div className="text-red-500 text-sm self-center">{error}</div>}
                        <Button className="flex items-center gap-1" asChild type="submit">
                            <SubmitButton
                                content={
                                    <>
                                        <MdEdit />
                                        Save
                                    </>
                                }
                                loading={
                                    <>
                                        <VscLoading className="animate-spin" />
                                        Save
                                    </>
                                }
                            />
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditAccountButton;
