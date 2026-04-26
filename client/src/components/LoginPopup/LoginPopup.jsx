import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./LoginPopup.css";

const LoginPopup = () => {
  const { setShowLogin, loginUser, registerUser } = useContext(AppContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (currState === "Login") {
      await loginUser(data.email, data.password);
    } else {
      await registerUser(data.name, data.email, data.password);
    }
  };

  return (
    <div className="login-popup" id="login-popup">
      <div className="login-popup-overlay" onClick={() => setShowLogin(false)}></div>
      <form className="login-popup-container" onSubmit={onSubmit}>
        <div className="login-popup-header">
          <h2>
            <span>User</span> {currState}
          </h2>
          <button
            type="button"
            className="close-btn"
            onClick={() => setShowLogin(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="type here"
                value={data.name}
                onChange={onChangeHandler}
                required
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="type here"
              value={data.email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="type here"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        <p className="login-popup-switch">
          {currState === "Login" ? (
            <>
              Create an account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>click here</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </>
          )}
        </p>

        <button type="submit" className="login-submit-btn" id="login-submit-btn">
          {currState}
        </button>
      </form>
    </div>
  );
};

export default LoginPopup;
