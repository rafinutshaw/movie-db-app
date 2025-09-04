import type { Cast } from "../../types/film.type";
import PosterImage from "../FilmPoster";
import "./CastList.style.scss";

const CastItem = ({ actor }: { actor: Cast }) => {
  return (
    <div key={actor.id} className="actor">
      <PosterImage
        imageUrl={actor.profile_path ?? ""}
        title={actor.name}
        size="small"
        className="actor-image"
      />

      <div>
        <p className="actor-name">{actor.name}</p>
        <p className="actor-character">{actor.character}</p>
      </div>
    </div>
  );
};

export default CastItem;
