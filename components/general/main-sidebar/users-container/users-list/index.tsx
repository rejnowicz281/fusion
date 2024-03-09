"use client";

import usePresenceContext from "@/providers/presence-provider";
import { User } from "@/types/user";
import { FC, useState } from "react";
import ToggableSearch from "./toggable-search";
import UserLink from "./user-link";

const Users: FC<{ users: User[] }> = ({ users }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { loggedUsers } = usePresenceContext();

    users.sort((a, b) => {
        if (a.id === b.id) return 0; // if the users are the same, don't sort them
        if (a.bookmark && !b.bookmark) return -1; // if a is bookmarked and b is not, put a first
        if (!a.bookmark && b.bookmark) return 1; // if b is bookmarked and a is not, put b first
        if (loggedUsers.includes(a.id) && !loggedUsers.includes(b.id)) return -1; // if a is logged in and b is not, put a first
        if (!loggedUsers.includes(a.id) && loggedUsers.includes(b.id)) return 1; // if b is logged in and a is not, put b first
        return a.display_name.localeCompare(b.display_name); // sort by display name
    });

    users = users.filter((user) => {
        const displayName = user.display_name.toLowerCase();
        const query = searchQuery.toLowerCase();

        return displayName.includes(query); // filter by display name
    });

    return (
        <>
            <ToggableSearch setSearchQuery={setSearchQuery} searchQuery={searchQuery} usersCount={users.length} />
            {users.map((user) => (
                <UserLink user={user} key={user.id} />
            ))}
        </>
    );
};

export default Users;
