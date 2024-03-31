const detectModel = (messages: { role: string; content: string }[]) => {
    const systemMessage = messages.find((message) => message.role === "system");

    if (systemMessage) return "chatgpt";
    else return "claude";
};

const formatAiMessages = (initialMessages: { role: string; content: string }[]) => {
    const messages = [...initialMessages];

    // detect two messages in a row with the same role and merge them
    for (let i = 0; i < messages.length - 1; i++) {
        if (messages[i].role === messages[i + 1].role) {
            messages[i].content += " \n " + messages[i + 1].content;
            messages.splice(i + 1, 1);
            i--;
        }
    }

    const lastMessage = messages[messages.length - 1];

    // make sure last message ends with a period
    if (lastMessage && !lastMessage.content.endsWith(".")) lastMessage.content += ".";

    if (detectModel(messages) === "chatgpt") {
        // if last message is from the assistant, make ai continue from it's last message
        if (lastMessage?.role === "assistant")
            messages.push({
                role: "user",
                content: `go on`,
            });
    }

    return messages;
};

export default formatAiMessages;
