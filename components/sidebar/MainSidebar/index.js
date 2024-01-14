"use client";

import useAuthContext from "@/providers/AuthProvider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import CurrentUser from "./CurrentUser";
import SettingsLink from "./SettingsLink";
import css from "./index.module.css";

export default function MainSidebar({ UsersContainer }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { user } = useAuthContext();

    useEffect(() => {
        // Close sidebar when navigating to a new page
        setOpen(false);
    }, [pathname]);

    function toggleSidebar() {
        setOpen(!open);
    }

    return (
        <>
            <button onClick={toggleSidebar} className={css.toggle} type="button">
                <HiMiniBars3BottomLeft />
            </button>
            <div className={`${css.wrapper}${open ? ` ${css.open}` : ""}`}>
                <aside className={css.container}>
                    <CurrentUser user={user} />

                    <div className={css["settings-wrapper"]}>
                        <SettingsLink />
                    </div>

                    {UsersContainer}
                </aside>
            </div>
        </>
    );
}
