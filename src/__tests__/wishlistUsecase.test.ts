import { describe, it, expect, vi } from "vitest";
import * as filmService from "../services/filmService";
import { WishListFilmSchema } from "../schemas/wishlist.schema";
import * as wishlistUsecase from "../usecases/wishlistUsecase";

describe("addFilmToWishList", () => {
  const validFilm = { id: 1, title: "Test", poster_path: null };
  const schema = WishListFilmSchema;
  const onError = vi.fn();

  it("returns true on success", async () => {
    vi.spyOn(filmService, "addToWatchlist").mockResolvedValue({
      status_code: 0,
      status_message: "",
    });
    const result = await wishlistUsecase.addFilmToWishList(
      validFilm,
      schema,
      onError,
      "acc",
      "sess"
    );
    expect(result).toBe(true);
    expect(onError).not.toHaveBeenCalled();
  });

  it("returns false and calls onError on validation error", async () => {
    const invalidFilm = { id: "bad" };
    const result = await wishlistUsecase.addFilmToWishList(
      invalidFilm as any,
      schema,
      onError,
      "acc",
      "sess"
    );
    expect(result).toBe(false);
    expect(onError).toHaveBeenCalled();
  });

  it("returns false and calls onError on API error", async () => {
    vi.spyOn(filmService, "addToWatchlist").mockRejectedValue(
      new Error("fail")
    );
    const result = await wishlistUsecase.addFilmToWishList(
      validFilm,
      schema,
      onError,
      "acc",
      "sess"
    );
    expect(result).toBe(false);
    expect(onError).toHaveBeenCalled();
  });
});
