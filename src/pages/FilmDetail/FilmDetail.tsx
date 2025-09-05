import React from "react";
import { useFilmDetail } from "../../hooks/useFilmDetail";
import "./FilmDetail.scss";
import { FilmSchema } from "../../schemas/film.schema";
import CastList from "../../components/CastList/CastList";
import FilmInfo from "../../components/FilmInfo/FilmInfo";

const FilmDetail: React.FC<{}> = () => {
  const { film, loading, error, category } = useFilmDetail(FilmSchema);

  if (!film && !loading)
    return <div className="error-message">Film not found.</div>;

  return (
    <main className={`film-detail ${category ?? ""}`}>
      <div className="container">
        {error && <div className="error-message">{error}</div>}

        <FilmInfo film={film} loading={loading} category={category} />

        <CastList />
      </div>
    </main>
  );
};

export default FilmDetail;
