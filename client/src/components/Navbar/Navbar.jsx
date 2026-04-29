import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { logo } from "../../assets/assets";
import "./Navbar.css";

const Navbar = () => {
  const { setShowLogin, token, logout, searchQuery, setSearchQuery } =
    useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      navigate("/cars");
    }
  };

  return (
    <nav className="navbar" id="navbar">
      <Link to="/" className="navbar-logo" id="navbar-logo">
        <img src={logo} alt="CarRental Logo" className="logo-image" style={{ height: "40px", borderRadius: "8px" }} />
      </Link>

      <div className={`navbar-links ${mobileMenu ? "active" : ""}`}>
        <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} id="nav-home">
          Home
        </Link>
        <Link to="/cars" className={`nav-link ${location.pathname === "/cars" ? "active" : ""}`} id="nav-cars">
          Cars
        </Link>
        <Link to="/my-bookings" className={`nav-link ${location.pathname === "/my-bookings" ? "active" : ""}`} id="nav-bookings">
          My Bookings
        </Link>
      </div>

      <div className="navbar-search" id="navbar-search">
        <input
          type="text"
          placeholder="Search cars"
          value={searchQuery}
          onChange={handleSearch}
        />
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>

      <div className="navbar-right">
        <Link to="/list-cars" className="nav-link list-cars-link" id="nav-list-cars">
          List cars
        </Link>

        {token ? (
          <div className="user-menu">
            <div
              className="user-avatar"
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  handleLogout();
                }
              }}
              title="Logout"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        ) : (
          <button
            className="login-btn"
            id="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        )}

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileMenu ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
