import { WishListButton } from "../../WishListButton/WishListButton";
import Badge from "../../Badge/Badge";
import "./FilmHeader.style.scss";
import type { Film } from "../../../types/film.type";
import type { FilmCategoryKeys } from "../../../../constants";

const FilmHeader = ({ film }: { film: Film }) => {
  const category = new URLSearchParams(window.location.search).get("category");

  const getGenres = () => {
    return film.genres.map((genre, index) => (
      <span key={genre.id} className="film-genre">
        {genre.name}
        {index < film.genres.length - 1 ? ", " : " "}
      </span>
    ));
  };

  const isMovieCategory = (value: string): value is FilmCategoryKeys => {
    return value === "popular" || value === "top_rated" || value === "upcoming";
  };

  return (
    <div className="film-header">
      <div className="film-title">
        {film.title}
        {film.release_date && ` (${film.release_date.split("-")[0]})`}
        <div className="film-subtitle">
          {getGenres()}
          <span className="film-runtime">
            | Runtime: {film.runtime} minutes
          </span>
        </div>
      </div>

      <div className="action-panel">
        {category && isMovieCategory(category) && <Badge type={category} />}
        <WishListButton
          film={film}
          category={
            category && isMovieCategory(category) ? category : undefined
          }
        />
      </div>
    </div>
  );
};

export default FilmHeader;
