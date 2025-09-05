import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishListStore } from "../store/useWishListStore";
import { useAuthStore } from "../store/useAuthStore";
import { MESSAGE } from "../usecases/filmUsecase";
import type { WishListFilm } from "../types/wishlist.type";

export function useWishListButton(film: WishListFilm) {
  const navigate = useNavigate();

  const { items, add, remove, fetch } = useWishListStore();
  const { isLoggedIn } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(isLoggedIn ? true : false);

  const [isWished, setIsWished] = useState<boolean>(
    items.findIndex((item) => item.id === film.id) >= 0
  );
  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    fetch().then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const found = items.findIndex((item) => item.id === film.id) >= 0;
    setIsWished(found);
  }, [film.id, items]);

  const updateWish = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    let success: boolean;
    if (isWished) {
      success = await remove(film.id);
    } else {
      success = await add(film);
    }
    if (!success) {
      console.log(MESSAGE.SOMETHING_WENT_WRONG);
    }
  };

  return {
    loading,
    isWished,
    updateWish,
  };
}
