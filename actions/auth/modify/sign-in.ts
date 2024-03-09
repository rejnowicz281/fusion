"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const signIn = async (formData: FormData) => {
    const actionName = "signIn";

    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string")
        return actionError(actionName, {}, { redirectPath: "/login?error=Invalid Email or Password" });

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return actionError(actionName, {}, { redirectPath: "/login?error=Invalid Email or Password" });

    return actionSuccess(actionName, {}, { redirectPath: "/" });
};

export default signIn;
