import { useContext, useState, useMemo } from "react";
import { AppContext } from "../../context/AppContext";
import CarCard from "../../components/CarCard/CarCard";
import "./Cars.css";

const Cars = () => {
  const { cars, searchQuery } = useContext(AppContext);
  const [filters, setFilters] = useState({
    type: "",
    fuel: "",
    transmission: "",
    priceRange: "",
  });

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch =
        searchQuery === "" ||
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = filters.type === "" || car.type === filters.type;
      const matchesFuel = filters.fuel === "" || car.fuel === filters.fuel;
      const matchesTransmission =
        filters.transmission === "" ||
        car.transmission === filters.transmission;

      let matchesPrice = true;
      if (filters.priceRange === "low") matchesPrice = car.price <= 150;
      else if (filters.priceRange === "mid")
        matchesPrice = car.price > 150 && car.price <= 300;
      else if (filters.priceRange === "high") matchesPrice = car.price > 300;

      return (
        matchesSearch &&
        matchesType &&
        matchesFuel &&
        matchesTransmission &&
        matchesPrice
      );
    });
  }, [cars, searchQuery, filters]);

  const clearFilters = () => {
    setFilters({ type: "", fuel: "", transmission: "", priceRange: "" });
  };

  return (
    <div className="cars-page" id="cars-page">
      <div className="cars-page-header">
        <h1>Browse All Cars</h1>
        <p>
          Choose from our wide selection of vehicles for every occasion
        </p>
      </div>

      <div className="cars-page-content">
        <aside className="cars-filters" id="cars-filters">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All
            </button>
          </div>

          <div className="filter-group">
            <label>Car Type</label>
            <select
              value={filters.type}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <option value="">All Types</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Fuel Type</label>
            <select
              value={filters.fuel}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, fuel: e.target.value }))
              }
            >
              <option value="">All Fuels</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Transmission</label>
            <select
              value={filters.transmission}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  transmission: e.target.value,
                }))
              }
            >
              <option value="">All</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: e.target.value,
                }))
              }
            >
              <option value="">Any Price</option>
              <option value="low">Under $150/day</option>
              <option value="mid">$150 - $300/day</option>
              <option value="high">Over $300/day</option>
            </select>
          </div>
        </aside>

        <div className="cars-results">
          <p className="results-count">
            {filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""} found
          </p>
          {filteredCars.length > 0 ? (
            <div className="cars-grid">
              {filteredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="no-cars">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-light)"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <h3>No cars found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
