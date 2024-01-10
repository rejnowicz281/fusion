"use client";

import NavLink from "@/components/general/NavLink";
import useAuthContext from "@/providers/AuthProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
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
                    <div className={css["current-user-wrapper"]}>
                        <Image
                            className={css["current-user-avatar"]}
                            width={150}
                            height={150}
                            alt="Your avatar"
                            src={user.avatar_url}
                        />
                        <div className={css["current-user-name"]}>{user.display_name}</div>
                        {user.email !== user.display_name && (
                            <div className={css["current-user-email"]}>{user.email}</div>
                        )}
                    </div>
                    <div className={css["settings-wrapper"]}>
                        <NavLink
                            activeClassName={css["settings-link-active"]}
                            className={css["settings-link"]}
                            href="/settings"
                        >
                            SETTINGS
                        </NavLink>
                    </div>
                    {UsersContainer}
                </aside>
            </div>
        </>
    );
}
