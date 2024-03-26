"use client";

import { Button } from "@/components/ui/button";
import useChatContext from "@/providers/chat-provider";
import { MdAutorenew } from "@react-icons/all-files/md/MdAutorenew";
import clsx from "clsx";
import { FC } from "react";

const RefreshButton: FC<{
    onClick: () => any;
    disabled: boolean;
}> = ({ onClick, disabled }) => {
    const { expandPrompts } = useChatContext();

    return (
        <Button
            className={clsx(expandPrompts && "absolute bottom-1 left-4 z-10")}
            size="icon"
            variant={expandPrompts ? "outline" : "ghost"}
            disabled={disabled}
            onClick={onClick}
        >
            <MdAutorenew className={clsx(disabled && "animate-spin", "text-xl")} />
        </Button>
    );
};

export default RefreshButton;
