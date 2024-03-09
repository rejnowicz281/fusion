"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const deleteBookmark = async (formData: FormData) => {
    const actionName = "deleteBookmark";

    const supabase = createClient();

    const id = formData.get("id");

    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { id }, { revalidatePath: "/users/[slug]" });
};

export default deleteBookmark;
