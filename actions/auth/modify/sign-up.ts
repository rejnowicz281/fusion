"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import registerSchema from "@/utils/forms/schemas/register-schema";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

const signUp = async (formData: FormData) => {
    const actionName = "signUp";

    const email = formData.get("email");
    const display_name = formData.get("display_name");
    const password = formData.get("password");

    const parsed = registerSchema.safeParse({
        email,
        display_name,
        password
    });

    const issues = parsed.error?.issues;

    if (issues) {
        const queryParams = new URLSearchParams();

        issues.forEach((issue) => {
            if (issue.path[0] === "email") queryParams.append("email-error", issue.message);
            if (issue.path[0] === "display_name") queryParams.append("display-name-error", issue.message);
            if (issue.path[0] === "password") queryParams.append("password-error", issue.message);
        });

        const queryParamsString = queryParams.toString();

        return actionError(actionName, { queryParams }, { redirectPath: `/register?${queryParamsString}` });
    }

    const avatarFileFormData = formData.get("avatar");

    const avatarFile =
        avatarFileFormData instanceof File && avatarFileFormData.type.startsWith("image/") ? avatarFileFormData : null;

    const origin = (await headers()).get("origin");

    const supabase = await createClient();

    const avatarData = (() => {
        if (avatarFile) {
            const bucket = supabase.storage.from("avatars");
            const fileName = `${Date.now()}`;
            const avatar_url = bucket.getPublicUrl(fileName).data.publicUrl;

            return { bucket, fileName, avatar_url };
        }

        return {
            avatar_url: process.env.DEFAULT_AVATAR_URL
        };
    })();

    const { bucket, fileName, avatar_url } = avatarData;

    const { error } = await supabase.auth.signUp({
        email: email as string,
        password: password as string,
        options: {
            data: {
                display_name,
                avatar_url
            },
            emailRedirectTo: `${origin}/auth/callback`
        }
    });

    if (error) return actionError(actionName, { error }, { redirectPath: `/register?error=${error.message}` });

    if (bucket && fileName && avatarFile) {
        const { error } = await bucket.upload(fileName, avatarFile);
        if (error) return actionError(actionName, { error }, { redirectPath: `/register?error=${error.message}` });
    }

    return actionSuccess(actionName, {}, { redirectPath: "/" });
};

export default signUp;
