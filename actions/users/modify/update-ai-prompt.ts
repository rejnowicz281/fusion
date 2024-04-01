"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export const updateAiPrompt = async (formData: FormData) => {
    const actionName = "updateAiPrompt";

    const user_id = formData.get("user_id");
    const aiPromptFormData = formData.get("prompt");

    const ai_prompt = typeof aiPromptFormData === "string" ? aiPromptFormData.trim() : null;

    if (ai_prompt === null) return actionError(actionName, { error: "Invalid Form Data" });

    const supabase = createClient();

    const { error } = await supabase.from("users").update({ ai_prompt }).eq("id", user_id);

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, {}, { revalidatePath: "/" });
};

export default updateAiPrompt;
