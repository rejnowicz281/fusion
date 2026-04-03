"use client";
import disableAiMode from "@/actions/users/modify/disable-ai-mode";
import enableAiMode from "@/actions/users/modify/enable-ai-mode";
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
import useAuthContext from "@/providers/auth-provider";
import { FaRegCircle } from "@react-icons/all-files/fa/FaRegCircle";
import { MdOutlineAutoFixHigh } from "@react-icons/all-files/md/MdOutlineAutoFixHigh";
import { FC, useOptimistic } from "react";
import SettingsButton from "./settings-button";

const AiModeButton: FC<{ demoUserId: string }> = ({ demoUserId }) => {
    const { user } = useAuthContext();

    const isDemoUser = user.id === demoUserId || user.email === "demo@demo.demo";

    const [aiMode, setAiMode] = useOptimistic(user.ai_mode);

    if (isDemoUser) return <AiModeDemoUserDialog />;

    return (
        <form
            className="flex flex-col"
            action={(formData: FormData) => {
                if (isDemoUser) return;

                if (aiMode) {
                    disableAiMode(formData);
                    setAiMode(false);
                } else {
                    enableAiMode(formData);
                    setAiMode(true);
                }
            }}
        >
            <input type="hidden" name="user_id" value={user.id} />
            <SettingsButton>
                <AiModeSettingsButtonContent aiMode={aiMode} />
            </SettingsButton>
        </form>
    );
};

const AiModeSettingsButtonContent = ({ aiMode }: { aiMode?: boolean }) => {
    return (
        <>
            {aiMode ? (
                <>
                    <MdOutlineAutoFixHigh className="text-xl" /> AI Mode Enabled
                </>
            ) : (
                <>
                    <FaRegCircle /> AI Mode Disabled
                </>
            )}
        </>
    );
};

const AiModeDemoUserDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <SettingsButton>
                    <AiModeSettingsButtonContent aiMode={false} />
                </SettingsButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>AI Mode is disabled for the demo user</DialogTitle>
                    <DialogDescription>
                        As a demo user, you cannot toggle AI Mode. Please sign up for a new account to access this
                        feature.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AiModeButton;
