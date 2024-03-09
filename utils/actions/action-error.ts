import { ActionResponseConfig } from "@/types/action-response-config";
import actionResponse from "./action-response";

const actionError = (actionName: string, data: Record<string, any> = {}, config: ActionResponseConfig = {}) => {
    return actionResponse(false, actionName, data, config);
};
export default actionError;
