"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ children, href, className, activeClassName, prefetch = true }) {
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
}
