import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./AddCar.css";

const AddCar = ({ backendUrl, token }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Sedan",
    year: "2024",
    seats: "5",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "",
    price: "",
    description: "",
    features: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.price) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("type", formData.type);
      data.append("year", formData.year);
      data.append("seats", formData.seats);
      data.append("fuel", formData.fuel);
      data.append("transmission", formData.transmission);
      data.append("location", formData.location);
      data.append("price", formData.price);
      data.append("description", formData.description);

      // Parse features as JSON array
      if (formData.features) {
        const featuresArr = formData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f);
        data.append("features", JSON.stringify(featuresArr));
      }

      if (image) {
        data.append("image", image);
      }

      const response = await axios.post(`${backendUrl}/api/car/add`, data, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success("Car added successfully!");
        setFormData({
          name: "",
          type: "Sedan",
          year: "2024",
          seats: "5",
          fuel: "Petrol",
          transmission: "Automatic",
          location: "",
          price: "",
          description: "",
          features: "",
        });
        setImage(null);
        setPreview(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding car. Check server connection.");
    }
  };

  return (
    <div className="add-car-page" id="add-car-page">
      <div className="add-car-header">
        <h1>Add New Car</h1>
        <p>Fill in the details below to add a new car to the platform</p>
      </div>

      <form className="add-car-form" onSubmit={handleSubmit}>
        <div className="image-upload-area" id="image-upload">
          <label htmlFor="car-image-input" className="image-upload-label">
            {preview ? (
              <img src={preview} alt="Preview" className="image-preview" />
            ) : (
              <div className="upload-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Click to upload car image</span>
                <small>PNG, JPG up to 5MB</small>
              </div>
            )}
          </label>
          <input
            type="file"
            id="car-image-input"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="add-car-name">Car Name *</label>
            <input
              type="text"
              id="add-car-name"
              name="name"
              placeholder="e.g., Toyota Camry"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="add-car-type">Car Type</label>
            <select id="add-car-type" name="type" value={formData.type} onChange={handleChange}>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="add-car-year">Year</label>
            <input type="number" id="add-car-year" name="year" value={formData.year} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="add-car-seats">Seats</label>
            <select id="add-car-seats" name="seats" value={formData.seats} onChange={handleChange}>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="7">7</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="add-car-fuel">Fuel Type</label>
            <select id="add-car-fuel" name="fuel" value={formData.fuel} onChange={handleChange}>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="add-car-transmission">Transmission</label>
            <select id="add-car-transmission" name="transmission" value={formData.transmission} onChange={handleChange}>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="add-car-location">Location *</label>
            <input
              type="text"
              id="add-car-location"
              name="location"
              placeholder="e.g., Los Angeles"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="add-car-price">Price per day ($) *</label>
            <input
              type="number"
              id="add-car-price"
              name="price"
              placeholder="e.g., 150"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-field full-width">
          <label htmlFor="add-car-features">Features (comma separated)</label>
          <input
            type="text"
            id="add-car-features"
            name="features"
            placeholder="e.g., Bluetooth, Backup Camera, Climate Control"
            value={formData.features}
            onChange={handleChange}
          />
        </div>

        <div className="form-field full-width">
          <label htmlFor="add-car-description">Description</label>
          <textarea
            id="add-car-description"
            name="description"
            placeholder="Describe the car..."
            rows="4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="add-car-btn" id="add-car-submit-btn">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
