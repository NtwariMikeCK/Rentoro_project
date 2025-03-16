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
