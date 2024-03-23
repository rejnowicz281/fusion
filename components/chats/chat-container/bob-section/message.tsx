import BobAvatar from "@/components/general/bob-avatar";
import useAuthContext from "@/providers/auth-provider";
import Image from "next/image";
import { FC } from "react";
import { BobMessage } from ".";

const Message: FC<{ message: BobMessage }> = ({ message }) => {
    const { user } = useAuthContext();

    return (
        <div className="flex gap-4">
            {message.bob ? (
                <BobAvatar size={25} />
            ) : (
                <Image
                    className="rounded-[50%]"
                    src={user.avatar_url}
                    alt={user.display_name}
                    sizes="100vw"
                    width={25}
                    height={25}
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
            )}
            <div>
                <div className="xl:text-sm font-semibold">{message.bob ? "Bob" : "You"}</div>
                <div className="xl:text-sm whitespace-pre-line">{message.text}</div>
            </div>
        </div>
    );
};

export default Message;
