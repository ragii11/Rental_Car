import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddCar from "./pages/AddCar/AddCar";
import CarList from "./pages/CarList/CarList";
import Bookings from "./pages/Bookings/Bookings";
import "./App.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

function App() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  if (!token) {
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
        <Login setToken={setToken} backendUrl={backendUrl} />
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <div className="app-container">
        <Sidebar />
        <div className="app-content">
          <Navbar setToken={setToken} />
          <Routes>
            <Route path="/" element={<Dashboard backendUrl={backendUrl} token={token} />} />
            <Route path="/add" element={<AddCar backendUrl={backendUrl} token={token} />} />
            <Route path="/list" element={<CarList backendUrl={backendUrl} token={token} />} />
            <Route path="/bookings" element={<Bookings backendUrl={backendUrl} token={token} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
