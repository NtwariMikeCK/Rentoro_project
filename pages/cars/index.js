import Link from "next/link";
import React, { useState } from "react";
import { Calendar, MapPin, Filter, ChevronDown } from "lucide-react";


const CarListingsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);


  // Sample car data
  const cars = [
    {
      id: 1,
      name: "Toyota RAV4",
      year: 2022,
      location: "Kigali, Rwanda",
      price: 45,
      rating: 4.9,
      reviews: 42,
      image: "/images/2019_Toyota_RAV4_LE_2.5L_front_4.14.19.jpg",
      features: ["4WD", "Bluetooth", "Backup camera"],
    },
    {
      id: 2,
      name: "Honda CR-V",
      year: 2021,
      location: "Kigali, Rwanda",
      price: 42,
      rating: 4.8,
      reviews: 36,
      image: "/images/Honda_CR-V_e-HEV_Elegance_AWD_(VI)_–_f_14072024.jpg",
      features: ["All-wheel drive", "USB ports", "Fuel efficient"],
    },
 {
      id: 3,
      name: "Jeep Wrangler",
      year: 2020,
      location: "Musanze, Rwanda",
      price: 55,
      rating: 4.7,
      reviews: 28,
      image: "/images/pexels-esmihel-13696704.jpg",
      features: ["4x4", "Convertible", "Off-road ready"],
    },
    {
      id: 4,
      name: "Toyota Land Cruiser",
      year: 2019,
      location: "Kigali, Rwanda",
      price: 60,
      rating: 4.9,
      reviews: 52,
      image: "/images/Toyota Land Cruiser.jpg",
      features: ["Spacious", "7 Seats", "Powerful engine"],
    },
{
      id: 5,
      name: "Hyundai Tucson",
      year: 2021,
      location: "Rubavu, Rwanda",
      price: 38,
      rating: 4.6,
      reviews: 19,
      image: "/images/Hyundai-Tucson-2023_12.webp",
      features: ["Fuel efficient", "Modern interior", "Apple CarPlay"],
    },
    {
      id: 6,
      name: "Nissan X-Trail",
      year: 2020,
      location: "Kigali, Rwanda",
      price: 40,
      rating: 4.7,
      reviews: 31,
      image: "/images/Nissan X-Trail.webp",
      features: ["Spacious", "Roof rack", "Good for families"],
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-blue-600">
              Rentoro
            </a>


            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Become a host
              </a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium">
                Sign up
              </button>
              <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md font-medium">
                Log in
              </button>
            </div>
          </div>
        </div>
      </header>
 {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center px-4 py-2 border rounded-md bg-white">
              <MapPin size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                className="border-none focus:outline-none"
                placeholder="Location"
                defaultValue="Kigali, Rwanda"
              />
            </div>


            <div className="flex items-center px-4 py-2 border rounded-md bg-white">
              <Calendar size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                className="border-none focus:outline-none"
                placeholder="Pick-up date"
                defaultValue="Mar 15, 2025"
              />
            </div>
       <div className="flex items-center px-4 py-2 border rounded-md bg-white">
              <Calendar size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                className="border-none focus:outline-none"
                placeholder="Drop-off date"
                defaultValue="Mar 20, 2025"
              />
            </div>


            <button
              className="flex items-center px-4 py-2 border rounded-md bg-white hover:bg-gray-50"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter size={18} className="text-gray-400 mr-2" />
              <span>Filters</span>
              <ChevronDown size={18} className="text-gray-400 ml-2" />
            </button>



