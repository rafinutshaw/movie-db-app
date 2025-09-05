// Imports
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as filmUsecase from "../usecases/filmUsecase";

// To Test
import App from "../App";
import Home from "../pages/Home";
import type { FilmList } from "../types/film.type";
import { useFilmsByCategory } from "../hooks/useFilmsByCategory";
import { BrowserRouter } from "react-router-dom";

vi.mock("../hooks/useFilmsByCategory", () => ({
  useFilmsByCategory: vi.fn(),
}));

vi.spyOn(filmUsecase, "fetchFilmsByCategory").mockResolvedValue({
  films: [{ id: 1, title: "Popular Movie", poster_path: null }],
  error: null,
});

describe("CategoryCarousel skeleton and data", () => {
  it("shows skeleton while loading", async () => {
    (useFilmsByCategory as unknown as jest.Mock).mockReturnValue({
      films: null,
      loading: true,
      error: null,
    });

    render(<Home />);
    expect(document.getElementsByClassName("carousel-skeleton").length).toBe(3);
  });
  it("displays search results when the data is available", async () => {
    (useFilmsByCategory as unknown as jest.Mock).mockReturnValue({
      films: [
        { id: 1, title: "result1", poster_path: null },
        { id: 2, title: "result2", poster_path: null },
      ] as FilmList,
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(await screen.findAllByText("result1")).toBeTruthy();
    expect(await screen.findAllByText("result2")).toBeTruthy();
  });
});
