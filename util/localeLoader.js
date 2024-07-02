export async function getTranslations(locale) {
    try {
        const translations = await import(`../languages/${locale}.json`);
        return translations.default;
    } catch (error) {
        // Fallback to 'en' if the specified locale file doesn't exist
        const translations = await import("../languages/en.json");
        return translations.default;
    }
}
