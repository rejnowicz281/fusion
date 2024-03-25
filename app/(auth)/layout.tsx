import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import { FC, ReactNode } from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className={clsx("flex-1 flex flex-col", GeistSans.className)}>{children}</div>;
};

export default AuthLayout;
