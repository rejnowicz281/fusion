import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash";
import clsx from "clsx";
import { FC, useState } from "react";

const PasswordInput: FC<{ placeholder?: string; className?: string }> = ({ placeholder = "••••••••", className }) => {
    const [type, setType] = useState<"text" | "password">("password");

    return (
        <div
            className={clsx(
                "h-10 flex rounded-md border border-slate-200 ring-offset-white focus-within:ring-2 focus-within:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 focus-within:ring-slate-200",
                className
            )}
        >
            <input
                className="flex-1 pl-3 rounded-tl-md rounded-bl-md text-sm placeholder:text-slate-500 focus-visible:outline-none"
                type={type}
                id="password"
                name="password"
                placeholder={placeholder}
            />
            <button
                type="button"
                className="px-2 text-gray-500 hover:text-gray-400 transition-colors outline-none focus-visible:text-black"
                onClick={() => setType((prev) => (prev === "password" ? "text" : "password"))}
            >
                {type === "password" ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    );
};

export default PasswordInput;
