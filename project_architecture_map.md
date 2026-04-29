# 🏗️ Architectural Project Map: Car Rental Platform

## 📁 Directory Structure
```text
Car_rental/
├── server/                 # Backend Express App
│   ├── config/             # Configuration connections
│   ├── controllers/        # Business logic
│   ├── middleware/         # Request interceptors (Auth)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express API endpoints
│   ├── uploads/            # Local fallback for car images
│   ├── .env                # Server secrets
│   └── server.js           # Express Entry Point
├── client/                 # User-facing React App (Vite)
│   ├── src/
│   │   ├── assets/         # Static images/data
│   │   ├── components/     # Reusable UI parts
│   │   ├── context/        # Global State (AppContext)
│   │   ├── pages/          # React Router views
│   │   ├── App.jsx         # App Layout & Routes
│   │   └── main.jsx        # React DOM render
│   ├── .env                # Client environment config
│   └── index.html          # Razorpay script inclusion
└── admin/                  # Admin-facing React App (Vite)
    ├── src/
    │   ├── components/     # Admin UI parts (Sidebar, Navbar)
    │   ├── pages/          # Admin views (Dashboard, AddCar, etc.)
    │   ├── App.jsx         # Admin Layout & Routes
    │   └── main.jsx        # React DOM render
    └── .env                # Admin environment config
```

---

## 🛠️ Server Backend (Node/Express)

### Core & Config
* **`server/server.js`**
  * **Purpose:** The main entry point for the backend. Sets up middleware, routing, CORS, and starts the Express server.
  * **Dependencies:** `express`, `cors`, `dotenv`, `./config/db.js`, all route files.
  * **Dependent Files:** None (entry point).
* **`server/config/db.js`**
  * **Purpose:** Handles the connection to MongoDB using Mongoose.
  * **Dependencies:** `mongoose`, `process.env.MONGODB_URI`.
  * **Dependent Files:** `server/server.js`.
* **`server/config/imagekit.js`**
  * **Purpose:** Configures the ImageKit CDN SDK for handling uploaded car images.
  * **Dependencies:** `imagekit`.
  * **Dependent Files:** `server/controllers/carController.js`.

### Models (Database Schemas)
* **`server/models/userModel.js`**
  * **Purpose:** Schema for standard users (name, email, password, role).
  * **Dependencies:** `mongoose`.
  * **Dependent Files:** `userController.js`, `admin.js` (middleware).
* **`server/models/carModel.js`**
  * **Purpose:** Schema for vehicle listings (name, type, price, features, image url).
  * **Dependencies:** `mongoose`.
  * **Dependent Files:** `carController.js`, `bookingController.js`, `adminController.js`.
* **`server/models/bookingModel.js`**
  * **Purpose:** Schema for rental reservations mapping a User to a Car, tracking dates and Razorpay status.
  * **Dependencies:** `mongoose`, refs to `User` and `Car`.
  * **Dependent Files:** `bookingController.js`, `adminController.js`.
* **`server/models/adminModel.js`**
  * **Purpose:** Schema specifically for admin users.
  * **Dependencies:** `mongoose`.
  * **Dependent Files:** `adminController.js`.
* **`server/models/paymentHistoryModel.js`**
  * **Purpose:** Tracks detailed logs of successful Razorpay transactions linked to bookings.
  * **Dependencies:** `mongoose`, refs to `User` and `Booking`.
  * **Dependent Files:** `bookingController.js`.

### Controllers (Business Logic)
* **`server/controllers/userController.js`**
  * **Purpose:** Handles user registration, login, and JWT token generation.
  * **Dependencies:** `userModel.js`, `bcryptjs`, `jsonwebtoken`.
  * **Dependent Files:** `server/routes/userRoute.js`.
* **`server/controllers/carController.js`**
  * **Purpose:** Handles adding cars (with ImageKit upload fallback to local), listing cars, removing cars, and toggling availability.
  * **Dependencies:** `carModel.js`, `imagekit.js`, `fs`.
  * **Dependent Files:** `server/routes/carRoute.js`.
* **`server/controllers/bookingController.js`**
  * **Purpose:** Calculates booking costs, creates Razorpay orders, verifies HMAC signatures upon payment, and handles cancellations.
  * **Dependencies:** `bookingModel.js`, `carModel.js`, `paymentHistoryModel.js`, `razorpay`, `crypto`.
  * **Dependent Files:** `server/routes/bookingRoute.js`.
