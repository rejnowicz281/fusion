"use client";

import { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
    className?: string;
    content: ReactNode | string;
    loading?: ReactNode | string;
    formAction?: (formData: FormData) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const SubmitButton: FC<SubmitButtonProps> = ({ className, content, loading, formAction, onClick }) => {
    const { pending } = useFormStatus();

    // if loading is a string, it will be used as the loading text, otherwise 'content' will always be used
    return (
        <button onClick={onClick} formAction={formAction} className={className} disabled={pending} type="submit">
            {loading ? (pending ? loading : content) : content}
        </button>
    );
};

export default SubmitButton;
