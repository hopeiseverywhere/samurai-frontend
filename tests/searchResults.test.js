import React from "react";
import { render, screen } from "@testing-library/react";
import SearchResults from "@app/[locale]/search/page"; // Adjust the path according to your actual file structure

// Mocking the SearchBar component
jest.mock("@components/SearchBar", () => {
    return function DummySearchBar() {
        return <div data-testid="search-bar">SearchBar</div>;
    };
});

// Mocking the search results page
jest.mock("@app/search/page", () => ({
    __esModule: true,
    default: ({ searchParams }) => {
        const nickName = searchParams.nickName;
        const results = nickName
            ? [
                  {
                      identifier: "1",
                      givenName: { en: "Test", jp: "テスト" },
                      familyName: { en: "Samurai", jp: "侍" },
                      nickName: { en: "Test Samurai", jp: "テスト侍" },
                  },
              ]
            : [];

        return (
            <div>
                <div data-testid="search-bar">SearchBar</div>
                <h1>Search Results for "{nickName}"</h1>
                {results.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    <ul>
                        {results.map((result) => (
                            <li key={result.identifier}>
                                {result.givenName?.en} {result.familyName?.en} (
                                {result.nickName?.en})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    },
}));

describe("SearchResults", () => {
    it("should render search results", async () => {
        const searchParams = { nickName: "Test" };
        render(<SearchResults searchParams={searchParams} />);

        expect(screen.getByTestId("search-bar")).toBeInTheDocument();
        expect(
            screen.getByText('Search Results for "Test"')
        ).toBeInTheDocument();
        expect(
            screen.getByText("Test Samurai (Test Samurai)")
        ).toBeInTheDocument();
    });

    it("should show no results message", async () => {
        const searchParams = { nickName: "" };
        render(<SearchResults searchParams={searchParams} />);

        expect(screen.getByTestId("search-bar")).toBeInTheDocument();
        expect(screen.getByText('Search Results for ""')).toBeInTheDocument();
        expect(screen.getByText("No results found.")).toBeInTheDocument();
    });
});
