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
            .select("*")
            .or(
                `and(sender_id.eq.${userId}, recipient_id.eq.${currentUser.id}), and(sender_id.eq.${currentUser.id}, recipient_id.eq.${userId})`
            )
            .order("created_at", { ascending: true }),
        isCurrentUser
            ? { data: currentUser, error: null }
            : supabase.from("users").select("*").eq("id", userId).single(),
        supabase.from("bookmarks").select("id").eq("bookmarked_id", userId).eq("user_id", currentUser.id),
    ]);

    if (messagesError || userError || bookmarkError)
        return actionError(actionName, {
            error: messagesError?.message || userError?.message || bookmarkError?.message,
        });

    if (messages) {
        generateTimestamps(messages);

        messages.forEach((message) => {
            if (message.sender_id === currentUser.id) message.sender = currentUser;
            else if (message.sender_id === userId) message.sender = user;
        });
    }

    const result = {
        messages,
        user,
    };

    if (bookmark && bookmark.length > 0) result.user.bookmark_id = bookmark[0].id;

    return actionSuccess(actionName, result, { logData: false });
};

export default getChat;
