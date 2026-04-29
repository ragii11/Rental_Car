import { useContext, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import "./CarDetails.css";

const currency = import.meta.env.VITE_CURRENCY || "₹";

const CarDetails = () => {
  const { id } = useParams();
  const { cars, token, setShowLogin, createBooking } =
    useContext(AppContext);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const car = cars.find((c) => c._id === id);

  // Auto-calculate days and total price
  const { days, totalPrice } = useMemo(() => {
    if (!pickupDate || !returnDate || !car) return { days: 0, totalPrice: 0 };
    const p = new Date(pickupDate);
    const r = new Date(returnDate);
    if (isNaN(p.getTime()) || isNaN(r.getTime()) || r <= p) return { days: 0, totalPrice: 0 };
    const d = Math.ceil((r - p) / (1000 * 60 * 60 * 24));
    return { days: d, totalPrice: d * car.price };
  }, [pickupDate, returnDate, car]);

  if (!car) {
    return (
      <div className="car-details-page" id="car-details-page">
        <div className="car-not-found">
          <h2>Car not found</h2>
          <Link to="/cars" className="back-link">
            ← Back to all cars
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!token) {
      setShowLogin(true);
      return;
    }
    if (!pickupDate || !returnDate) {
      toast.error("Please select both pickup and return dates");
      return;
    }

    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    if (returnD <= pickup) {
      toast.error("Return date must be after pickup date");
      return;
    }

    setIsProcessing(true);
    const success = await createBooking(car._id, pickupDate, returnDate);
    if (success) {
      setPickupDate("");
      setReturnDate("");
    }
    setIsProcessing(false);
  };

  return (
    <div className="car-details-page" id="car-details-page">
      <Link to="/cars" className="back-link" id="back-to-cars">
        ← Back to all cars
      </Link>

      <div className="car-details-content">
        <div className="car-details-image">
          <img src={car.image} alt={car.name} />
        </div>

        <div className="car-booking-card" id="booking-card">
          <div className="booking-price">
            <span className="booking-price-amount">{currency}{car.price}</span>
            <span className="booking-price-label">per day</span>
          </div>
          <div className="booking-divider"></div>

          <form onSubmit={handleBooking}>
            <div className="booking-field">
              <label htmlFor="pickup-date-detail">Pickup Date</label>
              <input
                type="date"
                id="pickup-date-detail"
                value={pickupDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>

            <div className="booking-field">
              <label htmlFor="return-date-detail">Return Date</label>
              <input
                type="date"
                id="return-date-detail"
                value={returnDate}
                min={pickupDate || new Date().toISOString().split("T")[0]}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            {days > 0 && (
              <div className="booking-summary">
                <div className="booking-summary-row">
                  <span>{currency}{car.price} × {days} day{days > 1 ? "s" : ""}</span>
                  <span>{currency}{totalPrice}</span>
                </div>
                <div className="booking-summary-divider"></div>
                <div className="booking-summary-row booking-summary-total">
                  <span>Total</span>
                  <span>{currency}{totalPrice}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="book-now-btn"
              id="book-now-btn"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : days > 0 ? `Pay ${currency}${totalPrice}` : "Book Now"}
            </button>
          </form>

          <p className="booking-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            Secure payment via Razorpay
          </p>
        </div>
      </div>

      <div className="car-info-section">
        <h1 className="car-detail-name">{car.name}</h1>
        <p className="car-detail-type">
          {car.type} • {car.year}
        </p>

        <div className="car-detail-specs">
          <div className="spec-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <div>
              <span className="spec-label">Seats</span>
              <span className="spec-value">{car.seats} Passengers</span>
            </div>
          </div>
          <div className="spec-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <div>
              <span className="spec-label">Fuel</span>
              <span className="spec-value">{car.fuel}</span>
            </div>
          </div>
          <div className="spec-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <div>
              <span className="spec-label">Transmission</span>
              <span className="spec-value">{car.transmission}</span>
            </div>
          </div>
          <div className="spec-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div>
              <span className="spec-label">Location</span>
              <span className="spec-value">{car.location}</span>
            </div>
          </div>
        </div>

        <div className="car-description">
          <h3>About This Car</h3>
          <p>{car.description}</p>
        </div>

        <div className="car-features-list">
          <h3>Features</h3>
          <div className="features-grid">
            {car.features && car.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
