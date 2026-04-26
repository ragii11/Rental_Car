import { Link } from "react-router-dom";
import "./CtaSection.css";

const CtaSection = () => {
  return (
    <section className="cta-section" id="cta-section">
      <div className="cta-content">
        <div className="cta-text">
          <h2>Do You Own a Luxury Car?</h2>
          <p>
            Turn your car into a money-making machine. List your vehicle on our
            platform and start earning today. It&apos;s easy, safe, and
            profitable.
          </p>
          <div className="cta-features">
            <div className="cta-feature">
              <div className="cta-feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span>Earn Extra Income</span>
            </div>
            <div className="cta-feature">
              <div className="cta-feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span>Full Insurance Coverage</span>
            </div>
            <div className="cta-feature">
              <div className="cta-feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span>Flexible Availability</span>
            </div>
          </div>
          <Link to="/list-cars" className="cta-btn" id="list-car-btn">
            List Your Car Now
          </Link>
        </div>
        <div className="cta-image-area">
          <div className="cta-decorative">
            <div className="cta-circle cta-circle-1"></div>
            <div className="cta-circle cta-circle-2"></div>
            <div className="cta-card">
              <div className="cta-card-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <div className="cta-card-text">
                <span className="cta-card-amount">$2,450</span>
                <span className="cta-card-label">Average Monthly Earning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
