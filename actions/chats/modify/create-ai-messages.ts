"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const createAiMessages = async (formData: FormData, recipientAiMode?: boolean) => {
    const actionName = "createAiMessages";

    const supabase = createClient();

    const text = formData.get("text");
    const sender_id = formData.get("sender_id");
    const recipient_id = formData.get("recipient_id");
    const ai_text = formData.get("ai_text");

    // create two messages: user message and AI response
    const { error } = await supabase.rpc("create_messages_if_ai", {
        sender_id,
        recipient_id,
        recipient_ai_mode: recipientAiMode || false,
        text,
        ai_text,
    });

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { text, sender_id, recipient_id, ai_text }, { revalidatePath: "/users/[slug]" });
};

export default createAiMessages;
