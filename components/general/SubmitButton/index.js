"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ className, content, loading }) {
    const { pending } = useFormStatus();

    return (
        <button className={className} disabled={pending} type="submit">
            {loading ? (pending ? loading : content) : content}
        </button>
    );
}

export default SubmitButton;
