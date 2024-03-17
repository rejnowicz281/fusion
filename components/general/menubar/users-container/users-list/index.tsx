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
        // if both users have a most_recent_message, sort by the created_at date
        if (a.most_recent_message && b.most_recent_message) {
            const aDate = new Date(a.most_recent_message.created_at);
            const bDate = new Date(b.most_recent_message.created_at);
            return bDate.getTime() - aDate.getTime(); // sort in descending order
        }

        // if only one user has a most_recent_message, put that user first
        if (a.most_recent_message) return -1;
        if (b.most_recent_message) return 1;

        if (a.bookmark_id && !b.bookmark_id) return -1; // if a is bookmarked and b is not, put a first
        if (!a.bookmark_id && b.bookmark_id) return 1; // if b is bookmarked and a is not, put b first
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
            <div className="relative flex-1">
                <div className="absolute overflow-y-auto inset-0">
                    {users.map((user) => (
                        <UserLink user={user} key={user.id} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Users;
