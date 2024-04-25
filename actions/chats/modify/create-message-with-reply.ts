"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const createMessageWithReply = async (formData: FormData) => {
    const actionName = "createMessageWithReply";

    const supabase = createClient();

    const first_message_text = formData.get("text");
    const sender_id = formData.get("sender_id");
    const recipient_id = formData.get("recipient_id");
    const reply_text = formData.get("reply_text");

    // create two messages: user message and AI response
    const { error } = await supabase.rpc("force_create_two_messages", {
        sender_id,
        recipient_id,
        first_message_text,
        reply_text,
    });

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { text: reply_text, reply: reply_text }, { revalidatePath: "/users/[slug]" });
};

export default createMessageWithReply;
