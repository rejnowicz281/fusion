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
import formatSameRoleMessages from "@/utils/ai/helpers/format-same-role-messages";
import bobUserPrompt, { bobUserPromptString } from "@/utils/ai/prompts/bob-user-prompt";
import debug from "@/utils/general/debug";

export default async function generateBobUserMessage(currentUser: User, messages: Message[]) {
    const actionName = `generateBobUserMessage-${AI}`;

    const formattedMessages = messages.map((message) => {
        return {
            role: message.sender.id === currentUser.id ? "user" : "assistant",
            content: message.text,
        };
    });

    formatAiMessages(formattedMessages);

    const gptFetch = () => {
        const messages = formatSameRoleMessages(formattedMessages);

        messages.unshift(bobUserPrompt(currentUser));

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
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                n: 1,
            }),
        });
    };

    const gptResponse = async (fallback = false): Promise<ActionResponse> => {
        debug("Running GPT Response");

        const res = await gptFetch();

        if (!res.ok) {
            if (fallback) {
                debug(`GPT failed, falling back to Claude - ${res.statusText}`);
                return claudeResponse();
            }

            return actionError(actionName, { prompt: res.statusText });
        }

        const data = await res.json();

        if (data.error) {
            if (fallback) {
                debug(`GPT failed, falling back to Claude - ${data.error.message}`);
                return claudeResponse();
            }

            return actionError(actionName, { prompt: data.error.message });
        }

        const prompt = data.choices[0].message.content;

        return actionSuccess(actionName, { prompt }, { logData: true });
    };

    const claudeFetch = () => {
        const withUser = [{ role: "user", content: "hello" }, ...formattedMessages];

        const messages = formatSameRoleMessages(withUser);

        const system = bobUserPromptString(currentUser);

        return anthropic.messages.create({
            system,
            messages: messages as ClaudeMessage[],
            max_tokens: 1024,
            top_p: 1,
            model: "claude-3-haiku-20240307",
            temperature: 0.4,
        });
    };

    const claudeResponse = async (fallback = false): Promise<ActionResponse> => {
        debug("Running Claude Response");

        try {
            const res = await claudeFetch();

            const prompt = res.content[0].text;

            return actionSuccess(actionName, { prompt }, { logData: true });
        } catch (e: any) {
            if (fallback) {
                debug(`Claude failed, falling back to GPT - ${e.message}`);
                return gptResponse();
            }

            return actionError(actionName, {
                prompt: "There was an error generating the prompt",
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
    }
}
