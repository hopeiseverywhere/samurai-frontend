import React from "react";
import SearchBar from "../../components/SearchBarHome";
import SearchResultCard from "../../components/SearchResultCard";

async function getSearchResults(nickName) {
    if (!nickName) return [];

    const res = await fetch(
        `http://localhost:8080/api/v1/samurai/search?nickName=${encodeURIComponent(
            nickName
        )}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function SearchResults({ searchParams }) {
    const nickName = searchParams.nickName;
    const results = nickName ? await getSearchResults(nickName) : [];

    return (
        <div className="container">
            <div className="searchBarContainer">
            </div>
            <h1>Search Results for "{nickName}"</h1>
            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul className="searchResults">
                    {results.map((result) => (
                        <SearchResultCard
                            key={result.identifier}
                            result={result}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
