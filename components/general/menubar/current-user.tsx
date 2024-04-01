"use client";

import Avatar from "@/components/general/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useAuthContext from "@/providers/auth-provider";
import { HiOutlineUsers } from "@react-icons/all-files/hi2/HiOutlineUsers";
import { MdOutlineSettings } from "@react-icons/all-files/md/MdOutlineSettings";
import { FC } from "react";

const CurrentUser: FC<{
    showSettings: boolean;
    toggleSettings: () => void;
}> = ({ toggleSettings, showSettings }) => {
    const { user } = useAuthContext();

    return (
        <div className="flex items-center p-4 justify-between gap-4 transition-colors border-t border-t-neutral-300 dark:border-t-neutral-800">
            <div className="truncate flex items-center gap-3">
                <Avatar aiMode={user.ai_mode} avatarSize={40} markerSize={12} userId={user.id} src={user.avatar_url} />
                <div className="truncate flex flex-col">
                    <div className="truncate dark:font-semibold">{user.display_name}</div>
                    <div className="truncate text-gray-500 text-sm font-semibold">FUSION ACCOUNT</div>
                </div>
            </div>
            <Tooltip>
                <TooltipContent>{showSettings ? "Friends" : "Settings"}</TooltipContent>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={toggleSettings}>
                        {showSettings ? (
                            <HiOutlineUsers className="shrink-0 text-2xl text-gray-500" />
                        ) : (
                            <MdOutlineSettings className="shrink-0 text-2xl text-gray-500" />
                        )}
                    </Button>
                </TooltipTrigger>
            </Tooltip>
        </div>
    );
};

export default CurrentUser;
