import { ActionResponseConfig } from "@/types/action-response-config";
import actionResponse from "./action-response";

const actionSuccess = (actionName: string, data: Record<string, any> = {}, config: ActionResponseConfig = {}) => {
    return actionResponse(true, actionName, data, config);
};

export default actionSuccess;
