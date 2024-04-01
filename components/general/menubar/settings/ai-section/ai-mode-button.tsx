"use client";
import disableAiMode from "@/actions/users/modify/disable-ai-mode";
import enableAiMode from "@/actions/users/modify/enable-ai-mode";
import { FaRegCircle } from "@react-icons/all-files/fa/FaRegCircle";
import { MdOutlineAutoFixHigh } from "@react-icons/all-files/md/MdOutlineAutoFixHigh";
import { FC } from "react";
import SettingsButton from "../settings-button";

const AiModeButton: FC<{
    aiMode?: boolean;
    setAiMode: (action: boolean | ((pendingState: boolean | undefined) => boolean | undefined) | undefined) => void;
    userId: string;
}> = ({ aiMode, setAiMode, userId }) => {
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
            <input type="hidden" name="user_id" value={userId} />
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
