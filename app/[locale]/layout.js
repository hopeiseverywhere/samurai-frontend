// RootLayout.js or RootLayout.jsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ClientLayout from "./client-layout";

export const metadata = {
    title: "Next.js",
    description: "Generated by Next.js",
};

export default async function RootLayout({ children, params }) {
    // Receive messages provided in `i18n.ts`
    const { locale } = params;
    const messages = await getMessages(locale);

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <ClientLayout locale={locale}>{children}</ClientLayout>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}