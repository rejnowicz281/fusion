"use server";

import { AI } from "@/constants/ai";
import { ActionResponse } from "@/types/action-response";
import { ClaudeMessage } from "@/types/claude-message";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import anthropic from "@/utils/ai/anthropic";
import formatSameRoleMessages from "@/utils/ai/helpers/format-same-role-messages";
import autoCompletePrompt, { autoCompletePromptString } from "@/utils/ai/prompts/auto-complete-prompt";
import { randomUUID } from "crypto";

const nStrings = (n: number, string: string) => Array.from({ length: n }, () => string);

const promptTesting = async (n: number) => {
    const actionName = "promptTesting";
    await new Promise((resolve) => setTimeout(resolve, 500));
    const prompt = () => randomUUID();
    const prompts = nStrings(n, prompt());

    return actionSuccess(actionName, { prompts }, { logData: false });
};

export default async function generatePrompts(
    currentUser: User,
    recipient: User,
    messages: Message[],
    initialN = 1,
    english = true
) {
    // make sure n can only be 1, 2 or 3
    const n = Math.min(Math.max(initialN, 1), 3);

    // return await promptTesting(n);

    const actionName = `generatePrompts-${AI}`;

    const formattedMessages = messages.map((message, idx) => {
        // have current user be the assistant
        const role = message.sender.id === currentUser.id ? "user" : "assistant";

        // make sure last message ends with a period
        const isLastMessage = idx === messages.length - 1;
        const content = message.text + (!message.text.endsWith(".") && isLastMessage ? "." : "");

        return {
            role,
            content,
        };
    });

    const nPrompts = (prompt: string) => nStrings(n, prompt);

    const gptFetch = () => {
        const messages = formatSameRoleMessages(formattedMessages);

        messages.unshift(autoCompletePrompt(currentUser, recipient, english));

        return fetch("https://api.openai.com/v1/chat/completions", {
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
    };

    const gptResponse = async (fallback = false): Promise<ActionResponse> => {
        const res = await gptFetch();

        if (!res.ok) {
            if (fallback) return claudeResponse();

            return actionError(actionName, { prompts: nPrompts(res.statusText) });
        }

        const data = await res.json();

        if (data.error) {
            if (fallback) return claudeResponse();

            return actionError(actionName, { prompts: nPrompts(data.error.message) });
        }

        const prompts = data.choices.map((choice: { message: { content: string } }) => choice.message.content);

        return actionSuccess(actionName, { prompts, previousMessages: formattedMessages }, { logData: false });
    };

    const claudeResponse = async (fallback = false): Promise<ActionResponse> => {
        const withUser = [{ role: "user", content: "hello" }, ...formattedMessages];

        const messages = formatSameRoleMessages(withUser);

        const system = autoCompletePromptString(currentUser, recipient, english);

        const prompt = () =>
            anthropic.messages
                .create({
                    system,
                    messages: messages as ClaudeMessage[],
                    max_tokens: 200,
                    top_p: 1,
                    model: "claude-3-haiku-20240307",
                    temperature: 0.4,
                })
                .then((res) => {
                    const prompt = res.content[0].text;

                    return prompt;
                });

        try {
            const prompts = await Promise.all(
                Array.from({ length: n }, () => {
                    return prompt();
                })
            );

            return actionSuccess(actionName, { prompts }, { logData: true });
        } catch (e: any) {
            if (fallback) return gptResponse();

            return actionError(actionName, {
                prompts: nPrompts("There was an error generating the prompt"),
                error: e.message,
            });
        }
    };

    switch (AI) {
        case "chatgpt": {
            return gptResponse(true);
        }
        case "claude": {
            return claudeResponse(true);
        }
        default: {
            const prompt = "AI not found";

            const prompts = nPrompts(prompt);

            return actionError(actionName, { prompts });
        }
    }
}
