import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import css from "./index.module.css";

export default function ToggableSearch({ setSearchQuery, searchQuery, usersCount }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className={css.container} onClick={() => setIsSearchOpen(true)}>
            {isSearchOpen ? (
                <input
                    autoFocus
                    className={css.input}
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
                <div className={css.contacts}>
                    Contacts <span className={css["users-count"]}>({usersCount})</span>
                </div>
            )}

            <FiSearch className={css["search-icon"]} />
        </div>
    );
}
