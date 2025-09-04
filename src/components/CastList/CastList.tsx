import { CastListSchema } from "../../schemas/film.schema";
import { useFilmCast } from "../../hooks/useFilmCast";
import "./CastList.style.scss";
import CastItem from "./CastItem";
import CastListSkeleton from "./CastList.skeleton";
import type { Cast } from "../../types/film.type";

const CastList = () => {
  const { castList, loading } = useFilmCast(CastListSchema);

  if (!castList && !loading) return "error";

  return (
    <div className="cast-container">
      <h2 className="cast-header">Top Cast ({castList && castList.length})</h2>
      <div className="cast-list">
        {castList &&
          castList.length > 0 &&
          castList
            .slice(0, 10)
            .map((actor: Cast) => <CastItem actor={actor} key={actor.id} />)}
        {!castList && loading && <CastListSkeleton />}
      </div>
    </div>
  );
};

export default CastList;
