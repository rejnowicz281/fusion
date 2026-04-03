"use client";

import updateAiPrompt from "@/actions/users/modify/update-ai-prompt";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useAuthContext from "@/providers/auth-provider";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { FC, useRef, useState } from "react";
import SettingsButton from "./settings-button";

const AiPromptButton: FC<{ demoUserId: string }> = ({ demoUserId }) => {
    const { user } = useAuthContext();

    const isDemoUser = user.id === demoUserId || user.email === "demo@demo.demo";

    const formRef = useRef<HTMLFormElement>(null);

    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const handleUpdate = async (formData: FormData) => {
        if (isDemoUser) {
            setOpen(false);
            return;
        }

        const res = await updateAiPrompt(formData);

        if (res.error) setError(res.error);
        else setOpen(false);
    };

    const title = "Customize AI Prompt";
    const description = isDemoUser
        ? "As a demo user, you cannot customize the AI prompt. Please sign up for a new account to access this feature."
        : "Here you can customize your AI Prompt. Leave it empty if you wish to use the default prompt provided by us.";

    return (
        <Dialog
            open={open}
            onOpenChange={(b) => {
                setOpen(b);
                setError(null);
            }}
        >
            <DialogTrigger asChild>
                <SettingsButton>
                    <FaEdit />
                    Customize AI Prompt
                </SettingsButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <form
                    className="flex flex-col gap-4"
                    ref={formRef}
                    onSubmit={() => setError(null)}
                    action={handleUpdate}
                >
                    <input type="hidden" name="user_id" value={user.id} />
                    <Textarea
                        disabled={isDemoUser}
                        name="prompt"
                        defaultValue={user.ai_prompt}
                        rows={15}
                        placeholder={`Example prompt:\nYour name is ${user.display_name}, a friendly and non-formal conversationalist. You have the ability to generate sentences in a non-formal, friendly way, just like talking to a friend.\nAct like a human, not a robot. Feel free to make jokes and keep the conversation light-hearted. Your responses should reflect a human-like conversation. Remember to act like a friend, make jokes, and maintain a friendly tone.\nKeep your responses short and concise. Your replies are never longer than 70 words.`}
                    />

                    <DialogFooter className="gap-2">
                        {error && <div className="text-red-500 text-sm self-center">{error}</div>}
                        {isDemoUser ? (
                            <DialogClose asChild>
                                <Button type="button" className="flex items-center gap-1">
                                    <MdEdit />
                                    Save
                                </Button>
                            </DialogClose>
                        ) : (
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
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AiPromptButton;
