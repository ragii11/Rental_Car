import car1 from "./car1.png";
import car2 from "./car2.png";
import car3 from "./car3.png";
import car4 from "./car4.png";
import car5 from "./car5.png";
import car6 from "./car6.png";
import car7 from "./car7.png";
import car8 from "./car8.png";
import heroBg from "./hero_bg.png";
import logo from "./logo.jpg";

export { heroBg, logo };

export const carList = [
  {
    _id: "1",
    name: "Toyota Corolla",
    type: "Sedan",
    year: 2021,
    seats: 4,
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Los Angeles",
    price: 130,
    available: true,
    image: car1,
    description:
      "The Toyota Corolla is a reliable and fuel-efficient sedan, perfect for city driving and long road trips. Features include advanced safety systems, comfortable interiors, and excellent mileage.",
    features: [
      "Bluetooth Connectivity",
      "Backup Camera",
      "Lane Departure Warning",
      "Adaptive Cruise Control",
      "Apple CarPlay",
    ],
  },
  {
    _id: "2",
    name: "BMW X5",
    type: "SUV",
    year: 2006,
    seats: 4,
    fuel: "Hybrid",
    transmission: "Semi-Automatic",
    location: "New York",
    price: 300,
    available: true,
    image: car2,
    description:
      "The BMW X5 combines luxury and performance in a powerful SUV package. With its hybrid engine, enjoy both power and efficiency on every journey.",
    features: [
      "Heated Seats",
      "Panoramic Sunroof",
      "360° Camera",
      "Wireless Charging",
      "Premium Sound System",
    ],
  },
  {
    _id: "3",
    name: "Toyota Corolla",
    type: "Sedan",
    year: 2021,
    seats: 4,
    fuel: "Diesel",
    transmission: "Manual",
    location: "Chicago",
    price: 130,
    available: true,
    image: car3,
    description:
      "Another excellent Toyota Corolla sedan, this time with manual transmission for those who enjoy a more engaged driving experience.",
    features: [
      "Bluetooth Connectivity",
      "Backup Camera",
      "USB Ports",
      "Climate Control",
      "Fog Lights",
    ],
  },
  {
    _id: "4",
    name: "Audi A4",
    type: "Sedan",
    year: 2023,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Miami",
    price: 200,
    available: true,
    image: car4,
    description:
      "The Audi A4 offers a perfect blend of luxury, technology, and performance. Its refined interior and quattro all-wheel drive make every drive exceptional.",
    features: [
      "Virtual Cockpit",
      "MMI Touch Display",
      "Audi Pre Sense",
      "LED Matrix Headlights",
      "Bang & Olufsen Sound",
    ],
  },
  {
    _id: "5",
    name: "Tesla Model 3",
    type: "Electric",
    year: 2024,
    seats: 5,
    fuel: "Electric",
    transmission: "Automatic",
    location: "San Francisco",
    price: 209,
    available: true,
    image: car5,
    description:
      "The Tesla Model 3 is a premium electric vehicle offering zero emissions, incredible acceleration, and cutting-edge autonomous driving features.",
    features: [
      "Autopilot",
      "15-inch Touchscreen",
      "Over-the-Air Updates",
      "Supercharger Network",
      "Glass Roof",
    ],
  },
  {
    _id: "6",
    name: "Range Rover Sport",
    type: "SUV",
    year: 2023,
    seats: 5,
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Dallas",
    price: 220,
    available: true,
    image: car6,
    description:
      "The Range Rover Sport delivers unmatched luxury with exceptional off-road capability. Perfect for those who demand both elegance and adventure.",
    features: [
      "Terrain Response",
      "Meridian Sound System",
      "Air Suspension",
      "Head-Up Display",
      "Heated Steering Wheel",
    ],
  },
  {
    _id: "7",
    name: "Porsche 911",
    type: "Sports",
    year: 2023,
    seats: 2,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Las Vegas",
    price: 450,
    available: true,
    image: car7,
    description:
      "The iconic Porsche 911 delivers exhilarating performance with timeless design. Experience the thrill of a true sports car legend.",
    features: [
      "Sport Chrono Package",
      "PASM Sport Suspension",
      "Bose Surround Sound",
      "Sport Exhaust System",
      "Porsche Active Safe",
    ],
  },
  {
    _id: "8",
    name: "Toyota Camry",
    type: "Sedan",
    year: 2022,
    seats: 5,
    fuel: "Hybrid",
    transmission: "Automatic",
    location: "Houston",
    price: 150,
    available: true,
    image: car8,
    description:
      "The Toyota Camry Hybrid provides exceptional fuel economy without sacrificing comfort or style. A perfect blend of practicality and modern technology.",
    features: [
      "Hybrid Powertrain",
      "JBL Audio System",
      "Wireless Charging",
      "Blind Spot Monitor",
      "Dual Zone Climate",
    ],
  },
];
