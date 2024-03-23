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
    const [menubarState, setMenubarState] = useState(false);
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
                                menubarState && "lg:hidden",
                                (menubarState || isHomePage) && "flex-1",
                                "relative flex lg:flex-[0_0_450px] lg:border-r lg:border-r-neutral-300 lg:dark:border-r-neutral-800"
                            )}
                        >
                            <div className="absolute flex-1 inset-0 flex flex-col overflow-y-auto">{Menubar}</div>
                        </div>
                        <div
                            className={clsx(menubarState || isHomePage ? "hidden lg:flex" : "flex", "relative flex-1")}
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
