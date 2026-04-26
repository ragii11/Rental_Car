import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Bookings.css";

const Bookings = ({ backendUrl, token }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/booking/all`);
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/booking/status`,
        { bookingId, status },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(`Booking ${status.toLowerCase()}`);
        fetchBookings();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="bookings-page" id="admin-bookings-page">
      <div className="bookings-page-header">
        <h1>Bookings</h1>
        <p>Manage all rental bookings ({bookings.length} total)</p>
      </div>

      {bookings.length > 0 ? (
        <div className="bookings-table-container">
          <div className="bookings-table-header">
            <span>Car</span>
            <span>User</span>
            <span>Pickup</span>
            <span>Return</span>
            <span>Days</span>
            <span>Total</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {bookings.map((booking) => (
            <div className="bookings-table-row" key={booking._id} id={`admin-booking-${booking._id}`}>
              <span className="booking-car-name">{booking.carId?.name || "N/A"}</span>
              <span>{booking.userId?.name || booking.userId?.email || "N/A"}</span>
              <span>
                {new Date(booking.pickupDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span>
                {new Date(booking.returnDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span>{booking.days}</span>
              <span className="booking-total-price">${booking.totalPrice}</span>
              <span>
                <span className={`admin-status-badge ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </span>
              <span className="booking-actions">
                {booking.status === "Confirmed" && (
                  <>
                    <button
                      className="action-btn complete"
                      onClick={() => updateStatus(booking._id, "Completed")}
                      title="Mark Complete"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </button>
                    <button
                      className="action-btn cancel"
                      onClick={() => updateStatus(booking._id, "Cancelled")}
                      title="Cancel"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data-card">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <h3>No bookings yet</h3>
          <p>Bookings will appear here once users start renting cars and the backend is connected.</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;
