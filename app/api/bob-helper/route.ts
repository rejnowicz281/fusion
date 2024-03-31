import { AI } from "@/constants/ai";
import { ClaudeMessage } from "@/types/claude-message";
import { Message } from "@/types/message";
import anthropic from "@/utils/ai/anthropic";
import formatAiMessages from "@/utils/ai/helpers/format-ai-messages";
import generateErrorStream from "@/utils/ai/helpers/generate-error-stream";
import bobHelperPrompt, { bobHelperPromptString } from "@/utils/ai/prompts/bob-helper-prompt";
import debug from "@/utils/general/debug";
import { AnthropicStream, OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
    const { chatMessages, bobMessages, currentUser, recipient } = await req.json();
    const formattedChatMessages = chatMessages.map((message: Message) => {
        return {
            id: message.id,
            created_at: message.created_at,
            text: message.text,
            sender: {
                id: message.sender.id,
                name: message.sender.display_name,
                email: message.sender.email,
            },
        };
    });
    const chatHistoryJSON = JSON.stringify(formattedChatMessages);

    const chatHistory = `Here are the messages that you have exchanged so far with user ${recipient.id}:
    ${chatHistoryJSON}`;

    // get the last assistant message and add chat history to it

    const assistantMessage = bobMessages
        .toReversed()
        .find((message: { role: "assistant" | "user" }) => message.role === "assistant");

    if (assistantMessage) assistantMessage.content = `${assistantMessage.content} \n\n --- ${chatHistory} ---`;
    else bobMessages.push({ role: "assistant", content: chatHistory });

    const gptFetch = () => {
        const system = bobHelperPrompt(recipient, currentUser);

        const messages = formatAiMessages([system, ...bobMessages]);

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

        const messages = formatAiMessages(withUser);

        const system = bobHelperPromptString(recipient, currentUser);

        return anthropic.messages.create({
            system,
            messages: messages as ClaudeMessage[],
            max_tokens: 1024,
            top_p: 1,
            model: "claude-3-haiku-20240307",
            stream: true,
            temperature: 0.2,
        });
    };

    const gptResponse = async (fallback = false): Promise<Response> => {
        debug("Running GPT Response");
        const res = await gptFetch();

        if (!res.ok) {
            if (fallback) {
                debug(`GPT Failed, Falling back to Claude - ${res.statusText}`);
                return claudeResponse();
            }

            return new Response(generateErrorStream(res.statusText));
        }

        const stream = OpenAIStream(res);

        return new Response(stream);
    };

    const claudeResponse = async (fallback = false): Promise<Response> => {
        debug("Running Claude Response");
        try {
            const res = await claudeFetch();

            const stream = AnthropicStream(res);

            return new StreamingTextResponse(stream);
        } catch (e: any) {
            if (fallback) {
                debug(`Claude Failed, Falling back to GPT - ${e.message}`);
                return gptResponse();
            }

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
