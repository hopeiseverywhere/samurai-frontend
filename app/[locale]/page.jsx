import React from "react";
import "@styles/globals.css";
import HomeSearchBar from "@components/SearchBarHome";
import { useTranslations } from "next-intl";

const Home = () => {
    const tHome = useTranslations("Home");
    const tSearchBar = useTranslations("HomeSearchBar");
    return (
        <>
            <section className="w-full flex-center flex-col">
                <h1 className="head_text text-center">
                    {tHome("title")}
                    <br className="max-md:hidden" />
                    <span className="orange_gradient text-center">
                        {tHome("db")}
                    </span>
                </h1>
                <br className="max-md:hidden" />
                <HomeSearchBar
                    placeholder={tSearchBar("placeholder")}
                    button={tSearchBar("button")}
                />
            </section>
        </>
    );
};

export default Home;
