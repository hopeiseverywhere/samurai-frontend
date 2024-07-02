// components/NavBarSearchBar.jsx
"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function NavBarSearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const formattedQuery = capitalizeWords(searchQuery.trim());
            const locale = pathname.split("/")[1] || "en";
            const url = `/${locale}/search?nickName=${encodeURIComponent(
                formattedQuery
            )}`;
            router.push(url);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <form className="flex items-center gap-2" onSubmit={handleSearch}>
            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type="submit" className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </label>
        </form>
    );
}
