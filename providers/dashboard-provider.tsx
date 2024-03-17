"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";

type DashboardContextType = {
    showMenubar: boolean;

    setShowMenubar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardProvider: FC<{ Menubar: React.JSX.Element; children: ReactNode }> = ({ Menubar, children }) => {
    const [showMenubar, setShowMenubar] = useState(false);
    const pathname = usePathname();

    const isHomePage = pathname === "/";

    useEffect(() => {
        setShowMenubar(false);
    }, [pathname]);

    return (
        <DashboardContext.Provider value={{ showMenubar, setShowMenubar }}>
            <div className="flex flex-1">
                <div
                    className={clsx(
                        (showMenubar || isHomePage) && "flex-1 border-r-0",
                        "relative flex lg:flex-[0_0_450px] lg:border-r lg:border-r-neutral-300 lg:dark:border-r-neutral-800"
                    )}
                >
                    <div className="absolute flex-1 inset-0 flex flex-col overflow-y-auto">{Menubar}</div>
                </div>
                <div className={clsx((showMenubar || isHomePage) && "hidden", "flex relative flex-1")}>
                    <div className="absolute inset-0 flex-1 flex flex-col overflow-y-auto">{children}</div>
                </div>
            </div>
        </DashboardContext.Provider>
    );
};

const useDashboardContext = () => {
    const context = useContext(DashboardContext);

    if (!context) throw new Error("useDashboardContext must be used within a DashboardProvider");

    return context;
};

export default useDashboardContext;
