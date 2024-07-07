async function fetchOffspringData(identifier) {
    if (!identifier) return null;
    const res = await fetch(
        `http://localhost:8080/api/v1/samurai/offspring/${identifier}`
    );
    if (!res.ok) {
        throw new Error("Failed to fetch offspring data");
    }
    return await res.json();
}

export default fetchOffspringData;
