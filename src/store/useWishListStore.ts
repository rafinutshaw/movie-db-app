import { create } from "zustand";
import { fetchTMDBWishList } from "../usecases/wishlistUsecase";
import {
  addFilmToTMDBWatchList,
  removeFilmFromTMDBWatchList,
} from "../usecases/wishlistUsecase";
import type { WishListFilm } from "../types/wishlist.type";

interface WishListState {
  items: WishListFilm[];
  error: string | null;
  fetch: () => Promise<void>;
  add: (film: WishListFilm) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
  clear: () => void;
}

export const useWishListStore = create<WishListState>((set, get) => ({
  items: [],
  error: null,

  fetch: async () => {
    const { items, error } = await fetchTMDBWishList();
    if (error) {
      set({ error });
      return;
    }
    set({ items });
  },

  add: async (film: WishListFilm) => {
    set({ items: [...get().items, film] });
    const { result } = await addFilmToTMDBWatchList(film.id);
    await get().fetch();
    return result;
  },

  remove: async (id: number) => {
    const film = get().items.find((item) => item.id === id);
    if (!film) return true;
    set({ items: get().items.filter((item) => item.id !== id) });
    const { result } = await removeFilmFromTMDBWatchList(film.id);
    await get().fetch();
    return result;
  },

  clear: () => {
    set({ items: [], error: null });
  },
}));
