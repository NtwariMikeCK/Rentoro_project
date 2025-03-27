import Link from "next/link";
import React, { useState } from "react";
import { Calendar, MapPin, Filter, ChevronDown, Star } from "lucide-react";
import cars from "../../data/cars.json";
import Image from "next/image";

const CarListingsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Rentoro
            </Link>

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
            <button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium">
              Update search
            </button>
          </div>
          {/* Filters Panel */}
          {filterOpen && (
            <div className="mt-4 p-6 bg-white border rounded-md shadow-md">
              <h3 className="font-bold text-lg mb-4">Filter cars</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Price range</h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Min"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Vehicle type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>SUV</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Sedan</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Truck</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>4WD</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Bluetooth</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Backup camera</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Car Listings */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Link
              key={car.id}
              href={`/individual_car/${car.id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                {/* Car Image */}
                <div className="h-48 w-full overflow-hidden relative">
                  <Image
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    fill
                  />
                </div>

                {/* Car Details */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">
                      {car.name} ({car.year})
                    </h3>
                    <div className="flex items-center">
                      <Star
                        className="text-yellow-500 mr-1"
                        fill="#fbbf24"
                        size={18}
                      />
                      <span className="text-sm">{car.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{car.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-blue-600">
                      ${car.price}/day
                    </span>
                    <div className="flex space-x-1">
                      {car.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-xs px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarListingsPage;
