import actionResponse from "./actionResponse";

export default function actionSuccess(actionName, additionalData = {}, redirectPath = null) {
    return actionResponse(true, actionName, additionalData, redirectPath);
}
