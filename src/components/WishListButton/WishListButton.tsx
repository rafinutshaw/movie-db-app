import React from "react";
import { useWishListButton } from "../../hooks/useWishListButton";
import HeartIcon from "../../icons/heart.icon";
import type { FilmCategoryKeys } from "../../../constants";
import "./WishListButton.style.scss";
import type { WishListFilm } from "../../types/wishlist.type";

export const WishListButton: React.FC<{
  film: WishListFilm;
  category?: FilmCategoryKeys;
}> = ({ film, category }) => {
  const { isWished, updateWish } = useWishListButton(film);
  if (!film.id) return null;

  return (
    <>
      <button
        className={`btn ${category ? `btn-${category}` : ""}`}
        onClick={updateWish}
      >
        <HeartIcon filled={isWished} />
      </button>
    </>
  );
};
