"use client";

import usePresenceContext from "@/providers/presence-provider";
import { User } from "@/types/user";
import { FC, useMemo, useState } from "react";
import ToggableSearch from "./toggable-search";
import UserLink from "./user-link";

const Users: FC<{ users: User[] }> = ({ users }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { loggedUsers, isLoggedIn } = usePresenceContext();

    const filteredAndSortedUsers = useMemo(() => {
        return users
            .filter((user) => {
                const displayName = user.display_name.toLowerCase();
                const query = searchQuery.toLowerCase();
                return displayName.includes(query); // filter by display name
            })
            .sort((a, b) => {
                if (isLoggedIn(a.id) && !isLoggedIn(b.id) && !a.most_recent_message) return -1; // if a is logged in and b is not, put a first
                if (!isLoggedIn(a.id) && isLoggedIn(b.id) && !b.most_recent_message) return 1; // if b is logged in and a is not, put b first

                return 0;
            });
    }, [searchQuery, loggedUsers]);

    return (
        <>
            <ToggableSearch setSearchQuery={setSearchQuery} searchQuery={searchQuery} usersCount={users.length} />
            <div className="relative flex-1">
                <div className="absolute overflow-y-auto inset-0">
                    {filteredAndSortedUsers.map((user) => (
                        <UserLink user={user} key={user.id} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Users;
