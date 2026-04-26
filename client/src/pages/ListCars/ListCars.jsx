import { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import "./ListCars.css";

const ListCars = () => {
  const { backendUrl, token, fetchCars } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Sedan",
    year: new Date().getFullYear(),
    seats: 4,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "",
    price: "",
    description: "",
    features: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to list your car!");
      return;
    }
    if (!image) {
      toast.error("Please upload an image of the car.");
      return;
    }

    try {
      setLoading(true);
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });
      submitData.append("image", image);

      // We hit the backend /api/car/add to list a new car. 
      const response = await axios.post(`${backendUrl}/api/car/add`, submitData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success("Car listed successfully!");
        setFormData({
          name: "",
          type: "Sedan",
          year: new Date().getFullYear(),
          seats: 4,
          fuel: "Petrol",
          transmission: "Automatic",
          location: "",
          price: "",
          description: "",
          features: "",
        });
        setImage(null);
        if (fetchCars) fetchCars();
      } else {
        toast.error(response.data.message || "Failed to list car.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while listing the car.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-cars-container">
      <div className="list-cars-header">
        <h1>List Your Car</h1>
        <p>Turn your car into an earning asset. It's safe, secure, and easy.</p>
      </div>

      <form className="list-cars-form" onSubmit={onSubmitHandler}>
        <div className="form-section">
          <h3>Car Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Car Name</label>
              <input type="text" name="name" value={formData.name} onChange={onChangeHandler} placeholder="e.g. Toyota Camry" required />
            </div>
            <div className="form-group">
              <label>Location (City)</label>
              <input type="text" name="location" value={formData.location} onChange={onChangeHandler} placeholder="e.g. New York" required />
            </div>
            <div className="form-group">
              <label>Price per Day ($)</label>
              <input type="number" name="price" value={formData.price} onChange={onChangeHandler} placeholder="e.g. 50" required min="1" />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input type="number" name="year" value={formData.year} onChange={onChangeHandler} required min="1990" max={new Date().getFullYear() + 1} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Specifications</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Category Type</label>
              <select name="type" value={formData.type} onChange={onChangeHandler}>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Sports">Sports</option>
                <option value="Electric">Electric</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fuel Type</label>
              <select name="fuel" value={formData.fuel} onChange={onChangeHandler}>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="form-group">
              <label>Transmission</label>
              <select name="transmission" value={formData.transmission} onChange={onChangeHandler}>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            <div className="form-group">
              <label>Seats</label>
              <input type="number" name="seats" value={formData.seats} onChange={onChangeHandler} required min="1" max="15" />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Info</h3>
          <div className="form-group full-width">
            <label>Features (Comma separated)</label>
            <input type="text" name="features" value={formData.features} onChange={onChangeHandler} placeholder="e.g. Bluetooth, Backup Camera, Sunroof" />
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={onChangeHandler} placeholder="Describe your car's condition, rules, or special features..." rows="4"></textarea>
          </div>
          <div className="form-group full-width">
            <label>Upload Car Image</label>
            <div className="image-upload-wrapper">
              <input type="file" id="car-image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
              <label htmlFor="car-image" className="image-upload-btn">
                {image ? image.name : "Choose an Image"}
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-car-btn" disabled={loading}>
          {loading ? "Publishing Listing..." : "List My Car Now"}
        </button>
      </form>
    </div>
  );
};

export default ListCars;
