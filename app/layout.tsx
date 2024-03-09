import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { FC, ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "Fusion",
    description: "Fuse mind and AI for better communication.",
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <html className="h-full" lang="en">
            <body className="min-h-full flex flex-col">
                <NextTopLoader height={4} showSpinner={false} />
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
