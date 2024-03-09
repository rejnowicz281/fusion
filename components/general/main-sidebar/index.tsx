"use client";

import useAuthContext from "@/providers/auth-provider";
import { HiMiniBars3BottomLeft } from "@react-icons/all-files/hi2/HiMiniBars3BottomLeft";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import CurrentUser from "./current-user";
import css from "./index.module.css";
import SettingsLink from "./settings-link";

const MainSidebar: FC<{ UsersContainer: JSX.Element }> = ({ UsersContainer }) => {
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
};

export default MainSidebar;
