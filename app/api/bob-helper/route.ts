import { AI } from "@/constants/ai";
import anthropic from "@/utils/ai/anthropic";
import formatSameRoleMessages from "@/utils/ai/helpers/formatSameRoleMessages";
import generateErrorStream from "@/utils/ai/helpers/generate-error-stream";
import bobHelperPrompt, { bobHelperPromptString } from "@/utils/ai/prompts/bob-helper-prompt";
import { AnthropicStream, OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
    const { chatMessages, bobMessages, currentUser, recipient } = await req.json();

    switch (AI) {
        case "chatgpt": {
            formatSameRoleMessages(bobMessages);
            bobMessages.unshift(bobHelperPrompt(chatMessages, recipient, currentUser));

            const res = await fetch("https://api.openai.com/v1/chat/completions", {
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
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stream: true,
                    n: 1,
                }),
            });

            if (!res.ok) return new Response(generateErrorStream(res.statusText));

            const stream = OpenAIStream(res);

            return new Response(stream);
        }
        case "claude": {
            bobMessages.unshift({
                role: "user",
                content: "hello",
            });
            formatSameRoleMessages(bobMessages);

            const system = bobHelperPromptString(chatMessages, recipient, currentUser);

            const res = await anthropic.messages
                .create({
                    system,
                    messages: bobMessages,
                    max_tokens: 1024,
                    top_p: 1,
                    model: "claude-3-haiku-20240307",
                    stream: true,
                    temperature: 0.4,
                })
                .then((res) => {
                    const stream = AnthropicStream(res);

                    return new StreamingTextResponse(stream);
                })
                .catch(() => new StreamingTextResponse(generateErrorStream()));

            return res;
        }
    }
}
