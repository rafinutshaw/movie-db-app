import CategoryCarousel from "../components/Category/CategoryCarousel";

const Home: React.FC<{}> = ({}) => {
  return (
    <main className="homepage">
      <article>
        <title>Top movies - TMDB</title>
        <meta name="description" content="Movie database website" />
      </article>

      <div className="container">
        <CategoryCarousel category="popular" />

        <CategoryCarousel category="top_rated" />

        <CategoryCarousel category="upcoming" />
      </div>
    </main>
  );
};

export default Home;
