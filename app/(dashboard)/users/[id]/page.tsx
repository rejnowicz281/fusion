import getChat from "@/actions/chats/read/get-chat";
import ChatContainer from "@/components/chats/chat-container";
import ErrorContainer from "@/components/general/error-container";
import { FC } from "react";

const UserChatPage: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
    const { user, messages, error } = await getChat(id);

    if (error)
        return <ErrorContainer error="An error occured while loading the chat. Are you sure this person exists?" />;

    return <ChatContainer recipient={user} messages={messages} />;
};

export default UserChatPage;
