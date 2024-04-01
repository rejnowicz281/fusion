"use client";

import useAuthContext from "@/providers/auth-provider";
import { FC, useOptimistic } from "react";
import AiModeButton from "./ai-mode-button";
import AiPromptButton from "./ai-prompt-button";

const AiSection: FC<{
    demoUserId: string;
}> = ({ demoUserId }) => {
    const { user } = useAuthContext();

    if (user.id === demoUserId || user.email === "demo@demo.demo") return;

    const [aiMode, setAiMode] = useOptimistic(user.ai_mode);

    return (
        <>
            <AiModeButton aiMode={aiMode} setAiMode={setAiMode} userId={user.id} />
            {aiMode && <AiPromptButton initialPrompt={user.ai_prompt} userId={user.id} />}
        </>
    );
};

export default AiSection;
