import React from "react";
import FilmPoster from "../FilmPoster";
import "./FilmBox.scss";
import { Link } from "react-router-dom";
import type { FilmCategoryKeys } from "../../../constants";
import type { Film } from "../../types/film.type";

interface FilmBoxProps {
  film: Pick<Film, "id" | "title" | "poster_path">;
  category?: FilmCategoryKeys;
  showRemove?: boolean;
  onRemove?: (id: number) => void;
}

const FilmBox: React.FC<FilmBoxProps> = ({
  film,
  category = "",
  showRemove,
  onRemove,
}) => (
  <div className="film-box-wrapper">
    <Link to={`/film/${film.id}?category=${category}`} className="film-link">
      <div className="film-box">
        <FilmPoster
          className="poster"
          imageUrl={film.poster_path ?? ""}
          title={film.title}
        />
        <div className="film-title">{film.title}</div>
      </div>
    </Link>
    {showRemove && onRemove && (
      <button className="remove-wish" onClick={() => onRemove(film.id)}>
        Remove
      </button>
    )}
  </div>
);

export default FilmBox;
