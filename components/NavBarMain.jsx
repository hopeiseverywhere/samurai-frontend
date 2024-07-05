// components/MainNavBar.jsx
"use client";

import React from "react";
import Link from "next/link";
import NavBarSearchBar from "./SearchBarNav";
import ThemeController from "./ThemeController";
import DropdownLogin from "./DropdownLogin";
import LanguageSelector from "./LanguageSelector";
import { usePathname } from "next/navigation";

const MainNavBar = ({ locale }) => {
    
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">
                    Samurai Database
                </Link>
                <Link href={`/${locale}/about`} className="btn btn-ghost">
                    About
                </Link>
            </div>

            <div className="navbar-right flex items-center space-x-2">
                <NavBarSearchBar />
                <DropdownLogin />
                <LanguageSelector />
                <ThemeController />
            </div>
        </div>
    );
};

export default MainNavBar;
