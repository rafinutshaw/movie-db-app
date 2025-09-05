import CategoryCarousel from "../components/Category/CategoryCarousel";
import PageContainer from "../components/PageContainer";

const Home: React.FC = () => {
  return (
    <PageContainer
      title="Top movies - TMDB"
      description="Movie database website"
    >
      <CategoryCarousel category="popular" />
      <CategoryCarousel category="top_rated" />
      <CategoryCarousel category="upcoming" />
    </PageContainer>
  );
};

export default Home;
