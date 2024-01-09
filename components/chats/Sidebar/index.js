"use client";

import useAuthContext from "@/providers/AuthProvider";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import css from "./index.module.css";

export default function Sidebar({ room }) {
    const { user } = useAuthContext();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    function toggleSidebar() {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <>
            <button onClick={toggleSidebar} className={css.toggle} type="button">
                <AiOutlineInfoCircle />
            </button>
            <div className={`${css.wrapper}${sidebarOpen ? ` ${css.open}` : ""}`}>
                <div className={css.container}>This is where the prompts go.</div>
            </div>
        </>
    );
}
