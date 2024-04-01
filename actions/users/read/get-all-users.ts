import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getAllUsers = async () => {
    const actionName = "getAllUsers";

    const supabase = createClient();

    const { data: users, error } = await supabase.from("users_with_details").select("*");

    if (error) return actionError(actionName, { error: error.message });

    return actionSuccess(actionName, { users }, { logData: false });
};

export default getAllUsers;
