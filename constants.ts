export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const FILM_CATEGORIES = {
  popular: "Popular",
  top_rated: "Top Rated",
  upcoming: "Upcoming",
};
export type FilmCategoryKeys = keyof typeof FILM_CATEGORIES;

export const FILM_POSTER_SIZES = {
  small: "w200",
  medium: "w300",
  large: "w400",
};
export type FilmPosterSizeType = "small" | "medium" | "large";

export const NO_IMAGE_POSTER = "/no-image.png";
export const BASE_URL = "https://api.themoviedb.org/3";
