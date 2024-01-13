"use server";

import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createBookmark(bookmarked_id) {
    const actionName = "createBookmark";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: bookmark, bookmarkError } = await supabase
        .from("bookmarks")
        .insert([{ user_id: user.id, bookmarked_id }])
        .select("id");

    if (bookmarkError) return actionError(actionName, { bookmarkError });

    revalidatePath(`/users/${bookmarked_id}`);

    return actionSuccess(actionName, { bookmarked: bookmarked_id });
}

export async function deleteBookmark(id) {
    const actionName = "deleteBookmark";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: bookmark, error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", id)
        .select("bookmarked_id")
        .single();

    if (error) return actionError(actionName, { error });

    revalidatePath(`/users/${bookmark.bookmarked_id}`);

    return actionSuccess(actionName, { id });
}
