"use client";

import { Button } from "@/components/ui/button";
import useAuthContext from "@/providers/auth-provider";
import { MdOutlineSettings } from "@react-icons/all-files/md/MdOutlineSettings";
import Link from "next/link";
import PresenceAvatar from "../presence-avatar";

const CurrentUser = () => {
    const { user } = useAuthContext();

    return (
        <div className="flex items-center p-4 justify-between gap-4 transition-colors border-t border-t-neutral-800">
            <div className="truncate flex items-center gap-3">
                <PresenceAvatar avatarSize={40} userId={user.id} src={user.avatar_url} />
                <div className="truncate flex flex-col font-semibold">
                    <div className="truncate">{user.display_name}</div>
                    <div className="truncate text-gray-500 text-sm">FUSION ACCOUNT</div>
                </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/settings">
                    <MdOutlineSettings className="shrink-0 text-2xl text-gray-500" />
                </Link>
            </Button>
        </div>
    );
};

export default CurrentUser;
