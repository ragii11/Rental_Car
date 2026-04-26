import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { heroBg } from "../../assets/assets";
import "./Hero.css";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const navigate = useNavigate();

  const handleExplore = (e) => {
    e.preventDefault();
    navigate("/cars");
  };

  return (
    <section className="hero" id="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Find, Book & Rent a Car <span>Easily</span>
        </h1>
        <p className="hero-subtitle">
          Get a car wherever and whenever you need it with the best daily price.
          Enjoy the freedom to explore new places with premium vehicles.
        </p>
        <form className="hero-form" onSubmit={handleExplore}>
          <div className="form-group">
            <label htmlFor="pickup-location">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Pickup Location
            </label>
            <select
              id="pickup-location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="New York">New York</option>
              <option value="Chicago">Chicago</option>
              <option value="Miami">Miami</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Dallas">Dallas</option>
              <option value="Las Vegas">Las Vegas</option>
              <option value="Houston">Houston</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pickup-date">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Pickup Date
            </label>
            <input
              type="date"
              id="pickup-date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
          <button type="submit" className="hero-btn" id="explore-btn">
            Explore Cars
          </button>
        </form>
      </div>
      <div className="hero-image">
        <img src={heroBg} alt="Luxury car on highway" />
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">100+</span>
            <span className="stat-label">Car Types</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Rental Outlets</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">20+</span>
            <span className="stat-label">Repair Partners</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
