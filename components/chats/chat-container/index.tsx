"use client";

import useChatContext from "@/providers/chat-provider";
import clsx from "clsx";
import BobSection from "./bob-section";
import CreateMessage from "./create-message";
import MessagesList from "./messages-list";
import TopSection from "./top-section";

const ChatContainer = () => {
    const { showHelperSection, talkingToSelf } = useChatContext();

    return (
        <div className="flex flex-1">
            <div className={clsx(showHelperSection ? "hidden xl:flex" : "flex", "relative flex-1")}>
                <div className="absolute inset-0 flex-1 flex flex-col overflow-y-auto">
                    <TopSection />
                    <MessagesList />
                    <CreateMessage />
                </div>
            </div>
            <div
                className={clsx(
                    showHelperSection && !talkingToSelf ? "flex-1" : "hidden",
                    "relative flex xl:flex-[0_0_450px] xl:border-l xl:border-l-neutral-300 xl:dark:border-l-neutral-800"
                )}
            >
                <div className="absolute flex-1 inset-0 flex flex-col overflow-y-auto">
                    <BobSection />
                </div>
            </div>
        </div>
    );
};

export default ChatContainer;
