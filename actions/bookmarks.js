"use server";

import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createBookmark(formdata) {
    const actionName = "createBookmark";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const bookmarked_id = formdata.get("bookmarked_id");
    const user_id = formdata.get("user_id");

    const { data: bookmark, bookmarkError } = await supabase
        .from("bookmarks")
        .insert([{ user_id, bookmarked_id }])
        .select("id");

    if (bookmarkError) return actionError(actionName, { bookmarkError });

    revalidatePath(`/users/${bookmarked_id}`);

    return actionSuccess(actionName, { bookmarked: bookmarked_id });
}

export async function deleteBookmark(formData) {
    const actionName = "deleteBookmark";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const id = formData.get("id");

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
