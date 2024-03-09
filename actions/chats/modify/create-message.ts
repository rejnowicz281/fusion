"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const createMessage = async (formData: FormData) => {
    const supabase = createClient();

    const text = formData.get("text");
    const sender_id = formData.get("sender_id");
    const recipient_id = formData.get("recipient_id");

    const { error } = await supabase.from("messages").insert([{ text, sender_id, recipient_id }]);

    if (error) return actionError("createMessage", { error: error.message });

    return actionSuccess("createMessage", { text, sender_id, recipient_id }, { revalidatePath: "/users/[slug]" });
};

export default createMessage;
