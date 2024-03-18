"use client";

import CreateMessage from "./create-message";
import MessagesList from "./messages-list";
import TopSection from "./top-section";

const ChatContainer = () => {
    return (
        <>
            <TopSection />
            <MessagesList />
            <CreateMessage />
        </>
    );
};

export default ChatContainer;
