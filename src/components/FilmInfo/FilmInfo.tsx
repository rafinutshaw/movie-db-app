import FilmBody from "./FilmBody/FilmBody";
import FilmHeader from "./FilmHeader/FilmHeader";
import FilmPoster from "../FilmPoster";
import type { Film } from "../../types/film.type";
import "./FilmInfo.style.scss";
import FilmInfoSkeleton from "./FimlInfo.skeleton";
const FilmInfo = ({
  film,
  loading,
  category,
}: {
  film?: Film | null;
  loading: boolean;
  category?: string | null;
}) => {
  if (loading && !film) return <FilmInfoSkeleton />;

  if (!film) return null;
  return (
    <div className={`film-info ${category ?? ""}`}>
      <FilmPoster
        imageUrl={film.poster_path || ""}
        title={film.title}
        size={"large"}
      />

      <div className="right-panel">
        <FilmHeader film={film} />
        <FilmBody film={film} />
      </div>
    </div>
  );
};

export default FilmInfo;
