import { render, screen } from "@testing-library/react";
import FilmDetail from "../pages/FilmDetail/FilmDetail";
import { vi } from "vitest";

vi.mock("../hooks/useFilmDetail", () => ({
  useFilmDetail: () => ({
    film: { id: 1, title: "Test Movie", poster_path: null },
    loading: false,
    error: null,
    category: "popular",
  }),
}));

describe("FilmDetail page", () => {
  it("renders film title and info", () => {
    render(<FilmDetail />);
    expect(screen.getByText(/test movie/i)).toBeInTheDocument();
  });

  it("shows error message if error exists", () => {
    vi.mocked(require("../hooks/useFilmDetail").useFilmDetail).mockReturnValue({
      film: null,
      loading: false,
      error: "Not found",
      category: null,
    });
    render(<FilmDetail />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
