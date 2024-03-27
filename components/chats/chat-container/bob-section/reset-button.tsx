import { Button } from "@/components/ui/button";
import { GrPowerReset } from "@react-icons/all-files/gr/GrPowerReset";
import { FC } from "react";

const ResetButton: FC<{
    onClick: () => any;
    disabled: boolean;
}> = ({ disabled, onClick }) => {
    return (
        <Button type="button" size="icon" variant="ghost" disabled={disabled} onClick={onClick}>
            <GrPowerReset className="text-lg" />
        </Button>
    );
};

export default ResetButton;
