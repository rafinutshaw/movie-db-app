import CategoryCarousel from "../components/Category/CategoryCarousel";

const Home: React.FC<{}> = ({}) => {
  return (
    <main className="homepage">
      <div className="container">
        <CategoryCarousel category="popular" />

        <CategoryCarousel category="top_rated" />

        <CategoryCarousel category="upcoming" />
      </div>
    </main>
  );
};

export default Home;
