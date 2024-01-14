"use server";

import actionError from "@/utils/actions/actionError";
import initialPrompt from "@/utils/prompts/initialPrompt";

export default async function generatePrompt(currentUser, recipient, messages) {
    if (currentUser.id === recipient.id) return "Am I really talking to myself...?";
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

        const content = data.error ? data.error.message : data.choices[0].message.content;

        return content;
    } catch (error) {
        return actionError(actionName, { error: error.message });
    }
}
