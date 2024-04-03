import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { useFormStatus } from "react-dom";

const _PendingInputContainer: ForwardRefRenderFunction<
    HTMLInputElement,
    {
        beforeSend: () => void;
    }
> = ({ beforeSend }, ref) => {
    const { pending } = useFormStatus();

    return (
        <>
            <Input
                disabled={pending}
                className="text-md py-8 rounded-none dark:bg-inherit border-none"
                placeholder="Type your message here..."
                type="text"
                name="text"
                ref={ref}
            />
            <Button
                disabled={pending}
                className="text-md py-8 rounded-none text-blue-500 hover:text-blue-500 dark:hover:text-blue-500 font-bold"
                variant="ghost"
                onClick={beforeSend}
            >
                SEND
            </Button>
        </>
    );
};

const _InputContainer: ForwardRefRenderFunction<
    HTMLInputElement,
    {
        beforeSend: () => void;
    }
> = ({ beforeSend }, ref) => {
    return (
        <>
            <Input
                className="text-md py-8 rounded-none dark:bg-inherit border-none"
                placeholder="Type your message here..."
                type="text"
                name="text"
                ref={ref}
            />
            <Button
                className="text-md py-8 rounded-none text-blue-500 hover:text-blue-500 dark:hover:text-blue-500 font-bold"
                variant="ghost"
                onClick={beforeSend}
            >
                SEND
            </Button>
        </>
    );
};

export const PendingInputContainer = forwardRef(_PendingInputContainer);
export const InputContainer = forwardRef(_InputContainer);
