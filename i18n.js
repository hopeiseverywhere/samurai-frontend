import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";


const locales = ["en", "jp"];
export default getRequestConfig(async ({ locale }) => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    if (!locales.includes(locale)) notFound();

    return {
        messages: (await import(`./languages/${locale}.json`)).default,
    };
});
