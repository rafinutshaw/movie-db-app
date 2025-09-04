import React from "react";
import { useFilmDetail } from "../../hooks/useFilmDetail";
import "./FilmDetail.scss";
import { FilmSchema } from "../../schemas/film.schema";
import FilmPoster from "../../components/FilmPoster";
import CastList from "../../components/CastList/CastList";
import FilmHeader from "../../components/FilmHeader/FilmHeader";
import FilmBody from "../../components/FilmBody/FilmBody";

const FilmDetail: React.FC<{}> = () => {
  const { film, loading, error, category } = useFilmDetail(FilmSchema);

  if (loading && !film) return null;
  if (error) return <div className="error-message">{error}</div>;
  if (!film) return <div className="error-message">Film not found.</div>;

  return (
    <main className={`film-detail ${category ?? ""}`}>
      <div className="container">
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
        <CastList />
      </div>
    </main>
  );
};

export default FilmDetail;
