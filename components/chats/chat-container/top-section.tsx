"use client";

import createBookmark from "@/actions/bookmarks/modify/create-bookmark";
import deleteBookmark from "@/actions/bookmarks/modify/delete-bookmark";
import PresenceAvatar from "@/components/general/presence-avatar";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import useAuthContext from "@/providers/auth-provider";
import useChatContext from "@/providers/chat-provider";
import useDashboardContext from "@/providers/dashboard-provider";
import { AiOutlineLoading } from "@react-icons/all-files/ai/AiOutlineLoading";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import { IoStar } from "@react-icons/all-files/io5/IoStar";
import { IoStarOutline } from "@react-icons/all-files/io5/IoStarOutline";

const TopSection = () => {
    const { user } = useAuthContext();
    const { setShowMenubar } = useDashboardContext();
    const { recipient } = useChatContext();

    return (
        <div className="flex items-center gap-2 justify-between p-4">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMenubar(true)}>
                    <FaArrowLeft className="text-xl" />
                </Button>
                <div className="min-w-0 truncate flex items-center gap-3 group">
                    <PresenceAvatar avatarSize={50} src={recipient.avatar_url} userId={recipient.id} />
                    <div className="truncate flex flex-col justify-evenly p-2 rounded-lg transition-colors">
                        <div className="truncate">{recipient.display_name}</div>
                        {recipient.email !== recipient.display_name && (
                            <div className="truncate text-zinc-500">{recipient.email}</div>
                        )}
                    </div>
                </div>
            </div>

            {recipient.bookmark_id ? (
                <form action={deleteBookmark}>
                    <input type="hidden" name="id" value={recipient.bookmark_id} />
                    <Button asChild variant="ghost" size="icon">
                        <SubmitButton
                            content={<IoStar className="text-2xl text-blue-500 dark:text-white" />}
                            loading={<AiOutlineLoading className="animate-spin text-2xl" />}
                        />
                    </Button>
                </form>
            ) : (
                <form action={createBookmark}>
                    <input type="hidden" name="user_id" value={user.id} />
                    <input type="hidden" name="bookmarked_id" value={recipient.id} />
                    <Button asChild variant="ghost" size="icon">
                        <SubmitButton
                            content={<IoStarOutline className="text-2xl text-blue-500 dark:text-white" />}
                            loading={<AiOutlineLoading className="animate-spin text-2xl" />}
                        />
                    </Button>
                </form>
            )}
        </div>
    );
};

export default TopSection;
