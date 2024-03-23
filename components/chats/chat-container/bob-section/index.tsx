import BobAvatar from "@/components/general/bob-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useChatContext from "@/providers/chat-provider";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Message from "./message";

export type BobMessage = {
    bob: boolean;
    text: string;
};

const BobSection = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const { toggleHelperSection, showHelperSection, recipient } = useChatContext();
    const previousMessageCount = useRef(0);
    const messagesRef = useRef<HTMLDivElement>(null);
    const [initialPromptClicked, setInitialPromptClicked] = useState<boolean>(false);

    const [messages, setMessages] = useState<BobMessage[]>([
        {
            bob: true,
            text: `Hi! I'm Bob, your very own personal AI sufler. I am here to make your conversation with ${recipient.display_name} easier. Here are some of the things I can help you with:\n- Help you find the right words to say\n- Provide tips on how to keep the conversation engaging and flowing\n- Remind you of important details or events to mention\n- Help you navigate cultural or social nuances in your conversation\n- Assist with organizing your thoughts and structuring your messages for better clarity\n- And much more!`,
        },
    ]);

    const addMessage = (message: BobMessage) => setMessages((prev) => [...prev, message]);

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
                    <BobAvatar />
                    <div className="text-xl tracking-wide text-center">Bob, Your Personal Sufler</div>
                    <div ref={messagesRef} className="flex flex-col gap-5 max-w-[700px] w-full px-3 pt-3 pb-6">
                        <>
                            <Message message={messages[0]} />
                            <Button
                                onClick={() => {
                                    setInitialPromptClicked(true);
                                    addMessage({
                                        bob: false,
                                        text: `Generate a list of 5 things I could say to ${recipient.display_name} right now`,
                                    });
                                }}
                                className={clsx(
                                    initialPromptClicked && "hidden",
                                    "max-w-[400px] h-auto w-full mx-auto bg-[rgb(83,116,161)] dark:bg-[rgb(22,40,65)] dark:hover:bg-[rgb(50,70,97)] hover:bg-[rgb(137,162,197)] text-zinc-200 dark:text-zinc-200 rounded-lg"
                                )}
                            >
                                Generate a list of 5 things I could say to {recipient.display_name} right now
                            </Button>
                            {messages.slice(1).map((message, index) => (
                                <Message message={message} key={index} />
                            ))}
                        </>
                    </div>
                </div>
            </div>
            <form
                ref={formRef}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();

                    if (formRef.current) {
                        const formData = new FormData(formRef.current);
                        const text = formData.get("text");
                        if (typeof text === "string" && text.trim().length > 0) {
                            addMessage({ bob: false, text: text });
                            formRef.current.reset();
                        }
                    }
                }}
                className="flex items-center gap-3 justify-center p-6 border-t border-t-neutral-300 dark:border-t-neutral-800"
            >
                <Input name="text" placeholder="Ask me anything..." className="flex-1" />
                <Button type="submit" variant="ghost">
                    Ask
                </Button>
            </form>
        </div>
    );
};

export default BobSection;
