"use client";

import { Button } from "@/components/ui/button";
import useAuthContext from "@/providers/auth-provider";
import { HiOutlineUsers } from "@react-icons/all-files/hi2/HiOutlineUsers";
import { MdOutlineSettings } from "@react-icons/all-files/md/MdOutlineSettings";
import { FC } from "react";
import PresenceAvatar from "../presence-avatar";

const CurrentUser: FC<{
    showSettings: boolean;
    toggleSettings: () => void;
}> = ({ toggleSettings, showSettings }) => {
    const { user } = useAuthContext();

    return (
        <div className="flex items-center p-4 justify-between gap-4 transition-colors border-t border-t-neutral-300 dark:border-t-neutral-800">
            <div className="truncate flex items-center gap-3">
                <PresenceAvatar avatarSize={40} userId={user.id} src={user.avatar_url} />
                <div className="truncate flex flex-col">
                    <div className="truncate dark:font-semibold">{user.display_name}</div>
                    <div className="truncate text-gray-500 text-sm font-semibold">FUSION ACCOUNT</div>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleSettings}>
                {showSettings ? (
                    <HiOutlineUsers className="shrink-0 text-2xl text-gray-500" />
                ) : (
                    <MdOutlineSettings className="shrink-0 text-2xl text-gray-500" />
                )}
            </Button>
        </div>
    );
};

export default CurrentUser;
