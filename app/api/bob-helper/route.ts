import { AI } from "@/constants/ai";
import { ClaudeMessage } from "@/types/claude-message";
import anthropic from "@/utils/ai/anthropic";
import formatSameRoleMessages from "@/utils/ai/helpers/format-same-role-messages";
import generateErrorStream from "@/utils/ai/helpers/generate-error-stream";
import bobHelperPrompt, { bobHelperPromptString } from "@/utils/ai/prompts/bob-helper-prompt";
import { AnthropicStream, OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
    const { chatMessages, bobMessages, currentUser, recipient } = await req.json();

    const gptFetch = () => {
        const messages = formatSameRoleMessages(bobMessages);

        messages.unshift(bobHelperPrompt(chatMessages, recipient, currentUser));

        return fetch("https://api.openai.com/v1/chat/completions", {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            method: "POST",
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: bobMessages,
                temperature: 0.4,
                max_tokens: 1024,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stream: true,
                n: 1,
            }),
        });
    };

    const claudeFetch = () => {
        const withUser = [{ role: "user", content: "hello" }, ...bobMessages];

        const messages = formatSameRoleMessages(withUser);

        const system = bobHelperPromptString(chatMessages, recipient, currentUser);

        return anthropic.messages.create({
            system,
            messages: messages as ClaudeMessage[],
            max_tokens: 1024,
            top_p: 1,
            model: "claude-3-haiku-20240307",
            stream: true,
            temperature: 0.4,
        });
    };

    const gptResponse = async (fallback = false): Promise<Response> => {
        const res = await gptFetch();

        if (!res.ok) {
            if (fallback) return claudeResponse();

            return new Response(generateErrorStream(res.statusText));
        }

        const stream = OpenAIStream(res);

        return new Response(stream);
    };

    const claudeResponse = async (fallback = false): Promise<Response> => {
        try {
            const res = await claudeFetch();

            const stream = AnthropicStream(res);

            return new StreamingTextResponse(stream);
        } catch (_) {
            if (fallback) return gptResponse();

            return new Response(generateErrorStream());
        }
    };

    switch (AI) {
        case "chatgpt":
            return gptResponse(true);
        case "claude":
            return claudeResponse(true);
        default:
            return new Response(generateErrorStream());
    }
}
