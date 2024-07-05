import BobAvatar from "@/components/general/bob-avatar";
import useAuthContext from "@/providers/auth-provider";
import { ChatGPTMessage } from "@/types/chat-gpt-message";
import Image from "next/image";
import { FC } from "react";

const MessageContainer: FC<{ message: ChatGPTMessage }> = ({ message }) => {
    const { user } = useAuthContext();

    return (
        <div className="flex gap-4">
            {message.role === "assistant" ? (
                <BobAvatar size={25} />
            ) : (
                <Image
                    unoptimized
                    className="rounded-[50%]"
                    src={user.avatar_url}
                    alt={user.display_name}
                    width={25}
                    height={25}
                    style={{
                        width: 25,
                        height: 25
                    }}
                />
            )}
            <div>
                <div className="xl:text-sm font-semibold">{message.role === "assistant" ? "Bob" : "You"}</div>
                <div className="xl:text-sm whitespace-pre-line word-break leading-7 xl:leading-6">
                    {message.content}
                </div>
            </div>
        </div>
    );
};

export default MessageContainer;
