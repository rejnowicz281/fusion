import useChatContext from "@/providers/chat-provider";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FC } from "react";
import ExpandButton from "./expand-button";
import PromptsList from "./prompts-list";
import RefreshButton from "./refresh-button";

const PromptsContainer: FC<{
    onPromptClick: (text: string) => void;
}> = ({ onPromptClick }) => {
    const { generatePrompt, generateInitialPrompts, recipient } = useChatContext();

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

    return (
        <div className="flex-1 px-4 pt-4 pb-1 flex gap-3 relative">
            <RefreshButton onClick={() => fetchNextPage()} disabled={isFetching || isFetchingNextPage || isLoading} />
            <PromptsList onPromptClick={onPromptClick} prompts={prompts} />
            <ExpandButton />
        </div>
    );
};

export default PromptsContainer;
