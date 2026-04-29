import { Link } from "react-router-dom";
import { logo } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="CarRental Logo" className="logo-image" style={{ height: "40px", borderRadius: "8px" }} />
          </div>
          <p>
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>About</h4>
            <Link to="#">How it works</Link>
            <Link to="#">Featured</Link>
            <Link to="#">Partnership</Link>
            <Link to="#">Business Relation</Link>
          </div>
          <div className="footer-column">
            <h4>Socials</h4>
            <Link to="#">Discord</Link>
            <Link to="#">Instagram</Link>
            <Link to="#">Twitter</Link>
            <Link to="#">Facebook</Link>
          </div>
          <div className="footer-column">
            <h4>Community</h4>
            <Link to="#">Events</Link>
            <Link to="#">Blog</Link>
            <Link to="#">Podcast</Link>
            <Link to="#">Invite a friend</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy;2024 CarRental. All Rights Reserved</p>
        <div className="footer-bottom-links">
          <Link to="#">Privacy & Policy</Link>
          <Link to="#">Terms & Condition</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
