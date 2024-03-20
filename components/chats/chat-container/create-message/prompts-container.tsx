import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useChatContext from "@/providers/chat-provider";
import { MdKeyboardArrowUp } from "@react-icons/all-files/md/MdKeyboardArrowUp";
import { useInfiniteQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { FC } from "react";

const PromptsContainer: FC<{
    onPromptClick: (text: string) => void;
}> = ({ onPromptClick }) => {
    const { setExpandPrompts, toggleExpandPrompts, expandPrompts, generatePrompt, generateInitialPrompts, recipient } =
        useChatContext();

    const { data, fetchNextPage, isFetching, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ["prompts", recipient.id],
        queryFn: async ({ pageParam = 0 }) => {
            if (pageParam === 0) return generateInitialPrompts();
            else return generatePrompt();
        },
        initialPageParam: 0,
        getNextPageParam(lastPage, allPages) {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        },
    });

    const prompts = data?.pages.flat();

    const prompt = (text: string, index: number) => (
        <Button
            key={index}
            onClick={() => {
                setExpandPrompts(false);
                onPromptClick(text);
            }}
            className={clsx(
                "text-start bg-[rgb(83,116,161)] dark:bg-[rgb(22,40,65)] dark:hover:bg-[rgb(50,70,97)] hover:bg-[rgb(137,162,197)] text-zinc-200 dark:text-zinc-200 rounded-lg",
                expandPrompts ? "h-min py-5" : "truncate max-w-[40%]"
            )}
        >
            <span className={clsx(!expandPrompts && "truncate")}>{text}</span>
        </Button>
    );

    return (
        <div className="flex-1 px-4 pt-4 pb-1 flex gap-3 relative">
            <Button
                className={clsx(expandPrompts && "absolute bottom-1 left-4 z-10")}
                size="icon"
                variant={expandPrompts ? "outline" : "ghost"}
                disabled={isFetching || isFetchingNextPage || isLoading}
                onClick={() => fetchNextPage()}
            >
                ?
            </Button>
            <div
                className={clsx(
                    expandPrompts ? "p-4 absolute inset-0 overflow-y-auto flex-col items-start" : "truncate",
                    "flex flex-1 gap-3"
                )}
            >
                {prompts && prompts.length > 0 ? (
                    expandPrompts ? (
                        prompts.map((text, index) => prompt(text, index))
                    ) : (
                        prompts
                            .toReversed()
                            .slice(0, 3)
                            .map((text, index) => prompt(text, index))
                    )
                ) : (
                    <>
                        <Skeleton className="h-10 w-1/3 bg-[rgb(197,210,228)]" />
                        <Skeleton className="h-10 w-1/2 bg-[rgb(197,210,228)]" />
                        <Skeleton className="h-10 w-1/4 bg-[rgb(197,210,228)]" />
                    </>
                )}
            </div>

            <Button
                className={clsx(expandPrompts && "absolute bottom-1 right-4")}
                variant={expandPrompts ? "outline" : "ghost"}
                size="icon"
                onClick={toggleExpandPrompts}
            >
                <MdKeyboardArrowUp className={clsx(expandPrompts && "-rotate-180", "transition-transform text-2xl")} />
            </Button>
        </div>
    );
};

export default PromptsContainer;
