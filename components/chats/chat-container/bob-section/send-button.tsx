import { Button } from "@/components/ui/button";
import { FaArrowUp } from "@react-icons/all-files/fa/FaArrowUp";
import { FC } from "react";

const SendButton: FC<{ disabled: boolean }> = ({ disabled }) => {
    return (
        <Button type="submit" variant="ghost" disabled={disabled}>
            <FaArrowUp />
        </Button>
    );
};

export default SendButton;
