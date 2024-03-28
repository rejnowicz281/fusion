const formatAiMessages = (messages: { role: string; content: string }[]) => {
    const lastMessage = messages[messages.length - 1];

    // make sure last message ends with a period
    if (lastMessage && !lastMessage.content.endsWith(".")) lastMessage.content += ".";

    // if last message is from the assistant, make ai continue from it's last message
    if (lastMessage?.role === "assistant")
        messages.push({
            role: "user",
            content: "(continue from last message - add something more to your last message)",
        });
};

export default formatAiMessages;
