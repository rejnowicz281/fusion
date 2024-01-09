"use client";

import UserBox from "@/components/general/UserBox";
import useAuthContext from "@/providers/AuthProvider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import NavbarLogout from "../navbars/NavbarLogout";
import css from "./index.module.css";

export default function MainSidebar({ NavbarUsers }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { user } = useAuthContext();
    const [currentNavbar, setCurrentNavbar] = useState("users");

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
                        <UserBox user={user} />
                    </div>
                    <div className={css.buttons}>
                        <button
                            id={currentNavbar == "users" ? css["active-button"] : undefined}
                            onClick={() => setCurrentNavbar("users")}
                            type="button"
                        >
                            Users
                        </button>
                        <button
                            id={currentNavbar == "logout" ? css["active-button"] : undefined}
                            onClick={() => setCurrentNavbar("logout")}
                            type="button"
                        >
                            Logout
                        </button>
                    </div>
                    {currentNavbar === "users" ? NavbarUsers : <NavbarLogout />}
                </aside>
            </div>
        </>
    );
}
