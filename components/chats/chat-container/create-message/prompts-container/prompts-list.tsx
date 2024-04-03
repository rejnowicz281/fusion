import { Button } from "@/components/ui/button";
import useChatContext from "@/providers/chat-provider";
import clsx from "clsx";
import { FC } from "react";
import PromptsSkeleton from "./prompts-skeleton";

const PromptsList: FC<{
    onPromptClick: (text: string) => void;
    prompts?: string[];
}> = ({ onPromptClick, prompts = [] }) => {
    const { setExpandPrompts, expandPrompts } = useChatContext();

    const prompt = (text: string, index: number) => (
        <Button
            key={index}
            onClick={() => {
                setExpandPrompts(false);
                onPromptClick(text);
            }}
            className={clsx(
                "bg-[rgb(83,116,161)] dark:bg-[rgb(22,40,65)] dark:hover:bg-[rgb(50,70,97)] hover:bg-[rgb(137,162,197)] text-zinc-200 dark:text-zinc-200 rounded-lg",
                expandPrompts ? "h-min py-5" : "truncate flex-grow"
            )}
        >
            <span className={clsx(expandPrompts ? "text-start" : "truncate")}>{text}</span>
        </Button>
    );

    return (
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
                <PromptsSkeleton />
            )}
        </div>
    );
};

export default PromptsList;
