"use client";

import updateAiPrompt from "@/actions/users/modify/update-ai-prompt";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { FC, useRef, useState } from "react";
import SettingsButton from "../settings-button";

const AiPromptButton: FC<{ initialPrompt?: string; userId: string }> = ({ initialPrompt, userId }) => {
    const formRef = useRef<HTMLFormElement>(null);

    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const handleUpdate = async (formData: FormData) => {
        const res = await updateAiPrompt(formData);

        if (res.error) setError(res.error);
        else setOpen(false);
    };

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
                    <DialogTitle>Customize AI Prompt</DialogTitle>
                    <DialogDescription>
                        Here you can customize your AI Prompt. Leave it empty if you wish to use the default prompt
                        provided by us.
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="flex flex-col gap-4"
                    ref={formRef}
                    onSubmit={() => setError(null)}
                    action={handleUpdate}
                >
                    <input type="hidden" name="user_id" value={userId} />
                    <Textarea
                        name="prompt"
                        defaultValue={initialPrompt}
                        rows={15}
                        placeholder="Enter custom AI Prompt"
                    />

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

export default AiPromptButton;
