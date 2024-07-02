// components/SearchResultCard.jsx
import React from "react";

const SearchResultCard = ({ result }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Samurai"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {result.nickName?.en}
                </h2>
                <p>
                    {result.givenName?.en} {result.familyName?.en}
                </p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Samurai</div>
                    <div className="badge badge-outline">Historical Figure</div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;
