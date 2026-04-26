import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Login.css";

const Login = ({ setToken, backendUrl }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Check server connection.");
    }
  };

  return (
    <div className="admin-login" id="admin-login">
      <form className="admin-login-card" onSubmit={onSubmitHandler}>
        <div className="admin-login-logo">
          <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="14" fill="#3563E9" />
            <path d="M8 18L10 10H18L20 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="18" r="2" fill="white" />
            <circle cx="18" cy="18" r="2" fill="white" />
          </svg>
          <h1>CarRental Admin</h1>
        </div>
        <p className="admin-login-subtitle">Sign in to manage your platform</p>

        <div className="admin-login-field">
          <label htmlFor="admin-email">Email</label>
          <input
            type="email"
            id="admin-email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="admin-login-field">
          <label htmlFor="admin-password">Password</label>
          <input
            type="password"
            id="admin-password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="admin-login-btn" id="admin-login-btn">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
