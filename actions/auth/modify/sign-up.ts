"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

const signUp = async (formData: FormData) => {
    const actionName = "signUp";

    const emailFormData = formData.get("email");
    const displayNameFormData = formData.get("display_name");
    const passwordFormData = formData.get("password");
    const avatarFileFormData = formData.get("avatar");

    const email = typeof emailFormData === "string" ? emailFormData.trim() : null;
    const display_name = typeof displayNameFormData === "string" ? displayNameFormData.trim() : null;
    const password = typeof passwordFormData === "string" ? passwordFormData.trim() : null;
    const avatarFile =
        avatarFileFormData instanceof File && avatarFileFormData.type.startsWith("image/") ? avatarFileFormData : null;

    const origin = headers().get("origin");

    const supabase = createClient();

    const queryParams = new URLSearchParams();

    if (!email) queryParams.append("email-error", "Email is required");
    else if (!email.includes("@")) queryParams.append("email-error", "Email must be valid");

    if (!display_name) queryParams.append("display-name-error", "Name is required");

    if (!password) queryParams.append("password-error", "Password is required");
    else if (password.length < 6) queryParams.append("password-error", "Password must be at least 6 characters");

    const queryParamsString = queryParams.toString();

    if (queryParamsString)
        return actionError(actionName, { queryParams }, { redirectPath: `/register?${queryParamsString}` });

    const avatarData = (() => {
        if (avatarFile) {
            const bucket = supabase.storage.from("avatars");
            const fileName = `${Date.now()}`;
            const avatar_url = bucket.getPublicUrl(fileName).data.publicUrl;

            return { bucket, fileName, avatar_url };
        }

        return {
            avatar_url: process.env.DEFAULT_AVATAR_URL,
        };
    })();

    const { bucket, fileName, avatar_url } = avatarData;

    const { error } = await supabase.auth.signUp({
        email: email as string,
        password: password as string,
        options: {
            data: {
                display_name,
                avatar_url,
            },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return actionError(actionName, { error }, { redirectPath: `/register?error=${error.message}` });

    if (bucket && fileName && avatarFile) {
        const { error } = await bucket.upload(fileName, avatarFile);
        if (error) return actionError(actionName, { error }, { redirectPath: `/register?error=${error.message}` });
    }

    return actionSuccess(actionName, {}, { redirectPath: "/" });
};

export default signUp;
