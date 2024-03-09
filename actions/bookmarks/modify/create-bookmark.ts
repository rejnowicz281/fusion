"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const createBookmark = async (formdata: FormData) => {
    const actionName = "createBookmark";

    const supabase = createClient();

    const bookmarked_id = formdata.get("bookmarked_id");
    const user_id = formdata.get("user_id");

    const { error } = await supabase.from("bookmarks").insert([{ user_id, bookmarked_id }]);

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { bookmarked: bookmarked_id }, { revalidatePath: "/users/[slug]" });
};

export default createBookmark;
