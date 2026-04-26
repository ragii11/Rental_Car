import "./Navbar.css";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
  };

  return (
    <nav className="admin-navbar" id="admin-navbar">
      <h2 className="admin-navbar-title">Admin Panel</h2>
      <button className="admin-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
