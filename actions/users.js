"use server";

import actionError from "@/utils/actions/actionError";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getAllUsers() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: users, error } = await supabase.from("users").select("id, email, display_name, avatar_url");

    if (error) return actionError("getAllUsers", { error });

    return users;
}
