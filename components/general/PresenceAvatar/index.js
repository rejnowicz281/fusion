"use client";

import usePresenceContext from "@/providers/PresenceProvider";
import Image from "next/image";
import css from "./index.module.css";

export default function PresenceAvatar({ userId, className, src, alt, width, height, markerSize = 15 }) {
    const { loggedUsers } = usePresenceContext();

    const isLogged = loggedUsers.includes(userId);

    return (
        <div className={css.container}>
            {isLogged && (
                <div
                    style={{
                        width: markerSize,
                        height: markerSize,
                    }}
                    className={css.marker}
                />
            )}
            <Image width={width} height={height} className={className} src={src} alt={alt} />
        </div>
    );
}
