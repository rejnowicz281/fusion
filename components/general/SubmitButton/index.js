"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ className, content, loading }) {
    const { pending } = useFormStatus();

    // if loading is a string, it will be used as the loading text, otherwise 'content' will always be used
    return (
        <button className={className} disabled={pending} type="submit">
            {loading ? (pending ? loading : content) : content}
        </button>
    );
}

export default SubmitButton;
