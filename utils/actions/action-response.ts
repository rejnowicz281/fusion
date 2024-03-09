import { ActionResponse } from "@/types/action-response";
import { ActionResponseConfig } from "@/types/action-response-config";
import { revalidatePath as revalidate } from "next/cache";
import { redirect } from "next/navigation";

const actionResponse = (
    success = true,
    actionName: string,
    data: Record<string, any> = {},
    config: ActionResponseConfig = {}
) => {
    const revalidatePath = config.revalidatePath || null;
    const redirectPath = config.redirectPath || null;
    const log = config.log !== false; // default to true
    const logData = config.logData !== false; // default to true

    const response: ActionResponse = {
        action: actionName,
        success,
        ...data,
    };

    if (process.env.NODE_ENV !== "production" && log) {
        const res = logData ? response : { action: actionName, success };

        if (success) console.log(res);
        else console.error(res);
    }

    if (redirectPath) redirect(redirectPath);
    if (revalidatePath) revalidate(revalidatePath, "page");

    return response;
};

export default actionResponse;
