import { Button } from "@/components/ui/button";
import { FC, ReactNode } from "react";

const SettingsButton: FC<{ children: ReactNode; onClick?: () => any; asChild?: boolean }> = ({
    children,
    onClick,
    asChild = false,
}) => {
    return (
        <Button
            className="flex items-center gap-1 rounded-none p-6 lg:rounded-md"
            variant="ghost"
            asChild={asChild}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default SettingsButton;
