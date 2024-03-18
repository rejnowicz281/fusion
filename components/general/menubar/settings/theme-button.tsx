"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BsMoonStars } from "@react-icons/all-files/bs/BsMoonStars";
import { BsSun } from "@react-icons/all-files/bs/BsSun";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <Tooltip>
            <TooltipContent>{theme === "light" ? "Light" : "Dark"}</TooltipContent>
            <TooltipTrigger asChild>
                <Button
                    className="z-20 absolute top-4 right-4 text-xl"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                        if (theme === "light") setTheme("dark");
                        else setTheme("light");
                    }}
                >
                    {theme === "light" ? <BsSun /> : <BsMoonStars />}
                </Button>
            </TooltipTrigger>
        </Tooltip>
    );
}
