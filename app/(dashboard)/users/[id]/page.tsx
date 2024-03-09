import getChat from "@/actions/chats/read/get-chat";
import MessagesContainer from "@/components/chats/messages-container";
import Sidebar from "@/components/chats/sidebar";
import FreshDataProvider from "@/providers/fresh-data-provider";
import { FC } from "react";
import css from "./page.module.css";

const UserChatPage: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
    const { user, messages, error } = await getChat(id);

    if (error)
        return (
            <div className={css["error-container"]}>
                An error occured while loading the chat. Are you sure this person exists? 🤔
            </div>
        );

    return (
        <FreshDataProvider>
            <div className={css.container}>
                <MessagesContainer recipient={user} messages={messages} />
                <Sidebar />
            </div>
        </FreshDataProvider>
    );
};

export default UserChatPage;
