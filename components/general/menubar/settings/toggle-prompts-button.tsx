import useSettingsContext from "@/providers/settings-provider";
import { FaRegCircle } from "@react-icons/all-files/fa/FaRegCircle";
import { TbPrompt } from "@react-icons/all-files/tb/TbPrompt";
import SettingsButton from "./settings-button";

const TogglePromptsButton = () => {
    const { togglePrompts, promptsOn } = useSettingsContext();

    return (
        <SettingsButton onClick={togglePrompts}>
            {promptsOn ? (
                <>
                    <TbPrompt className="text-xl" />
                    Prompts Enabled
                </>
            ) : (
                <>
                    <FaRegCircle />
                    Prompts Disabled
                </>
            )}
        </SettingsButton>
    );
};

export default TogglePromptsButton;
