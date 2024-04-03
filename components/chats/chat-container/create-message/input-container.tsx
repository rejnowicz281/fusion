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
                className="text-md py-5 h-min rounded-none dark:bg-inherit border-none"
                placeholder="Type your message here..."
                type="text"
                name="text"
                ref={ref}
                disabled={pending}
            />
            <button
                disabled={pending}
                className="text-md flex group justify-center p-3 items-center disabled:pointer-events-none disabled:opacity-50"
                onClick={beforeSend}
            >
                <div className="p-2 text-blue-500 rounded-md transition-colors group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 font-bold">
                    SEND
                </div>
            </button>
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
        <div className="flex flex-1">
            <Input
                className="text-md py-5 h-min rounded-none dark:bg-inherit border-none"
                placeholder="Type your message here..."
                type="text"
                name="text"
                ref={ref}
            />
            <button
                className="text-md flex group justify-center p-3 items-center disabled:pointer-events-none disabled:opacity-50"
                onClick={beforeSend}
            >
                <div className="p-2 text-blue-500 rounded-md transition-colors group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 font-bold">
                    SEND
                </div>
            </button>
        </div>
    );
};

export const PendingInputContainer = forwardRef(_PendingInputContainer);
export const InputContainer = forwardRef(_InputContainer);
