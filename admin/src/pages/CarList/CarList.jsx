import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./CarList.css";

const CarList = ({ backendUrl, token }) => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/car/list`);
      if (response.data.success) {
        setCars(response.data.cars);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const removeCar = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/car/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Car removed");
        fetchCars();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing car");
    }
  };

  const toggleAvailability = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/car/toggle`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Availability updated");
        fetchCars();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="car-list-page" id="car-list-page">
      <div className="car-list-header">
        <h1>Car List</h1>
        <p>Manage all cars on the platform ({cars.length} total)</p>
      </div>

      {cars.length > 0 ? (
        <div className="car-list-table">
          <div className="car-table-header">
            <span>Image</span>
            <span>Name</span>
            <span>Type</span>
            <span>Price</span>
            <span>Location</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {cars.map((car) => (
            <div className="car-table-row" key={car._id} id={`admin-car-${car._id}`}>
              <div className="car-table-image">
                {car.image ? (
                  <img src={car.image} alt={car.name} />
                ) : (
                  <div className="no-image-placeholder">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="car-table-name">{car.name}</span>
              <span>{car.type}</span>
              <span className="car-table-price">₹{car.price}/day</span>
              <span>{car.location}</span>
              <span>
                <button
                  className={`availability-toggle ${car.available ? "available" : "unavailable"}`}
                  onClick={() => toggleAvailability(car._id)}
                >
                  {car.available ? "Available" : "Unavailable"}
                </button>
              </span>
              <span>
                <button className="remove-car-btn" onClick={() => removeCar(car._id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Remove
                </button>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data-card">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="1.5">
            <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M5 17H3v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2" />
            <line x1="9" y1="17" x2="15" y2="17" />
          </svg>
          <h3>No cars listed yet</h3>
          <p>Add cars from the &quot;Add Car&quot; page. Data will appear once the backend is connected.</p>
        </div>
      )}
    </div>
  );
};

export default CarList;
