"use server";

import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const signOut = async () => {
    const actionName = "signOut";

    const supabase = createClient();

    await supabase.auth.signOut();

    return actionSuccess(actionName, {}, { redirectPath: "/login" });
};

export default signOut;
