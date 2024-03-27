"use server";

import { Message } from "@/types/message";
import { User } from "@/types/user";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import bobUserPrompt from "@/utils/ai/prompts/bob-user-prompt";

export default async function generateBobUserMessage(currentUser: User, messages: Message[]) {
    const actionName = "generateBobUserMessage";

    const formattedMessages = messages.map((message) => {
        return {
            role: message.sender.id === currentUser.id ? "user" : "assistant",
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
                messages: [bobUserPrompt(currentUser), ...formattedMessages],
                temperature: 0.4,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
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
