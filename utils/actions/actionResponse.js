import { redirect } from "next/navigation";

export default function actionResponse(success = true, actionName, additionalData = {}, redirectPath = null) {
    const data = {
        action: actionName,
        success,
        ...additionalData,
    };
    if (success) console.log(data);
    else console.error(data);

    if (redirectPath) {
        redirect(redirectPath);
    } else return data;
}
