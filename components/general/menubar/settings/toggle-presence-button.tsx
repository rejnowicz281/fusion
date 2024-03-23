"use client";

import usePresenceContext from "@/providers/presence-provider";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash";
import SettingsButton from "./settings-button";

const TogglePresenceButton = () => {
    const { togglePresence, presenceEnabled } = usePresenceContext();

    return (
        <SettingsButton onClick={togglePresence}>
            {presenceEnabled ? (
                <>
                    <FaEyeSlash />
                    Disable
                </>
            ) : (
                <>
                    <FaEye />
                    Enable
                </>
            )}{" "}
            Presence
        </SettingsButton>
    );
};

export default TogglePresenceButton;
