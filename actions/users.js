"use server";

import actionError from "@/utils/actions/actionError";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getAllUsers() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: users, error } = await supabase.from("users").select("id, email, display_name, avatar_url");

    if (error) return actionError("getAllUsers", { error });

    // get all bookmarks of the current user
    const { data: bookmarks } = await supabase.from("bookmarks").select("id, bookmarked_id").eq("user_id", user.id);

    users.map(async (user) => {
        // check if user is bookmarked
        const bookmark = bookmarks.find((bookmark) => bookmark.bookmarked_id === user.id);

        if (bookmark) user.bookmark = bookmark.id;
    });

    return users;
}
