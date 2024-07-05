"use client";

import { usePathname } from "next/navigation";
import HomeNavBar from "@components/NavBarHome";
import MainNavBar from "@components/NavBarMain";

export default function ClientLayout({ children, locale, messages }) {
    const pathname = usePathname();

    const isHomePage = pathname === `/${locale}` && pathname.length === 3;

    return (
        <>
            {isHomePage ? (
                <HomeNavBar locale={locale} />
            ) : (
                <MainNavBar locale={locale} />
            )}
            <main>{children}</main>
        </>
    );
}
