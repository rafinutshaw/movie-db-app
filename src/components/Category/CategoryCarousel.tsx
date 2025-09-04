import { useFilmsByCategory } from "../../hooks/useFilmsByCategory";
import { FilmListSchema } from "../../schemas/film.schema";

import { FILM_CATEGORIES, type FilmCategoryKeys } from "../../../constants";
import { SwiperSlide } from "swiper/react";

import FilmBox from "../FilmBox/FilmBox";
import SwiperNavigation from "./SwiperNavigation";
import "./CategoryCarousel.style.scss";
import { CarouselSkeleton } from "./CarouselSkeleton";
import type { Film } from "../../types/film.type";
export const defaultCategoryData: Film[] = [];

const CategoryCarousel: React.FC<{
  category: FilmCategoryKeys;
}> = ({ category }) => {
  const { films, loading, error } = useFilmsByCategory(
    category,
    FilmListSchema
  );

  return (
    <section className="carousel">
      {loading && <CarouselSkeleton />}
      {!loading && !error && (
        <>
          <h2 className="carousel-title">{FILM_CATEGORIES[category]}</h2>
          <SwiperNavigation className="carousel-items">
            {films?.map((film) => (
              <SwiperSlide key={film.id} style={{ width: "232px" }}>
                <FilmBox film={film} category={category} />
              </SwiperSlide>
            ))}
          </SwiperNavigation>
        </>
      )}
    </section>
  );
};

export default CategoryCarousel;
