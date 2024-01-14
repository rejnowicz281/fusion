"use server";

import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";
import generateTimestamps from "@/utils/general/generateTimestamps";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getChat(userId) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const [messagesData, userData, bookmarkedData] = await Promise.all([
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
        supabase.from("bookmarks").select("id").eq("bookmarked_id", userId).eq("user_id", user.id).single(),
    ]);

    if (messagesData.error) return actionError("getMessages", { error: messagesData.error });
    if (userData.error) return actionError("getMessages", { error: userData.error });

    const messages = messagesData.data;
    generateTimestamps(messages);

    const result = {
        messages,
        user: userData.data,
    };

    if (bookmarkedData.data) result.user.bookmark = bookmarkedData.data.id;

    return result;
}

export async function createMessage(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const text = formData.get("text");
    const sender_id = formData.get("sender_id");
    const recipient_id = formData.get("recipient_id");

    const { data: message, messageError } = await supabase.from("messages").insert([{ text, sender_id, recipient_id }]);

    if (messageError) return actionError("createMessage", { messageError });

    revalidatePath(`/users/${recipient_id}`);

    return actionSuccess("createMessage", { text, sender_id, recipient_id });
}

export async function deleteMessage(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const id = formData.get("id");

    const { data: message, error } = await supabase
        .from("messages")
        .delete()
        .eq("id", id)
        .select("recipient_id")
        .single();

    if (error) return actionError("deleteMessage", { error });

    revalidatePath(`/users/${message.recipient_id}`);

    return actionSuccess("deleteMessage", { id });
}
