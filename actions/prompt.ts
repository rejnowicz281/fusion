"use server";

import { Message } from "@/types/message";
import { User } from "@/types/user";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import initialPrompt from "@/utils/prompts/initial-prompt";
import { randomUUID } from "crypto";

const promptTesting = async () => {
    const actionName = "promptTesting";
    await new Promise((resolve) => setTimeout(resolve, 500));
    const prompt = randomUUID();

    return actionSuccess(actionName, { prompt }, { logData: false });
};

export async function generateInitialPrompts(currentUser: User, recipient: User, messages: Message[]) {
    const actionName = "generateInitialPrompts";

    const [first, second, third] = await Promise.all([
        generatePrompt(currentUser, recipient, messages).then((res) => res.prompt),
        generatePrompt(currentUser, recipient, messages).then((res) => res.prompt),
        generatePrompt(currentUser, recipient, messages).then((res) => res.prompt),
    ]);

    return actionSuccess(actionName, { prompts: [first, second, third] }, { log: false });
}

export default async function generatePrompt(currentUser: User, recipient: User, messages: Message[]) {
    // return await promptTesting();

    const actionName = "generatePrompt";

    const formattedMessages = messages.map((message) => {
        return {
            role: message.sender.id === currentUser.id ? "assistant" : "user", // have current user be the assistant
            content: message.text,
        };
    });

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            method: "POST",
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [initialPrompt(currentUser, recipient), ...formattedMessages],
                temperature: 0.4,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                max_tokens: 100,
                n: 1,
            }),
        });

        const data = await res.json();

        const prompt = data.error ? data.error.message : data.choices[0].message.content;

        return actionSuccess(actionName, { prompt, previousMessages: formattedMessages }, { logData: false });
    } catch (error: any) {
        return actionError(actionName, { error: error.message });
    }
}
