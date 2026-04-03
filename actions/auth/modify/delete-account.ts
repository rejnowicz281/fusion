"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const deleteAccount = async () => {
    const actionName = "deleteAccount";

    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();

    const id = data.user?.id;

    if (id === process.env.DEMO_USER_ID || data.user?.email === "demo@demo.demo")
        return actionError(actionName, { error: "You cannot delete this demo account." });

    const avatarPath = data.user?.user_metadata.avatar_url?.split("/").slice(-1)[0];
    const defaultAvatarName = process.env.DEFAULT_AVATAR_URL?.split("/").slice(-1)[0];

    const [{ error }, { error: storageError }] = await Promise.all([
        supabase.from("users").delete().eq("id", id),
        avatarPath === defaultAvatarName ? { error: null } : supabase.storage.from("avatars").remove([avatarPath])
    ]);

    if (storageError || error) return actionError(actionName, { error, storageError });

    await supabase.auth.signOut();

    return actionSuccess(actionName, { id }, { redirectPath: "/login" });
};

export default deleteAccount;
