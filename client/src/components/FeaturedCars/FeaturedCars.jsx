import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import CarCard from "../CarCard/CarCard";
import "./FeaturedCars.css";

const FeaturedCars = () => {
  const { cars } = useContext(AppContext);

  return (
    <section className="featured-section" id="featured-vehicles">
      <div className="section-header">
        <h2 className="section-title">Featured Vehicles</h2>
        <p className="section-subtitle">
          Explore our selection of premium vehicles available for your next
          adventure.
        </p>
      </div>
      <div className="cars-grid">
        {cars.slice(0, 6).map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCars;
