import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { carList } from "../assets/assets";

export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const AppContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState(carList);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState([]);

  // Fetch cars from backend
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/car/list`);
      if (response.data.success && response.data.cars.length > 0) {
        setCars(response.data.cars);
      }
    } catch (error) {
      toast.error("Failed to fetch cars from server");
      console.error("Error fetching cars:", error);
    }
  };

  // Fetch user bookings from backend
  const fetchUserBookings = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${backendUrl}/api/booking/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings");
      console.error("Error fetching bookings:", error);
    }
  };

  // Login user
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        if (response.data.user) {
          setUser(response.data.user);
        }
        setShowLogin(false);
        toast.success("Logged in successfully!");
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  // Register user
  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        if (response.data.user) {
          setUser(response.data.user);
        }
        setShowLogin(false);
        toast.success("Account created successfully!");
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // Create booking + initiate Razorpay payment
  const createBooking = async (carId, pickupDate, returnDate) => {
    try {
      // Step 1: Create booking on backend (gets Razorpay order)
      const response = await axios.post(
        `${backendUrl}/api/booking/create`,
        { carId, pickupDate, returnDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        return false;
      }

      const { booking, order } = response.data;

      // Step 2: Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Car Rental",
        description: `Booking for ${booking.days} day(s)`,
        order_id: order.id,
        handler: async (paymentResponse) => {
          // Step 3: Verify payment on backend
          try {
            const verifyRes = await axios.post(
              `${backendUrl}/api/booking/verify`,
              {
                bookingId: booking._id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (verifyRes.data.success) {
              toast.success("Payment successful! Booking confirmed.");
              fetchUserBookings();
            } else {
              toast.error(verifyRes.data.message || "Payment verification failed");
            }
          } catch (err) {
            toast.error(err.response?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#4361ee",
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled. Your booking is saved as pending.");
            fetchUserBookings();
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
      return false;
    }
  };

  // Cancel booking
  const cancelBooking = async (bookingId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/booking/cancel`,
        { bookingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Booking cancelled");
        fetchUserBookings();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  // Logout
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    setBookings([]);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserBookings();
    }
  }, [token]);

  const value = {
    backendUrl,
    showLogin,
    setShowLogin,
    token,
    setToken,
    user,
    setUser,
    cars,
    setCars,
    searchQuery,
    setSearchQuery,
    bookings,
    setBookings,
    loginUser,
    registerUser,
    createBooking,
    cancelBooking,
    logout,
    fetchCars,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
