import actionResponse from "./actionResponse";

export default function actionError(actionName, additionalData = {}, redirectPath = null) {
    return actionResponse(false, actionName, additionalData, redirectPath);
}
