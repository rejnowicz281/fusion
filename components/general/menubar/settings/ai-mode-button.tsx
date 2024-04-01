"use client";
import disableAiMode from "@/actions/users/modify/disable-ai-mode";
import enableAiMode from "@/actions/users/modify/enable-ai-mode";
import useAuthContext from "@/providers/auth-provider";
import { FaRegCircle } from "@react-icons/all-files/fa/FaRegCircle";
import { MdOutlineAutoFixHigh } from "@react-icons/all-files/md/MdOutlineAutoFixHigh";
import { FC, useOptimistic } from "react";
import SettingsButton from "./settings-button";

const AiModeButton: FC<{ demoUserId: string }> = ({ demoUserId }) => {
    const { user } = useAuthContext();

    if (user.id === demoUserId || user.email === "demo@demo.demo") return;

    const [aiMode, setAiMode] = useOptimistic(user.ai_mode);

    return (
        <form
            className="flex flex-col"
            action={(formData: FormData) => {
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
                {aiMode ? (
                    <>
                        <MdOutlineAutoFixHigh className="text-xl" /> AI Mode Enabled
                    </>
                ) : (
                    <>
                        <FaRegCircle /> AI Mode Disabled
                    </>
                )}
            </SettingsButton>
        </form>
    );
};

export default AiModeButton;
