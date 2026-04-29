import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = ({ backendUrl, token }) => {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const carsRes = await axios.get(`${backendUrl}/api/car/list`);
      const bookingsRes = await axios.get(`${backendUrl}/api/booking/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (carsRes.data.success && bookingsRes.data.success) {
        const cars = carsRes.data.cars;
        const bookings = bookingsRes.data.bookings;

        const totalRevenue = bookings
          .filter((b) => b.status === "Confirmed" || b.status === "Completed")
          .reduce((sum, b) => sum + b.totalPrice, 0);

        const activeBookings = bookings.filter(
          (b) => b.status === "Confirmed"
        ).length;

        setStats({
          totalCars: cars.length,
          totalBookings: bookings.length,
          totalRevenue,
          activeBookings,
        });

        setRecentBookings(bookings.slice(0, 5));
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-page" id="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here&apos;s your platform overview.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card" id="stat-total-cars">
          <div className="stat-card-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M5 17H3v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2" />
              <line x1="9" y1="17" x2="15" y2="17" />
              <path d="M14 6l-4 0" />
            </svg>
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value">{stats.totalCars}</span>
            <span className="stat-card-label">Total Cars</span>
          </div>
        </div>

        <div className="stat-card" id="stat-total-bookings">
          <div className="stat-card-icon green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value">{stats.totalBookings}</span>
            <span className="stat-card-label">Total Bookings</span>
          </div>
        </div>

        <div className="stat-card" id="stat-revenue">
          <div className="stat-card-icon orange">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value">₹{stats.totalRevenue.toLocaleString()}</span>
            <span className="stat-card-label">Total Revenue</span>
          </div>
        </div>

        <div className="stat-card" id="stat-active">
          <div className="stat-card-icon purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value">{stats.activeBookings}</span>
            <span className="stat-card-label">Active Bookings</span>
          </div>
        </div>
      </div>

      <div className="recent-bookings-section">
        <h2>Recent Bookings</h2>
        {recentBookings.length > 0 ? (
          <div className="recent-bookings-table">
            <div className="table-header">
              <span>Car</span>
              <span>User</span>
              <span>Days</span>
              <span>Total</span>
              <span>Status</span>
            </div>
            {recentBookings.map((booking) => (
              <div className="table-row" key={booking._id}>
                <span>{booking.carId?.name || "N/A"}</span>
                <span>{booking.userId?.name || booking.userId?.email || "N/A"}</span>
                <span>{booking.days}</span>
                <span>₹{booking.totalPrice}</span>
                <span className={`status-badge ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">
            <p>No bookings yet. Data will appear once the backend is connected.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
