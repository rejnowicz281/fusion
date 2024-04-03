import { Button } from "@/components/ui/button";
import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";

const SettingsButton: ForwardRefRenderFunction<
    HTMLButtonElement,
    { children: ReactNode; onClick?: () => any; asChild?: boolean }
> = ({ children, onClick, asChild = false }, ref) => {
    return (
        <Button
            className="flex items-center gap-1 rounded-none p-6 xl:rounded-md"
            variant="ghost"
            asChild={asChild}
            onClick={onClick}
            ref={ref}
        >
            {children}
        </Button>
    );
};

export default forwardRef(SettingsButton);
