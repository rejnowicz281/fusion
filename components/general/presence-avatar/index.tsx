"use client";

import usePresenceContext from "@/providers/presence-provider";
import Image from "next/image";
import { FC } from "react";
import css from "./index.module.css";

type PresenceAvatarProps = {
    userId: string;
    className?: string;
    src: string;
    alt?: string;
    width: number;
    height: number;
    markerSize?: number;
};

const PresenceAvatar: FC<PresenceAvatarProps> = ({ userId, className, src, alt, width, height, markerSize = 15 }) => {
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
            <Image width={width} height={height} className={className} src={src} alt={alt || `User ${userId}`} />
        </div>
    );
};

export default PresenceAvatar;
