"use client";

import useDashboardContext from "@/providers/dashboard-provider";

const BackButton = () => {
    const { setShowMenubar } = useDashboardContext();

    return (
        <button onClick={() => setShowMenubar(true)} className="lg:hidden">
            Back
        </button>
    );
};

export default BackButton;
