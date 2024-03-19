import { ThemeProvider } from "@/providers/theme-provider";
import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import { Metadata, Viewport } from "next";
import NextTopLoader from "nextjs-toploader";
import { FC, ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
    manifest: "/manifest.json",
    title: "Fusion",
    description: "Fuse mind and AI for better communication.",
};

export const viewport: Viewport = {
    themeColor: "#FFFFFF",
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <html className="h-full" lang="en">
            <body className={clsx("min-h-full dark:bg-[rgb(24,24,24)] flex flex-col", GeistSans.className)}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <NextTopLoader height={4} showSpinner={false} />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
