const formatAiMessages = (initialMessages: { role: string; content: string }[], userName: string) => {
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

    // if last message is from the assistant, make ai continue from it's last message
    if (lastMessage?.role === "assistant")
        messages.push({
            role: "user",
            content: `(continue as if ${userName} hasn't responded yet - keep it very, very short.)`,
        });

    return messages;
};

export default formatAiMessages;
