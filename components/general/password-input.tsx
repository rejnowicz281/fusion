import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash";
import clsx from "clsx";
import { FC, useState } from "react";

const PasswordInput: FC<{ placeholder?: string; className?: string }> = ({ placeholder = "••••••••", className }) => {
    const [type, setType] = useState<"text" | "password">("password");

    return (
        <div
            className={clsx(
                "h-10 flex rounded-md border border-zinc-200 ring-offset-white dark:border-zinc-800 dark:bg-zinc-950",
                className
            )}
        >
            <input
                className="min-w-0 flex-1 pl-3 rounded-tl-md rounded-bl-md text-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-500 focus-visible:outline-none bg-inherit"
                type={type}
                id="password"
                name="password"
                placeholder={placeholder}
            />
            <button
                type="button"
                className="shrink px-2 text-gray-500 hover:text-gray-400 transition-colors outline-none focus-visible:text-zinc-800 dark:focus-visible:text-zinc-200"
                onClick={() => setType((prev) => (prev === "password" ? "text" : "password"))}
            >
                {type === "password" ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    );
};

export default PasswordInput;
