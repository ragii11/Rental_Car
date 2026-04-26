import Hero from "../../components/Hero/Hero";
import FeaturedCars from "../../components/FeaturedCars/FeaturedCars";
import CtaSection from "../../components/CtaSection/CtaSection";

const Home = () => {
  return (
    <div className="home-page" id="home-page">
      <Hero />
      <FeaturedCars />
      <CtaSection />
    </div>
  );
};

export default Home;
