"use client";

import React from "react";
import SearchResultCard from "./SearchResultCard";

const SearchResults = ({ results, translations, locale, nickName }) => {
    return (
        <div className="container">
            <h1>
                {translations.SearchResults.title} "{nickName}"
            </h1>
            {results.length === 0 ? (
                <p>{translations.SearchResults.noResults}</p>
            ) : (
                <ul className="searchResults">
                    {results.map((result) => (
                        <SearchResultCard
                            key={result.identifier}
                            result={result}
                            locale={locale}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;
