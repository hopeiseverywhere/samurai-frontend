"use client";

import { usePathname } from "next/navigation";
import HomeNavBar from "@components/NavBarHome";
import MainNavBar from "@components/NavBarMain";

export default function ClientLayout({ children, locale }) {
    const pathname = usePathname();
    
    
    const isHomePage = pathname === `/${locale}` && pathname.length === 3;

    return (
        <html lang={locale}>
            <body>
                {isHomePage ? <HomeNavBar /> : <MainNavBar />}
                {children}
            </body>
        </html>
    );
}
