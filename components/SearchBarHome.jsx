"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const formattedQuery = capitalizeWords(searchQuery.trim());
            router.push(
                `/search?nickName=${encodeURIComponent(formattedQuery)}`
            );
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search Nick Name..."
                className="input input-bordered w-full max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary">Primary</button>
        </form>
    );

    
}
