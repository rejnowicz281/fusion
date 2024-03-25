import useSettingsContext from "@/providers/settings-provider";
import PromptLanguageButton from "./prompt-language-button";
import TogglePromptsButton from "./toggle-prompts-button";

const PromptsSection = () => {
    const { promptsOn } = useSettingsContext();

    return (
        <>
            <TogglePromptsButton />
            {promptsOn && <PromptLanguageButton />}
        </>
    );
};

export default PromptsSection;
