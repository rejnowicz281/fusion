"use client";

import usePresenceContext from "@/providers/PresenceProvider";

export default function TogglePresenceButton() {
    const { togglePresence, presenceEnabled } = usePresenceContext();

    return <button onClick={togglePresence}>{presenceEnabled ? "Disable" : "Enable"} Presence</button>;
}
