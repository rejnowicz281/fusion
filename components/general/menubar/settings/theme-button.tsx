"use client";

import { BsMoonStars } from "@react-icons/all-files/bs/BsMoonStars";
import { BsSun } from "@react-icons/all-files/bs/BsSun";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SettingsButton from "./settings-button";

const ThemeButton = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <SettingsButton
            onClick={() => {
                if (theme === "light") setTheme("dark");
                else setTheme("light");
            }}
        >
            {theme === "light" ? (
                <>
                    <BsSun />
                    Light Mode
                </>
            ) : (
                <>
                    <BsMoonStars />
                    Dark Mode
                </>
            )}
        </SettingsButton>
    );
};

export default ThemeButton;
