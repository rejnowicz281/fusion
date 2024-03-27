"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const createAiMessages = async (formData: FormData) => {
    const actionName = "createAiMessages";

    const supabase = createClient();

    const text = formData.get("text");
    const sender_id = formData.get("sender_id");
    const recipient_id = formData.get("recipient_id");
    const ai_text = formData.get("ai_text");

    const now = new Date();
    const afterNow = new Date(now.getTime() + 1000); // 1 second after now

    // create two messages: user message and AI response
    const { error } = await supabase.from("messages").insert([
        { text, sender_id, recipient_id, created_at: now.toISOString() },
        { text: ai_text, sender_id: recipient_id, recipient_id: sender_id, created_at: afterNow.toISOString() },
    ]);

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { text, sender_id, recipient_id, ai_text }, { revalidatePath: "/users/[slug]" });
};

export default createAiMessages;
