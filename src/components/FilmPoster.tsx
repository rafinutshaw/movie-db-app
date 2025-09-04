import React from "react";
import {
  FILM_POSTER_SIZES,
  NO_IMAGE_POSTER,
  TMDB_IMAGE_BASE_URL,
  type FilmPosterSizeType,
} from "../../constants";

interface FilmPosterProps {
  imageUrl: string;
  title: string;
  className?: string;
  size?: FilmPosterSizeType;
}

const PosterImage: React.FC<FilmPosterProps> = ({
  imageUrl,
  title,
  className,
  size = "small",
}) => (
  <img
    src={
      imageUrl && imageUrl !== ""
        ? `${TMDB_IMAGE_BASE_URL}${FILM_POSTER_SIZES[size]}${imageUrl}`
        : NO_IMAGE_POSTER
    }
    alt={title}
    className={className || "film-poster"}
    onError={(e) => {
      (e.target as HTMLImageElement).src = NO_IMAGE_POSTER;
    }}
  />
);

export default PosterImage;
