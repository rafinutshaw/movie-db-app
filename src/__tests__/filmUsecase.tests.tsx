import { describe, it, expect, vi } from "vitest";
import * as filmService from "../services/filmService";
import { z } from "zod";
import {
  fetchFilmsByCategory,
  fetchFilmDetailUsecase,
  fetchCastUsecase,
} from "../usecases/filmUsecase";

describe("fetchFilmsByCategory", () => {
  const schema = z.array(z.object({ id: z.number(), title: z.string() }));

  it("returns films on success", async () => {
    vi.spyOn(filmService, "getFilms").mockResolvedValue({
      results: [{ id: 1, title: "Test Movie" }],
    });
    const result = await fetchFilmsByCategory("popular", schema);
    expect(result.films).toEqual([{ id: 1, title: "Test Movie" }]);
    expect(result.error).toBeNull();
  });

  it("returns error on failure", async () => {
    vi.spyOn(filmService, "getFilms").mockRejectedValue({
      response: { data: { error: "API Error" } },
    });
    const result = await fetchFilmsByCategory("popular", schema);
    expect(result.films).toBeNull();
    expect(result.error).toBe("API Error");
  });
});

describe("fetchFilmDetailUsecase", () => {
  const schema = z.object({ id: z.number(), title: z.string() });

  it("returns film on success", async () => {
    vi.spyOn(filmService, "getFilmDetail").mockResolvedValue({
      id: 2,
      title: "Detail Movie",
      overview: "",
      poster_path: null,
      release_date: "",
      vote_average: 0,
      genres: [],
      runtime: 0,
      tagline: "",
    });
    const result = await fetchFilmDetailUsecase("2", schema);
    expect(result.film).toEqual({ id: 2, title: "Detail Movie" });
    expect(result.error).toBeNull();
  });

  it("returns error on failure", async () => {
    vi.spyOn(filmService, "getFilmDetail").mockRejectedValue({
      response: { data: { error: "Detail Error" } },
    });
    const result = await fetchFilmDetailUsecase("2", schema);
    expect(result.film).toBeNull();
    expect(result.error).toBe("Detail Error");
  });
});

describe("fetchCastUsecase", () => {
  const schema = z.array(z.object({ id: z.number(), name: z.string() }));

  it("returns cast on success", async () => {
    vi.spyOn(filmService, "getCast").mockResolvedValue({
      cast: [
        {
          id: 3,
          name: "Actor",
          character: "",
          profile_path: null,
        },
      ],
    });
    const result = await fetchCastUsecase("3", schema);
    expect(result.cast).toEqual([{ id: 3, name: "Actor" }]);
    expect(result.error).toBeNull();
  });

  it("returns error on failure", async () => {
    vi.spyOn(filmService, "getCast").mockRejectedValue({
      response: { data: { error: "Cast Error" } },
    });
    const result = await fetchCastUsecase("3", schema);
    expect(result.cast).toBeNull();
    expect(result.error).toBe("Cast Error");
  });
});
