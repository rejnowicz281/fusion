const generateErrorStream = (message?: string) => {
    const encoder = new TextEncoder();

    // Create a stream that returns an error message
    const stream = new ReadableStream({
        start(controller) {
            const errorMessage = `I'm sorry, but I can't help you right now. AI also needs a break sometimes. Please try again later${
                message ? ` - ${message}` : "."
            }`;
            const queue = encoder.encode(errorMessage);
            controller.enqueue(queue);
            controller.close();
        },
    });

    return stream;
};

export default generateErrorStream;
