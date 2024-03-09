"use client";

import usePresenceContext from "@/providers/presence-provider";

const TogglePresenceButton = () => {
    const { togglePresence, presenceEnabled } = usePresenceContext();

    return <button onClick={togglePresence}>{presenceEnabled ? "Disable" : "Enable"} Presence</button>;
};

export default TogglePresenceButton;
