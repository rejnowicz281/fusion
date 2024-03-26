"use client";

import { Button } from "@/components/ui/button";
import useChatContext from "@/providers/chat-provider";
import { MdKeyboardArrowUp } from "@react-icons/all-files/md/MdKeyboardArrowUp";
import clsx from "clsx";

const ExpandButton = () => {
    const { expandPrompts, toggleExpandPrompts } = useChatContext();

    return (
        <Button
            className={clsx(expandPrompts && "absolute bottom-1 right-4")}
            variant={expandPrompts ? "outline" : "ghost"}
            size="icon"
            onClick={toggleExpandPrompts}
        >
            <MdKeyboardArrowUp className={clsx(expandPrompts && "-rotate-180", "transition-transform text-2xl")} />
        </Button>
    );
};

export default ExpandButton;
