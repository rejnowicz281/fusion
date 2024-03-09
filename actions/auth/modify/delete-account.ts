"use server";

import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const deleteAccount = async () => {
    const actionName = "deleteAccount";

    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    const id = data.user?.id;

    if (id === process.env.DEMO_USER_ID)
        return actionError(actionName, { error: "You cannot delete this demo account." });

    const { data: user, error } = await supabase.from("users").delete().eq("id", id);

    if (error) return actionError(actionName, { error });

    await supabase.auth.signOut();

    return actionSuccess(actionName, { id }, { redirectPath: "/login" });
};

export default deleteAccount;
