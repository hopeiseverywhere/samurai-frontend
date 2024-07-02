// components/SearchResultCard.jsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const SearchResultCard = ({ result, locale }) => {
    const tCard = useTranslations("SearchResultCard");
    const router = useRouter();
    const handleDetailsClick = () => {
        router.push(`/${locale}/offspring/${result.identifier}`);
    };
    return (
        <div className="card bg-base-100 image w-96 shadow-xl">
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
                    <button
                        className="btn btn-primary"
                        onClick={handleDetailsClick}
                    >
                        {tCard("details")}
                    </button>
                </div>
                <p>{result.identifier}</p>

                <div className="card-actions justify-end">
                    <div className="badge badge-outline">
                        {tCard("samurai")}
                    </div>
                    <div className="badge badge-outline">{tCard("figure")}</div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;
