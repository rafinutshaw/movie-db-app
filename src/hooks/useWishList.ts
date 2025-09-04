import { useState, useEffect } from "react";
import { WishListFilmSchema } from "../schemas/wishlist.schema";
import { useAuthStore } from "../store/useAuthStore";
import {
  addFilmToTMDBWatchList,
  fetchTMDBWishList,
  removeFilmFromTMDBWatchList,
} from "../usecases/wishlistUsecase";
import type { WishListFilm } from "../types/wishlist.type";

export function useWishList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<WishListFilm[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuthStore();

  const fetch = async () => {
    setError(null);

    if (!isLoggedIn) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetchTMDBWishList();
      setItems(res.items || []);
    } catch (err: any) {
      setError("API error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const add = async (film: WishListFilm) => {
    setError(null);

    if (!isLoggedIn) {
      return false;
    }
    const result = WishListFilmSchema.safeParse(film);
    if (!result.success) {
      setError("Validation error: " + JSON.stringify(result.error));
      return false;
    }
    try {
      await addFilmToTMDBWatchList(film.id);
      await fetch();
      return true;
    } catch (err: any) {
      setError("API error: " + err.message);
      return false;
    }
  };

  const remove = async (id: number) => {
    setError(null);

    if (!isLoggedIn) {
      window.location.href = "/login";
      return false;
    }
    try {
      await removeFilmFromTMDBWatchList(id);
      await fetch();
      return true;
    } catch (err: any) {
      setError("API error: " + err.message);
      return false;
    }
  };

  // Fetch wishlist on mount
  useEffect(() => {
    isLoggedIn && fetch();
  }, []);

  return { items, add, remove, error, fetch, loading };
}
