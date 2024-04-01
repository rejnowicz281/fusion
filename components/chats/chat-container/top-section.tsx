"use client";

import createBookmark from "@/actions/bookmarks/modify/create-bookmark";
import deleteBookmark from "@/actions/bookmarks/modify/delete-bookmark";
import Avatar from "@/components/general/avatar";
import BobAvatar from "@/components/general/bob-avatar";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import useAuthContext from "@/providers/auth-provider";
import useChatContext from "@/providers/chat-provider";
import useDashboardContext from "@/providers/dashboard-provider";
import { AiOutlineLoading } from "@react-icons/all-files/ai/AiOutlineLoading";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import { IoStar } from "@react-icons/all-files/io5/IoStar";
import { IoStarOutline } from "@react-icons/all-files/io5/IoStarOutline";
import { RiOpenaiFill } from "@react-icons/all-files/ri/RiOpenaiFill";
import clsx from "clsx";

const TopSection = () => {
    const { user } = useAuthContext();
    const { setMenubarState, menubarState } = useDashboardContext();
    const { toggleHelperSection, showHelperSection, talkingToSelf } = useChatContext();
    const { recipient, talkingToBob } = useChatContext();

    return (
        <div className="flex items-center gap-2 justify-between p-4">
            <div className="flex items-center gap-4 truncate">
                <Button variant="ghost" size="icon" onClick={() => setMenubarState(!menubarState)}>
                    <FaArrowLeft className={clsx(menubarState && "xl:rotate-180", "text-xl")} />
                </Button>
                <div className="truncate flex items-center gap-3 group">
                    {talkingToBob ? (
                        <BobAvatar size={50} />
                    ) : (
                        <Avatar
                            avatarSize={50}
                            markerSize={12}
                            src={recipient.avatar_url}
                            aiMode={recipient.ai_mode}
                            userId={recipient.id}
                        />
                    )}
                    <div className="truncate flex flex-col justify-evenly p-2 rounded-lg transition-colors">
                        <div className="truncate">{recipient.display_name}</div>
                        {talkingToBob ? (
                            <div className="truncate text-zinc-500">AI Companion</div>
                        ) : recipient.email !== recipient.display_name ? (
                            <div className="truncate text-zinc-500">{recipient.email}</div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
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
                <Button
                    className={clsx(
                        showHelperSection && "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    )}
                    disabled={talkingToSelf || talkingToBob}
                    onClick={toggleHelperSection}
                    variant="ghost"
                    size="icon"
                >
                    <RiOpenaiFill className="text-2xl text-blue-500 dark:text-white" />
                </Button>
            </div>
        </div>
    );
};

export default TopSection;
