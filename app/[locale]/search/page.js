"use client";

import React from "react";
import { getTranslations } from "../../../util/localeLoader";
import SearchResults from "@components/SearchResults";

async function getSearchResults(nickName, locale) {
    if (!nickName) return [];
    const res = await fetch(
        `http://localhost:8080/api/v1/samurai/search?nickName=${encodeURIComponent(
            nickName
        )}`,
        { cache: "default" }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function SearchResultsPage({ searchParams, params }) {
    const { locale } = params;
    const translations = await getTranslations(locale);
    const nickName = searchParams.nickName;
    const results = nickName ? await getSearchResults(nickName, locale) : [];

    return (
        <SearchResults
            results={results}
            translations={translations}
            locale={locale}
            nickName={nickName}
        />
    );
}
