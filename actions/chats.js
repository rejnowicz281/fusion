"use server";

import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getChat(userId) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const [messagesData, userData] = await Promise.all([
        supabase
            .from("messages")
            .select(
                "id, text, sender: users!messages_sender_id_fkey (id, email, avatar_url, display_name), recipient: users!messages_recipient_id_fkey (id, email, avatar_url, display_name), created_at"
            )
            .or(
                `and(sender_id.eq.${userId}, recipient_id.eq.${user.id}), and(sender_id.eq.${user.id}, recipient_id.eq.${userId})`
            )
            .order("created_at", { ascending: true }),
        supabase.from("users").select("id, email, display_name, avatar_url").eq("id", userId).single(),
    ]);

    if (messagesData.error) return actionError("getMessages", { error: messagesData.error });
    if (userData.error) return actionError("getMessages", { error: userData.error });

    const result = {
        messages: messagesData.data,
        user: userData.data,
    };

    return result;
}

export async function createMessage(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const text = formData.get("text");
    const recipient_id = formData.get("recipient_id");

    const { data: message, messageError } = await supabase
        .from("messages")
        .insert([{ text, sender_id: user.id, recipient_id }]);

    if (messageError) return actionError("createMessage", { messageError });

    return actionSuccess("createMessage", { text, sender: user.id, recipient: recipient_id });
}

export async function deleteMessage(id) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: message, error } = await supabase.from("messages").delete().eq("id", id);

    if (error) return actionError("deleteMessage", { error });

    return actionSuccess("deleteMessage", { id });
}
