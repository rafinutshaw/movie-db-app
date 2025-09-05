import React from "react";
import { useFilmDetail } from "../../hooks/useFilmDetail";
import "./FilmDetail.scss";
import { FilmSchema } from "../../schemas/film.schema";
import CastList from "../../components/CastList/CastList";
import FilmInfo from "../../components/FilmInfo/FilmInfo";
import PageContainer from "../../components/PageContainer";

const FilmDetail: React.FC = () => {
  const { film, loading, error, category } = useFilmDetail(FilmSchema);
  const pageTitle = loading
    ? "Loading... - TMDB"
    : film?.title
    ? `${film.title} - TMDB`
    : "TMDB";
  const pageDesc = film?.overview || "Film details and cast.";

  return (
    <PageContainer title={pageTitle} description={pageDesc}>
      <div className={`film-detail ${category ?? ""}`}>
        {error && <div className="error-message">{error}</div>}
        <FilmInfo film={film} loading={loading} category={category} />
        <CastList />
      </div>
    </PageContainer>
  );
};

export default FilmDetail;
