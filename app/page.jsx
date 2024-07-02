import React from "react";
import "@styles/globals.css";
import HomeSearchBar from "@components/SearchBarHome";


const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Samurai
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">Database</span>
            </h1>
            <br className="max-md:hidden" />
            <HomeSearchBar />
        </section>
    );
};

export default Home;
