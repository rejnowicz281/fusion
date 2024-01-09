"use client";

import UserBox from "@/components/general/UserBox";
import usePresenceContext from "@/providers/PresenceProvider";
import cssNavbar from "../../index.module.css";
import cssNavbarUsers from "./index.module.css";

export default function NavbarUsersMain({ users }) {
    const { loggedUsers, presenceEnabled, togglePresence } = usePresenceContext();

    const onlineUsers = users.filter((user) => loggedUsers.includes(user.id));
    const offlineUsers = users.filter((user) => !loggedUsers.includes(user.id));

    return (
        <>
            <div className={cssNavbar["main-buttons"]}>
                <button className={cssNavbar["main-button"]} onClick={togglePresence}>
                    {presenceEnabled ? "Disable Presence" : "Enable Presence"}
                </button>
            </div>
            <div className={cssNavbar["list-wrapper"]}>
                <div className={cssNavbar.list}>
                    {onlineUsers.length > 0 && (
                        <>
                            <h5>Online Users ({onlineUsers.length})</h5>
                            {onlineUsers.map((user) => (
                                <div className={cssNavbarUsers["user-wrapper"]} key={user.id}>
                                    <UserBox user={user} href={`/users/${user.id}/chat`} />
                                </div>
                            ))}
                        </>
                    )}
                    {offlineUsers.length > 0 && (
                        <>
                            <h5>Offline Users</h5>
                            {offlineUsers.map((user) => (
                                <div className={cssNavbarUsers["user-wrapper"]} key={user.id}>
                                    <UserBox user={user} href={`/users/${user.id}/chat`} />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
