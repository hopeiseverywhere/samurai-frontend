"use client";

import React from "react";
import { usePathname } from "next/navigation";
import HomeNavBar from "@components/NavBarHome";
import MainNavBar from "@components/NavBarMain";
import "@styles/globals.css";


export default function RootLayout({ children }) {
    const pathname = usePathname();
    const handleLanguageChange = (language) => {
        console.log("Selected language:", language);
        // Add logic to handle language change
    };

    return (
        <html lang="en">
            <body>
                {pathname === "/" ? (
                    <HomeNavBar onLanguageChange={handleLanguageChange} />
                ) : (
                    <MainNavBar onLanguageChange={handleLanguageChange} />
                )}
                {children}
            </body>
        </html>
    );
}
