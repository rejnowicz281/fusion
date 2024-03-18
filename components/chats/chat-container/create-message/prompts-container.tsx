import { Button } from "@/components/ui/button";
import useChatContext from "@/providers/chat-provider";
import { MdKeyboardArrowUp } from "@react-icons/all-files/md/MdKeyboardArrowUp";
import clsx from "clsx";
import { FC } from "react";

const PromptsContainer: FC<{
    onPromptClick: (text: string) => void;
}> = ({ onPromptClick }) => {
    const { setExpandPrompts, toggleExpandPrompts, expandPrompts } = useChatContext();

    const prompt = (text: string) => (
        <Button
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
            <div
                className={clsx(
                    expandPrompts ? "p-4 absolute inset-0 overflow-y-auto flex-col items-start" : "truncate",
                    "flex flex-1 gap-3"
                )}
            >
                {prompt(
                    "Soloremque quide,ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae  sequi repudiandae nisi iusto deserunt"
                )}
                {prompt(
                    "Repudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiaRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandRepudiandae nisi iusto deseruntide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandae ide, sequi repudiandndae"
                )}
                {prompt("Quidem, velit dolorum sequi?")}
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
