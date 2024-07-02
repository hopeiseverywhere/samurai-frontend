"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBarSearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const formattedQuery = capitalizeWords(searchQuery.trim());
            router.push(`/search?nickName=${encodeURIComponent(formattedQuery)}`);
        }
    };

    return (
        <form className="flex items-center gap-2" onSubmit={handleSearch}>
            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </label>
        </form>
    );
}
