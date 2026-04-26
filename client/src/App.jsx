import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./context/AppContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Home from "./pages/Home/Home";
import Cars from "./pages/Cars/Cars";
import CarDetails from "./pages/CarDetails/CarDetails";
import MyBookings from "./pages/MyBookings/MyBookings";
import ListCars from "./pages/ListCars/ListCars";
import "./App.css";

function App() {
  const { showLogin } = useContext(AppContext);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {showLogin && <LoginPopup />}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/list-cars" element={<ListCars />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
