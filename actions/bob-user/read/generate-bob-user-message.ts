"use server";

import { AI } from "@/constants/ai";
import { ClaudeMessage } from "@/types/claude-message";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import actionError from "@/utils/actions/action-error";
import actionSuccess from "@/utils/actions/action-success";
import anthropic from "@/utils/ai/anthropic";
import formatSameRoleMessages from "@/utils/ai/helpers/formatSameRoleMessages";
import bobUserPrompt, { bobUserPromptString } from "@/utils/ai/prompts/bob-user-prompt";

export default async function generateBobUserMessage(currentUser: User, messages: Message[]) {
    const actionName = "generateBobUserMessage";

    const formattedMessages = messages.map((message) => {
        return {
            role: message.sender.id === currentUser.id ? "user" : "assistant",
            content: message.text,
        };
    });

    switch (AI) {
        case "chatgpt": {
            formatSameRoleMessages(formattedMessages);

            formattedMessages.unshift(bobUserPrompt(currentUser));

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
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    n: 1,
                }),
            });

            if (!res.ok) return actionError(actionName, { prompt: res.statusText });

            const data = await res.json();

            const prompt = data.error ? data.error.message : data.choices[0].message.content;

            return actionSuccess(actionName, { prompt, previousMessages: formattedMessages }, { logData: false });
        }
        case "claude": {
            formattedMessages.unshift({ role: "user", content: "hello" });

            formatSameRoleMessages(formattedMessages);

            const system = bobUserPromptString(currentUser);

            const res = await anthropic.messages
                .create({
                    system,
                    messages: formattedMessages as ClaudeMessage[],
                    max_tokens: 1024,
                    top_p: 1,
                    model: "claude-3-haiku-20240307",
                    temperature: 0.4,
                })
                .then((res) => {
                    const prompt = res.content[0].text;
                    return actionSuccess(
                        actionName,
                        { prompt, previousMessages: formattedMessages },
                        { logData: false }
                    );
                })
                .catch((e) => {
                    console.log(e);
                    return actionSuccess(actionName, { prompt: "There was an error generating the prompt" });
                });

            return res;
        }
    }
}
