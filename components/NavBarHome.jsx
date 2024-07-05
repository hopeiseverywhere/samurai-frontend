// components/HomeNavBar.jsx
"use client";

import React from "react";
import Link from "next/link";
import ThemeController from "./ThemeController";
import DropdownLogin from "./DropdownLogin";
import LanguageSelector from "./LanguageSelector";
import { usePathname } from "next/navigation";

const HomeNavBar = ({ locale, messages }) => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">
                    Samurai Database
                </Link>
                <Link href={`/${locale}/flow`} className="btn btn-ghost">
                    About
                </Link>
            </div>

            <div className="navbar-right flex items-center space-x-2">
                <DropdownLogin />
                <LanguageSelector />
                <ThemeController />
            </div>
        </div>
    );
};

export default HomeNavBar;
