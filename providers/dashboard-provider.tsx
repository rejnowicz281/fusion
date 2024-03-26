"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import useRealtime from "@/hooks/use-realtime";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { SettingsProvider } from "./settings-provider";

type DashboardContextType = {
    menubarState: boolean;

    setMenubarState: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardProvider: FC<{ Menubar: React.JSX.Element; children: ReactNode }> = ({ Menubar, children }) => {
    const [menubarState, setMenubarState] = useState(false); // on small devices: true = open, false = closed | on bigger devices: true = closed, false = open
    const pathname = usePathname();

    const isHomePage = pathname === "/";

    useEffect(() => {
        setMenubarState(false);
    }, [pathname]);

    useRealtime(); // Connect to supabase realtime to listen for message changes

    return (
        <DashboardContext.Provider value={{ menubarState, setMenubarState }}>
            <SettingsProvider>
                <TooltipProvider>
                    <div className="flex flex-1">
                        <div
                            className={clsx(
                                menubarState && "xl:hidden",
                                (menubarState || isHomePage) && "flex-1",
                                "relative flex xl:flex-[0_0_450px] xl:border-r xl:border-r-neutral-300 xl:dark:border-r-neutral-800"
                            )}
                        >
                            <div className="absolute inset-0 flex-1 flex flex-col overflow-y-auto">{Menubar}</div>
                        </div>
                        <div
                            className={clsx(menubarState || isHomePage ? "hidden xl:flex" : "flex", "relative flex-1")}
                        >
                            <div className="absolute inset-0 flex-1 flex flex-col overflow-y-auto">{children}</div>
                        </div>
                    </div>
                </TooltipProvider>
            </SettingsProvider>
        </DashboardContext.Provider>
    );
};

const useDashboardContext = () => {
    const context = useContext(DashboardContext);

    if (!context) throw new Error("useDashboardContext must be used within a DashboardProvider");

    return context;
};

export default useDashboardContext;
