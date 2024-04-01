"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

export const enableAiMode = async (formData: FormData) => {
    const actionName = "enableAiMode";

    const user_id = formData.get("user_id");

    const supabase = createClient();

    const { error } = await supabase.from("users").update({ ai_mode: true }).eq("id", user_id);

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, {}, { revalidatePath: "/" });
};

export default enableAiMode;
