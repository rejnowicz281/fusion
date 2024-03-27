import BobAvatar from "@/components/general/bob-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthContext from "@/providers/auth-provider";
import useChatContext from "@/providers/chat-provider";
import { ChatGPTMessage } from "@/types/chat-gpt-message";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import MessageContainer from "./message-container";
import ResetButton from "./reset-button";
import SendButton from "./send-button";

const BobSection = () => {
    const { user } = useAuthContext();

    const formRef = useRef<HTMLFormElement>(null);
    const { toggleHelperSection, showHelperSection, recipient, optimisticMessages: chatMessages } = useChatContext();
    const previousMessageCount = useRef(0);
    const messagesRef = useRef<HTMLDivElement>(null);
    const [initialPromptClicked, setInitialPromptClicked] = useState<boolean>(false);
    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const initialData: ChatGPTMessage[] = [
        {
            role: "assistant",
            content: `Hi! I'm Bob, your very own personal AI sufler. I am here to make your conversation with ${recipient.display_name} easier. Here are some of the things I can help you with:\n- Help you find the right words to say\n- Provide tips on how to keep the conversation engaging and flowing\n- Remind you of important details or events to mention\n- Help you navigate cultural or social nuances in your conversation\n- Assist with organizing your thoughts and structuring your messages for better clarity\n- And much more!`,
        },
    ];

    const { data: messages } = useQuery({
        queryKey: ["bobMessages", recipient.id],
        initialData,
    });

    const addMessage = (message: ChatGPTMessage) => {
        queryClient.setQueryData(["bobMessages", recipient.id], (prev: ChatGPTMessage[]) => {
            return [...prev, message];
        });
    };

    const concatLastMessage = (text: string) => {
        queryClient.setQueryData(["bobMessages", recipient.id], (prev: ChatGPTMessage[]) => {
            const lastMessage = prev[prev.length - 1];
            return prev.slice(0, -1).concat({
                ...lastMessage,
                content: lastMessage.content + text,
            });
        });
    };

    const removeLastMessage = () => {
        queryClient.setQueryData(["bobMessages", recipient.id], (prev: ChatGPTMessage[]) => {
            return prev.slice(0, -1);
        });
    };

    const resetChat = () => {
        queryClient.setQueryData(["bobMessages", recipient.id], initialData);
        setInitialPromptClicked(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const content = formData.get("content");
            if (typeof content === "string" && content.trim().length > 0) {
                setInitialPromptClicked(true);

                sendMessage({ role: "user", content });

                formRef.current.reset();
            }
        }
    };

    const { mutate: sendMessage, isPending } = useMutation({
        mutationKey: ["sendBobMessage"],

        // include message to later use it in onMutate

        mutationFn: async (message: ChatGPTMessage) => {
            const response = await fetch("/api/bob-helper", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chatMessages,
                    bobMessages: [...messages, message],
                    currentUser: user,
                    recipient,
                }),
            });

            return response.body;
        },
        onMutate(message: ChatGPTMessage) {
            addMessage(message);
        },
        onSuccess: async (stream) => {
            if (!stream) throw new Error("No stream");

            // construct new message to add

            const responseMessage: ChatGPTMessage = {
                role: "assistant",
                content: "",
            };

            // add new message to state
            addMessage(responseMessage);

            setIsMessageUpdating(true);

            const reader = stream.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);

                // update last message with new chunks
                concatLastMessage(chunkValue);
            }

            // clean up
            setIsMessageUpdating(false);
        },
        onError: (_, message) => {
            removeLastMessage();
            console.log("There was an error sending the message.");
        },
    });

    useEffect(() => {
        if (messages && messagesRef.current) {
            const container = messagesRef.current;
            const currentMessageCount = messages.length;

            // Scroll down only if a new message is added or helper section is on
            if (currentMessageCount > previousMessageCount.current || showHelperSection) {
                const lastMessage = container.lastElementChild;
                if (lastMessage) lastMessage.scrollIntoView({ behavior: "smooth" });
            }

            previousMessageCount.current = currentMessageCount;
        }
    }, [messages, showHelperSection]);

    return (
        <div className="flex flex-1 flex-col">
            <Button
                className="xl:hidden flex items-center gap-2 p-6 rounded-none border-b border-b-neutral-300 dark:border-b-neutral-800"
                onClick={toggleHelperSection}
                variant="ghost"
            >
                <FaArrowLeft className={clsx(!showHelperSection && "xl:rotate-180", "text-xl")} />
                Back To Chat
            </Button>
            <div className="flex-1 relative">
                <div className="absolute pt-6 inset-0 overflow-y-auto flex flex-col items-center gap-2">
                    <BobAvatar size={55} />
                    <div className="text-xl tracking-wide text-center">Bob, Your Personal Sufler</div>
                    <div ref={messagesRef} className="flex flex-col gap-5 max-w-[700px] w-full px-3 pt-3 pb-6">
                        <>
                            {messages.map((message, index) => (
                                <MessageContainer message={message} key={index} />
                            ))}
                            {!initialPromptClicked && (
                                <Button
                                    onClick={() => {
                                        sendMessage({
                                            role: "user",
                                            content: `Generate a list of 5 things I could say to ${recipient.display_name} right now`,
                                        });
                                        setInitialPromptClicked(true);
                                    }}
                                    className="max-w-[400px] h-auto w-full mx-auto bg-[rgb(83,116,161)] dark:bg-[rgb(22,40,65)] dark:hover:bg-[rgb(50,70,97)] hover:bg-[rgb(137,162,197)] text-zinc-200 dark:text-zinc-200 rounded-lg"
                                >
                                    Generate a list of 5 things I could say to {recipient.display_name} right now
                                </Button>
                            )}
                        </>
                    </div>
                </div>
            </div>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex items-center gap-3 justify-center p-6 border-t border-t-neutral-300 dark:border-t-neutral-800"
            >
                <ResetButton disabled={isPending || isMessageUpdating} onClick={resetChat} />
                <Input
                    disabled={isPending || isMessageUpdating}
                    name="content"
                    placeholder="Ask me anything..."
                    className="flex-1"
                />
                <SendButton disabled={isPending || isMessageUpdating} />
            </form>
        </div>
    );
};

export default BobSection;
