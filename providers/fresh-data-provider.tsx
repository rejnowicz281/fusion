"use client";

import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

const FreshDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, []);

    return <>{children}</>;
};

export default FreshDataProvider;
