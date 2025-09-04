import "./CarouselSkeleton.style.scss";

export const CarouselSkeleton: React.FC<{ count?: number }> = () => (
  <section className="carousel-skeleton">
    <h2 className="skeleton skeleton-title" />
    <div className="skeleton skeleton-carousel" />
  </section>
);
