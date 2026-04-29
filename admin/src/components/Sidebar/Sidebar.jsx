import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="admin-sidebar" id="admin-sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="CarRental Logo" className="logo-image" style={{ height: "40px", borderRadius: "8px" }} />
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} id="sidebar-dashboard">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/add" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} id="sidebar-add-car">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span>Add Car</span>
        </NavLink>

        <NavLink to="/list" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} id="sidebar-car-list">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <span>Car List</span>
        </NavLink>

        <NavLink to="/bookings" className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`} id="sidebar-bookings">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>Bookings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
