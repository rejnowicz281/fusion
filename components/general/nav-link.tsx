"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type NavLinkProps = {
    children: React.ReactNode;
    href: string;
    className?: string;
    activeClassName: string;
    prefetch?: boolean;
};

const NavLink: FC<NavLinkProps> = ({ children, href, className, activeClassName, prefetch = true }) => {
    const pathname = usePathname();

    return (
        <Link
            prefetch={prefetch}
            href={href}
            className={`${className}${pathname == href ? ` ${activeClassName}` : ""}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;
