// components/SearchResultCard.jsx
"use client";
import React from "react";

const SearchResultCard = ({ result, locale, translations }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Samurai"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{result.nickName?.[locale]}</h2>
                <p>
                    {result.givenName?.[locale]} {result.familyName?.[locale]}
                </p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">
                        {translations.samurai}
                    </div>
                    <div className="badge badge-outline">
                        {translations.figure}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;
