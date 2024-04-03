type MessageType = {
    created_at: string;
    timestamp?: boolean;
    [key: string]: any;
};

// if a message was sent at least 10 minutes after the previous one, show a timestamp.
// if it's the first message, show a timestamp.
export const assignTimestamp = (message: MessageType, previousMessage: MessageType | null) => {
    if (!message) return;

    const timestamp = new Date(message.created_at).getTime();

    const previousMessageTimestamp = previousMessage && new Date(previousMessage.created_at).getTime();
    if (!previousMessageTimestamp || timestamp - previousMessageTimestamp > 600000) message.timestamp = true;
};

const generateTimestamps = (messages: MessageType[]) => {
    let previousMessage: MessageType | null = null;

    messages.forEach((message) => {
        assignTimestamp(message, previousMessage);
        previousMessage = message;
    });
};

export default generateTimestamps;
