import { getChat } from "@/actions/chats";
import MessagesContainer from "@/components/chats/MessagesContainer";
import Sidebar from "@/components/chats/Sidebar";
import FreshDataProvider from "@/providers/FreshDataProvider";
import css from "./page.module.css";

export default async function UserChatPage({ params: { id } }) {
    const chat = await getChat(id);

    if (chat.error)
        return (
            <div className={css["error-container"]}>
                An error occured while loading the chat. Are you sure this person exists? 🤔
            </div>
        );

    return (
        <FreshDataProvider>
            <div className={css.container}>
                <MessagesContainer recipientId={id} messages={chat.messages} />
                <Sidebar />
            </div>
        </FreshDataProvider>
    );
}
