import { FILM_CATEGORIES, type FilmCategoryKeys } from "../../../constants";
import "./Badge.style.scss";
const Badge = ({ type }: { type: FilmCategoryKeys }) => {
  return <div className={`badge badge-${type}`}>{FILM_CATEGORIES[type]}</div>;
};

export default Badge;
