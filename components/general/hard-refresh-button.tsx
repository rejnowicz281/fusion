"use client";

import { FC } from "react";

type HardRefreshButtonProps = {
    className?: string;
    content?: string;
};

const HardRefreshButton: FC<HardRefreshButtonProps> = ({
    className = "text-blue-500 hover:underline",
    content = "Refresh",
}) => {
    return (
        <button className={className} onClick={() => window.location.reload()}>
            {content}
        </button>
    );
};

export default HardRefreshButton;
