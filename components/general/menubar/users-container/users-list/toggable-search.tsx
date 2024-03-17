import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import React, { FC, useState } from "react";

type ToggableSearchProps = {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchQuery: string;
    usersCount: number;
};

const ToggableSearch: FC<ToggableSearchProps> = ({ setSearchQuery, searchQuery, usersCount }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div
            className="cursor-text text-xl flex items-center border-b border-b-neutral-300 dark:border-b-neutral-800"
            onClick={() => setIsSearchOpen(true)}
        >
            {isSearchOpen ? (
                <input
                    autoFocus
                    className="flex-1 p-4 text-lg w-full outline-none border-none bg-inherit"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    onBlur={(e) => {
                        if (e.target.value === "") setIsSearchOpen(false);
                    }}
                />
            ) : (
                <div className="flex-1 p-4">
                    Contacts <span className="text-gray-500">({usersCount})</span>
                </div>
            )}

            <FiSearch className="flex-shrink-0 mr-5" />
        </div>
    );
};

export default ToggableSearch;
