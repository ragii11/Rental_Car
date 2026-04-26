import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import "./MyBookings.css";

const MyBookings = () => {
  const { bookings, token, setShowLogin, cancelBooking } = useContext(AppContext);

  if (!token) {
    return (
      <div className="my-bookings-page" id="my-bookings-page">
        <div className="bookings-empty">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-light)"
            strokeWidth="1.5"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          <h2>Please login to view bookings</h2>
          <p>You need to be logged in to see your booking history</p>
          <button
            className="login-prompt-btn"
            onClick={() => setShowLogin(true)}
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings-page" id="my-bookings-page">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>View and manage all your car rental bookings</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bookings-empty">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-light)"
            strokeWidth="1.5"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <h2>No bookings yet</h2>
          <p>Start exploring cars and make your first booking</p>
          <Link to="/cars" className="explore-btn">
            Explore Cars
          </Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div
              className="booking-card"
              key={booking._id}
              id={`booking-${booking._id}`}
            >
              <div className="booking-car-image">
                <img src={booking.car?.image} alt={booking.car?.name} />
              </div>
              <div className="booking-info">
                <div className="booking-info-top">
                  <h3>{booking.car?.name}</h3>
                  <span
                    className={`booking-status ${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="booking-car-type">
                  {booking.car?.type} • {booking.car?.year}
                </p>
                <div className="booking-dates">
                  <div className="booking-date">
                    <span className="date-label">Pickup</span>
                    <span className="date-value">
                      {new Date(booking.pickupDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="date-arrow">→</div>
                  <div className="booking-date">
                    <span className="date-label">Return</span>
                    <span className="date-value">
                      {new Date(booking.returnDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="booking-pricing">
                <div className="booking-total">
                  <span className="total-label">Total</span>
                  <span className="total-amount">${booking.totalPrice}</span>
                </div>
                <p className="booking-days">{booking.days} days</p>
                {booking.status === "Confirmed" && (
                  <button
                    className="cancel-booking-btn"
                    onClick={() => cancelBooking(booking._id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
