import type { Film } from "../../../types/film.type";
import Rating from "../../Rating/Rating";
import "./FilmBody.style.scss";
const FilmBody = ({ film }: { film: Film }) => {
  return (
    <>
      <Rating score={film.vote_average * 10} />

      <p className="film-tagline">{film.tagline}</p>
      <div className="film-overview">
        <p className="film-overview-title">Overview</p>
        <p className="film-overview-content">{film.overview}</p>
      </div>
    </>
  );
};

export default FilmBody;
