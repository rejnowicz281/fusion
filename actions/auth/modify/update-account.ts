"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const updateAccount = async (formData: FormData) => {
    const actionName = "updateAccount";

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return actionError(actionName, { error: "You must be logged in to update your account." });

    if (user.id === process.env.DEMO_USER_ID || user.email === "demo@demo.demo")
        return actionError(actionName, { error: "You cannot update this demo account." });

    const isEmailProvider = user.app_metadata.provider === "email";

    const displayNameFormData = formData.get("display_name");
    const passwordFormData = formData.get("password");
    const avatarFileFormData = formData.get("avatar");

    const display_name = typeof displayNameFormData === "string" ? displayNameFormData.trim() : null;
    const password = isEmailProvider && typeof passwordFormData === "string" ? passwordFormData.trim() : null;
    const avatarFile =
        isEmailProvider && avatarFileFormData instanceof File && avatarFileFormData.type.startsWith("image/")
            ? formData.get("avatar")
            : null;

    const resetAvatar = formData.get("reset_avatar") === "on";

    let updateData: {
        data: {
            display_name?: string;
            avatar_url?: string;
        };
        password?: string;
    } = { data: {} };

    if (display_name && display_name !== user.user_metadata.display_name)
        updateData.data["display_name"] = display_name;
    if (password) updateData["password"] = password;
    if (resetAvatar) {
        // get name of current avatar
        const currentAvatar = user.user_metadata.avatar_url.split("/").pop();

        // reset current user avatar if it's not already the default
        if (currentAvatar !== "default_avatar.jpg") {
            const bucket = supabase.storage.from("avatars");

            const { error } = await bucket.remove([currentAvatar]);

            if (error) return actionError(actionName, { error: error.message });

            updateData.data.avatar_url = process.env.DEFAULT_AVATAR_URL;
        }
    } else if (avatarFile) {
        const bucket = supabase.storage.from("avatars");

        const fileName = `${Date.now()}`;

        const avatar_url = bucket.getPublicUrl(fileName).data.publicUrl;

        const currentAvatar = user.user_metadata.avatar_url.split("/").pop();

        const [{ error: uploadError }, { error: removeError }] = await Promise.all([
            bucket.upload(fileName, avatarFile),
            currentAvatar !== "default_avatar.jpg" ? bucket.remove([currentAvatar]) : { error: null },
        ]);

        if (uploadError || removeError)
            return actionError(actionName, { error: uploadError?.message || removeError?.message });

        updateData.data.avatar_url = avatar_url;
    }

    if (JSON.stringify(updateData) === JSON.stringify({ data: {} }))
        return actionSuccess(actionName, { message: "No changes were made." });

    const { error } = await supabase.auth.updateUser(updateData);

    if (error) return actionError(actionName, { error: error.message });

    const actionData = { ...updateData };

    if (password) actionData.password = "********";

    const revalidatePath = updateData.data?.display_name || updateData.data?.avatar_url ? "/" : null;

    return actionSuccess(actionName, actionData, { revalidatePath });
};

export default updateAccount;
