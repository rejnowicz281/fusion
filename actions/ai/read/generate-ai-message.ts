"use server";

import { AI } from "@/constants/ai";
import { ActionResponse } from "@/types/action-response";
import { ClaudeMessage } from "@/types/claude-message";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import anthropic from "@/utils/ai/anthropic";
import formatAiMessages from "@/utils/ai/helpers/format-ai-messages";
import basicAiUserPrompt, { basicAiUserPromptString } from "@/utils/ai/prompts/basic-ai-user-prompt";
import hydratePrompt from "@/utils/ai/prompts/hydrate-prompt";
import debug from "@/utils/general/debug";
import { randomUUID } from "crypto";

const nStrings = (n: number, string: string) => Array.from({ length: n }, () => string);

const promptTesting = async (n: number) => {
    const actionName = "promptTesting";
    await new Promise((resolve) => setTimeout(resolve, 500));
    const prompt = () => randomUUID();
    const prompts = nStrings(n, prompt());

    return actionSuccess(actionName, { prompts }, { logData: false });
};

const generateAiMessages = async (humanUser: User, aiUser: User, messages: Message[], initialN = 1) => {
    // make sure n can only be 1, 2 or 3
    const n = Math.min(Math.max(initialN, 1), 3);

    // return await promptTesting(n);

    const actionName = `generateAiMessages-${AI}`;

    const formattedMessages = messages.map((message) => {
        const role = message.sender.id === humanUser.id ? "user" : "assistant";

        return {
            role,
            content: message.text,
        };
    });

    const nPrompts = (prompt: string) => nStrings(n, prompt);

    const gptFetch = () => {
        const system = aiUser.ai_prompt
            ? {
                  role: "system",
                  content: hydratePrompt(aiUser.ai_prompt, humanUser, aiUser),
              }
            : basicAiUserPrompt(humanUser, aiUser);

        const messages = formatAiMessages([system, ...formattedMessages]);

        return fetch("https://api.openai.com/v1/chat/completions", {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            method: "POST",
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages,
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
        debug("Running GPT Response");
        const res = await gptFetch();

        if (!res.ok) {
            if (fallback) {
                debug(`GPT Failed, Falling back to Claude - ${res.statusText}`);
                return claudeResponse();
            }

            return actionError(actionName, { prompts: nPrompts(res.statusText) });
        }

        const data = await res.json();

        if (data.error) {
            if (fallback) {
                debug(`GPT Failed, Falling back to Claude - ${data.error.message}`);
                return claudeResponse();
            }

            return actionError(actionName, { prompts: nPrompts(data.error.message) });
        }

        const prompts = data.choices.map((choice: { message: { content: string } }) => choice.message.content);

        return actionSuccess(actionName, { prompts }, { logData: false });
    };

    const claudeResponse = async (fallback = false): Promise<ActionResponse> => {
        debug("Running Claude Response");
        const withUser = [{ role: "user", content: "hello" }, ...formattedMessages];

        const messages = formatAiMessages(withUser);

        const system = aiUser.ai_prompt
            ? hydratePrompt(aiUser.ai_prompt, humanUser, aiUser)
            : basicAiUserPromptString(humanUser, aiUser);

        const prompt = () =>
            anthropic.messages
                .create({
                    system,
                    messages: messages as ClaudeMessage[],
                    max_tokens: 200,
                    top_p: 1,
                    model: "claude-3-haiku-20240307",
                    temperature: 0.2,
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

            return actionSuccess(actionName, { prompts }, { logData: false });
        } catch (e: any) {
            if (fallback) {
                debug(`Claude Failed, Falling back to GPT - ${e.message}`);
                return gptResponse();
            }

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
            return actionError(actionName, { prompts: nPrompts("AI Not Found") });
        }
    }
};

export default generateAiMessages;
