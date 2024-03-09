import getCurrentUser from "@/actions/auth/read/get-current-user";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import generateTimestamps from "@/utils/general/generate-timestamps";
import { createClient } from "@/utils/supabase/server";

const getChat = async (userId: string) => {
    const actionName = "getChat";

    const supabase = createClient();

    const { user: currentUser } = await getCurrentUser();

    const isCurrentUser = currentUser.id === userId;

    const [
        { data: messages, error: messagesError },
        { data: user, error: userError },
        { data: bookmark, error: bookmarkError },
    ] = await Promise.all([
        supabase
            .from("messages")
            .select(
                "id, text, sender: users!messages_sender_id_fkey (id, email, avatar_url, display_name), recipient: users!messages_recipient_id_fkey (id, email, avatar_url, display_name), created_at"
            )
            .or(
                `and(sender_id.eq.${userId}, recipient_id.eq.${currentUser.id}), and(sender_id.eq.${currentUser.id}, recipient_id.eq.${userId})`
            )
            .order("created_at", { ascending: true }),
        isCurrentUser
            ? { data: currentUser, error: null }
            : supabase.from("users").select("id, email, display_name, avatar_url").eq("id", userId).single(),
        supabase.from("bookmarks").select("id").eq("bookmarked_id", userId).eq("user_id", currentUser.id),
    ]);

    if (messagesError || userError || bookmarkError)
        return actionError(actionName, {
            error: messagesError?.message || userError?.message || bookmarkError?.message,
        });

    if (messages) generateTimestamps(messages);

    const result = {
        messages,
        user,
    };

    if (bookmark && bookmark.length > 0) result.user.bookmark = bookmark[0].id;

    return actionSuccess(actionName, result, { logData: false });
};

export default getChat;
