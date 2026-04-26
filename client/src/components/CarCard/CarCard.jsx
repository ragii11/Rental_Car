import { useNavigate } from "react-router-dom";
import "./CarCard.css";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <div
      className="car-card"
      id={`car-card-${car._id}`}
      onClick={() => navigate(`/car/${car._id}`)}
    >
      <div className="car-card-image">
        {car.available && <span className="badge available">Available Now</span>}
        <img src={car.image} alt={car.name} />
        <div className="car-price-tag">
          <span className="price">${car.price}</span>
          <span className="per-day">/ day</span>
        </div>
      </div>
      <div className="car-card-info">
        <h3 className="car-name">{car.name}</h3>
        <p className="car-type">
          {car.type} • {car.year}
        </p>
        <div className="car-features">
          <div className="feature">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{car.seats} Seats</span>
          </div>
          <div className="feature">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span>{car.fuel}</span>
          </div>
          <div className="feature">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>{car.transmission}</span>
          </div>
          <div className="feature">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
