import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getAllUsers = async () => {
    const actionName = "getAllUsers";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in to proceed" });

    const [{ data: users, error: usersError }, { data: bookmarks, error: bookmarksError }] = await Promise.all([
        supabase.from("users").select("*"),
        supabase.from("bookmarks").select("id, bookmarked_id").eq("user_id", user.id),
    ]);

    if (usersError || bookmarksError)
        return actionError(actionName, { error: usersError?.message || bookmarksError?.message });

    if (users && bookmarks) {
        users.map(async (user) => {
            // check if user is bookmarked
            const bookmark = bookmarks.find((bookmark) => bookmark.bookmarked_id === user.id);

            if (bookmark) user.bookmark = bookmark.id;
        });
    }

    return actionSuccess(actionName, { users }, { logData: false });
};

export default getAllUsers;
