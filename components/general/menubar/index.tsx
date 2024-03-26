"use client";

import dynamic from "next/dynamic";
import { FC, useState } from "react";
import Loading from "../loading";
import CurrentUser from "./current-user";

const LazySettings = dynamic(() => import("./settings"), {
    loading: () => <Loading />,
});

const Menubar: FC<{ UsersContainer: React.JSX.Element }> = ({ UsersContainer }) => {
    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => setShowSettings((prev) => !prev);

    return (
        <div className="flex-1 flex flex-col">
            {showSettings ? (
                <div className="relative flex-1">
                    <div className="absolute overflow-y-auto inset-0 flex flex-col">
                        <LazySettings />
                    </div>
                </div>
            ) : (
                UsersContainer
            )}
            <CurrentUser showSettings={showSettings} toggleSettings={toggleSettings} />
        </div>
    );
};

export default Menubar;
