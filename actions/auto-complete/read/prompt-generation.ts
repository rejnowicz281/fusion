"use server";

import { AI } from "@/constants/ai";
import { ClaudeMessage } from "@/types/claude-message";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import anthropic from "@/utils/ai/anthropic";
import formatSameRoleMessages from "@/utils/ai/helpers/format-same-role-messages";
import autoCompletePrompt, { autoCompletePromptString } from "@/utils/ai/prompts/auto-complete-prompt";
import { randomUUID } from "crypto";

const promptTesting = async () => {
    const actionName = "promptTesting";
    await new Promise((resolve) => setTimeout(resolve, 500));
    const prompt = randomUUID();

    return actionSuccess(actionName, { prompt }, { logData: false });
};

export default async function generatePrompts(
    currentUser: User,
    recipient: User,
    messages: Message[],
    initialN = 1,
    english = true
) {
    // return await promptTesting();

    const actionName = `generatePrompts-${AI}`;

    const formattedMessages = messages.map((message) => {
        return {
            role: message.sender.id === currentUser.id ? "assistant" : "user", // have current user be the assistant
            content: message.text,
        };
    });

    // make sure n can only be 1, 2 or 3
    const n = Math.min(Math.max(initialN, 1), 3);

    switch (AI) {
        case "chatgpt": {
            formatSameRoleMessages(formattedMessages);

            formattedMessages.unshift(autoCompletePrompt(currentUser, recipient, english));

            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                method: "POST",
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: formattedMessages,
                    temperature: 0.4,
                    max_tokens: 200,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0.6,
                    n,
                }),
            });

            if (!res.ok) return actionError(actionName, { prompt: res.statusText });

            const data = await res.json();

            const prompts = data.error
                ? [data.error.message]
                : data.choices.map((choice: { message: { content: string } }) => choice.message.content);

            return actionSuccess(actionName, { prompts, previousMessages: formattedMessages }, { logData: false });
        }
        case "claude": {
            formattedMessages.unshift({
                role: "user",
                content: "hello",
            });

            formatSameRoleMessages(formattedMessages);

            const system = autoCompletePromptString(currentUser, recipient, english);

            const prompt = () =>
                anthropic.messages
                    .create({
                        system,
                        messages: formattedMessages as ClaudeMessage[],
                        max_tokens: 200,
                        top_p: 1,
                        model: "claude-3-haiku-20240307",
                        temperature: 0.4,
                    })
                    .then((res) => {
                        const prompt = res.content[0].text || "There was an error generating the prompt";
                        return prompt;
                    })
                    .catch((e) => {
                        return "There was an error generating the prompt";
                    });

            const prompts = await Promise.all(
                Array.from({ length: n }, () => {
                    return prompt();
                })
            );

            return actionSuccess(actionName, { prompts }, { logData: true });
        }
    }
}
