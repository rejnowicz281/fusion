"use server";

import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";
import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";

export async function signIn(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return actionError("signIn", {}, "/login?message=Invalid Email or Password");

    return actionSuccess("signIn", {}, "/");
}

export async function signUp(formData) {
    const email = formData.get("email");
    const display_name = formData.get("username");
    const password = formData.get("password");
    const passwordConfirm = formData.get("password-confirm");
    const avatarFile = formData.get("avatar");

    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const queryParams = new URLSearchParams();

    if (!email) queryParams.append("message", "Email is required");
    if (!email.includes("@")) queryParams.append("message", "Email must be valid");
    if (!display_name) queryParams.append("message", "Username is required");
    if (!password) queryParams.append("message", "Password is required");
    if (password.length < 6) queryParams.append("message", "Password must be at least 6 characters");
    if (!passwordConfirm) queryParams.append("message", "Password confirmation is required");
    if (password !== passwordConfirm) queryParams.append("message", "Passwords do not match");

    if (queryParams.toString()) return actionError("signUp", {}, `/register?${queryParams.toString()}`);

    const bucket = supabase.storage.from("avatars");
    const fileName = `${Date.now()}`;

    const avatar_url = avatarFile.type.startsWith("image/")
        ? bucket.getPublicUrl(fileName).data.publicUrl
        : process.env.DEFAULT_AVATAR_URL;

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: display_name,
                avatar_url,
            },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return actionError("signUp", { error }, `/register?message=${error.message}`);

    const { data: avatar, avatarError } = await bucket.upload(fileName, avatarFile);

    if (avatarError) return actionError("signUp", { avatarError });

    return actionSuccess("signUp", {}, "/");
}

export async function demoLogin() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
        email: "demo@demo.demo",
        password: "123456",
    });

    if (error) return actionError("demoLogin", {}, "/login?message=Could not authenticate user");

    return actionSuccess("demoLogin", {}, "/");
}

export async function signOut() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();

    return actionSuccess("signOut", {}, "/login");
}

export async function deleteUser(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const id = formData.get("id");

    const { data: user, error } = await supabase.from("users").delete().eq("id", id);

    if (error) return actionError("deleteUser", { error });

    await supabase.auth.signOut();

    return actionSuccess("deleteUser", { id }, "/login");
}
