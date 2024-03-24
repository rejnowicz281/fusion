import { OpenAIStreamPayload } from "@/types/openai-stream-payload";
import bobSystemPrompt from "@/utils/prompts/bob-system-prompt";
import OpenAIStream from "@/utils/prompts/openai-stream";

export async function POST(req: Request) {
    const { chatMessages, bobMessages, currentUser, recipient } = await req.json();

    bobMessages.unshift(bobSystemPrompt(chatMessages, recipient, currentUser));

    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        messages: bobMessages,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
        n: 1,
    };

    const stream = await OpenAIStream(payload);

    return new Response(stream);
}
