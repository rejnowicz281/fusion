import { User } from "@/types/user";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import { createClient } from "@/utils/supabase/server";

const getCurrentUser = async () => {
    const actionName = "getCurrentUser";

    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (!data.user?.id)
        return actionError(actionName, { error: "Couldn't get current user" }, { redirectPath: "/login" });

    const user: User = {
        id: data.user.id,
        email: data.user.email!,
        display_name: data.user.user_metadata.display_name || data.user.email,
        avatar_url: data.user.user_metadata.avatar_url,
        created_at: data.user.created_at,
        provider: data.user.app_metadata.provider,
    };

    return actionSuccess(actionName, { user }, { log: false });
};

export default getCurrentUser;