* **`server/controllers/adminController.js`**
  * **Purpose:** Handles admin login, admin car CRUD operations, fetching all platform bookings, and seeding the default admin account.
  * **Dependencies:** `adminModel.js`, `carModel.js`, `bookingModel.js`, `bcryptjs`, `jsonwebtoken`.
  * **Dependent Files:** `server/routes/adminRoute.js`, `server/server.js` (for seed).

### Middleware
* **`server/middleware/auth.js`**
  * **Purpose:** Validates standard user JWT tokens.
  * **Dependencies:** `jsonwebtoken`.
  * **Dependent Files:** `userRoute.js`, `carRoute.js`, `bookingRoute.js`.
* **`server/middleware/adminAuth.js`**
  * **Purpose:** Validates admin JWT tokens based on the `role: "admin"` claim.
  * **Dependencies:** `jsonwebtoken`.
  * **Dependent Files:** `adminRoute.js`, `carRoute.js`, `bookingRoute.js`.
* **`server/middleware/admin.js`**
  * **Purpose:** Legacy/Alternative admin check that looks up the `User` model role (instead of the Admin model).
  * **Dependencies:** `userModel.js`.
  * **Dependent Files:** None currently strictly enforcing it, exists for standard users promoted to admin.

### Routes
* **`server/routes/userRoute.js`**: Maps `/api/user/*` to `userController.js`.
* **`server/routes/carRoute.js`**: Maps `/api/car/*` to `carController.js`. Uses `multer` for image parsing.
* **`server/routes/bookingRoute.js`**: Maps `/api/booking/*` to `bookingController.js`.
* **`server/routes/adminRoute.js`**: Maps `/api/admin/*` to `adminController.js`.

---

## 📱 Client Frontend (React)

### Core
* **`client/src/main.jsx` & `App.jsx`**
  * **Purpose:** Bootstraps React, sets up `react-router-dom` and the `AppContextProvider`. `App.jsx` handles layout.
* **`client/src/context/AppContext.jsx`**
  * **Purpose:** The global brain. Manages the car list, user token, bookings, search query, login logic, and handles the Razorpay checkout popup initialization.
  * **Dependencies:** `axios`, `react-toastify`.

### Pages
* **`client/src/pages/Home/Home.jsx`**
  * **Purpose:** Landing page.
  * **Dependencies:** `Hero.jsx`, `FeaturedCars.jsx`, `CtaSection.jsx`.
* **`client/src/pages/Cars/Cars.jsx`**
  * **Purpose:** Main browsing interface with search and category filters.
  * **Dependencies:** `AppContext`, `CarCard.jsx`.
* **`client/src/pages/CarDetails/CarDetails.jsx`**
  * **Purpose:** Deep dive on a single car, contains the booking form and price calculator. Triggers Razorpay.
  * **Dependencies:** `AppContext`.
* **`client/src/pages/ListCars/ListCars.jsx`**
  * **Purpose:** Form for standard users to submit their own cars for rent (triggers `multer` upload).
  * **Dependencies:** `AppContext`, `axios`.
* **`client/src/pages/MyBookings/MyBookings.jsx`**
  * **Purpose:** Displays user's booking history and allows cancellations.
  * **Dependencies:** `AppContext`.

### Key Components
* **`client/src/components/Navbar/Navbar.jsx`**
  * **Purpose:** Navigation, global search bar, user dropdown/logout.
  * **Dependencies:** `AppContext`.
* **`client/src/components/LoginPopup/LoginPopup.jsx`**
  * **Purpose:** Modal form for user authentication (Login/Signup).
  * **Dependencies:** `AppContext`.

---

## ⚙️ Admin Frontend (React)

### Core
* **`admin/src/App.jsx`**
  * **Purpose:** Layout manager. Wraps content in the `Sidebar` and `Navbar`, checks for `adminToken`, and renders `Login` if unauthenticated.

### Pages
* **`admin/src/pages/Login/Login.jsx`**
  * **Purpose:** Admin authentication screen.
  * **Dependencies:** `axios`.
* **`admin/src/pages/Dashboard/Dashboard.jsx`**
  * **Purpose:** Displays aggregate statistics (total revenue, active bookings, etc.) and recent activities.
  * **Dependencies:** `axios`.
* **`admin/src/pages/AddCar/AddCar.jsx`**
  * **Purpose:** Form for admins to manually input car inventory to the platform.
  * **Dependencies:** `axios`.
* **`admin/src/pages/CarList/CarList.jsx`**
  * **Purpose:** Table view of all cars. Admins can toggle availability or remove cars.
  * **Dependencies:** `axios`.
* **`admin/src/pages/Bookings/Bookings.jsx`**
  * **Purpose:** View all reservations across the platform and update their status (e.g., mark as Completed).
  * **Dependencies:** `axios`.
