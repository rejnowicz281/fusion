import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getCurrentUser = async () => {
    const actionName = "getCurrentUser";

    const supabase = await createClient();

    const { data: user, error } = await supabase.rpc("get_current_user");

    if (error) return actionError(actionName, { error: "Couldn't get current user" }, { redirectPath: "/login" });

    return actionSuccess(actionName, { user }, { log: false });
};

export default getCurrentUser;
