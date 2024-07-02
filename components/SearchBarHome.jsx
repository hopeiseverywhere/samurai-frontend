"use client"

import React from "react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function HomeSearchBar({placeholder, button}) {
    
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
            const locale = pathname.split("/")[1] || "en"; // Extract the locale from the pathname
            router.push(
                `/${locale}/search?nickName=${encodeURIComponent(
                    formattedQuery
                )}`
            );
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder={placeholder}
                className="input input-bordered w-full max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary">{button}</button>
        </form>
    );
}
