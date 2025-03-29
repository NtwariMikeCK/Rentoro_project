import Link from "next/link";
import React, { useState } from "react";
import { Calendar, MapPin, Filter, ChevronDown, Star, X } from "lucide-react";
import cars from "../../data/cars.json";
import Image from "next/image";

// Define types for TypeScript
type ModalState = {
  isOpen: boolean;
  mode: 'signin' | 'signup' | null;
};

type AuthMode = 'signin' | 'signup';

const CarListingsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: null
  });

  // Modal functions
  const openModal = (mode: AuthMode) => {
    setModalState({
      isOpen: true,
      mode: mode
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: null
    });
  };

  const toggleMode = () => {
    setModalState({
      ...modalState,
      mode: modalState.mode === 'signin' ? 'signup' : 'signin'
    });
  };

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
              <a
                href="#"
                className="text-white bg-[#593CFB] hover:bg-[#452CC9] px-4 py-2 rounded-md font-medium"
              >
                Become a host
              </a>
              <button 
                onClick={() => openModal('signup')}
                className="bg-[#593CFB] text-white px-4 py-2 rounded-md font-medium hover:bg-[#452CC9]"
              >
                Sign up
              </button>
              <button 
                onClick={() => openModal('signin')}
                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md font-medium hover:bg-[#452CC9] hover:text-white"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[440px] relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal content */}
            <div className="p-8">
              {modalState.mode === 'signin' ? (
                <>
                  {/* Sign In Content */}
                  <h2 className="text-[32px] font-bold text-center text-gray-900 mb-2">
                    Login
                  </h2>
                  <p className="text-center text-gray-600 mb-8">Welcome back</p>
                </>
              ) : (
                <>
                  {/* Sign Up Content */}
                  <h2 className="text-[32px] font-bold text-center text-gray-900 mb-2">
                    Welcome to Rentoro
                  </h2>
                  <p className="text-center text-gray-600 mb-8">
                    Find the perfect vehicle for your next adventure
                  </p>
                </>
              )}

              {/* Auth options */}
              <div className="space-y-3">
                <button className="flex items-center justify-center w-full bg-black text-white rounded-lg py-3.5 px-4 hover:bg-gray-800 transition-colors font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2C5.582 2 2 5.582 2 10s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 15.5c-4.136 0-7.5-3.364-7.5-7.5S5.864 2.5 10 2.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5z" />
                    <path d="M13.5 10c0 1.933-1.567 3.5-3.5 3.5S6.5 11.933 6.5 10 8.067 6.5 10 6.5s3.5 1.567 3.5 3.5z" />
                  </svg>
                  Continue with Apple
                </button>

                <button className="flex items-center justify-center w-full border-2 border-gray-200 bg-white text-gray-700 rounded-lg py-3.5 px-4 hover:border-gray-300 transition-colors font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M17.8 10.2a8 8 0 0 0-.12-1.3H10v2.5h4.4a3.7 3.7 0 0 1-1.63 2.47v2.05h2.64A8 8 0 0 0 17.8 10.2z"
                      fill="#4285F4"
                    />
                    <path
                      d="M10 18c2.2 0 4.06-.73 5.41-1.97l-2.64-2.05a4.97 4.97 0 0 1-7.4-2.63H2.6v2.12A8 8 0 0 0 10 18z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.37 11.35c-.2-.56-.31-1.16-.31-1.78 0-.62.11-1.22.3-1.78V5.67H2.6a8 8 0 0 0 0 7.8l2.77-2.12z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M10 6.58c1.24 0 2.35.42 3.22 1.25l2.34-2.34A8 8 0 0 0 10 2c-3.01 0-5.73 1.34-7.4 3.67l2.77 2.12A4.8 4.8 0 0 1 10 6.58z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>

                <button className="flex items-center justify-center w-full border-2 border-gray-200 bg-white text-gray-700 rounded-lg py-3.5 px-4 hover:border-gray-300 transition-colors font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Continue with email
                </button>
              </div>

              {/* Toggle section */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                {modalState.mode === 'signin' ? (
                  <>
                    <p className="text-gray-600 mb-2">Don't have an account?</p>
                    <button
                      onClick={toggleMode}
                      className="font-semibold text-[#593CFB] hover:text-[#452CC9] transition-colors"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 mb-2">Already have an account?</p>
                    <button
                      onClick={toggleMode}
                      className="font-semibold text-[#593CFB] hover:text-[#452CC9] transition-colors"
                    >
                      Log in
                    </button>
                  </>
                )}
              </div>

              {/* Terms section */}
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  By signing up, you agree to Rentoro's{" "}
                  <a
                    href="#"
                    className="text-[#593CFB] hover:text-[#452CC9] hover:underline transition-colors"
                  >
                    terms of service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-[#593CFB] hover:text-[#452CC9] hover:underline transition-colors"
                  >
                    privacy policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4 text-black">
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
            <button className="ml-auto bg-[#593CFB] hover:bg-[#452CC9] text-white px-6 py-2 rounded-md font-medium">
              Update search
            </button>
          </div>
          {/* Filters Panel */}
          {filterOpen && (
            <div className="mt-4 p-6 bg-white border rounded-md shadow-md text-black">
              <h3 className="font-bold text-lg mb-4 ">Filter cars</h3>

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
                <div>
                  <h4 className="font-medium mb-2">Transmissions</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Automatic</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Manual</span>
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
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 "
                  />
                </div>

                {/* Car Details */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-black">
                      {car.name} ({car.year})
                    </h3>
                    <div className="flex items-center">
                      <Star
                        className="text-yellow-500 mr-1"
                        fill="#fbbf24"
                        size={18}
                      />
                      <span className="text-sm text-black">{car.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{car.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#593CFB]">
                      ${car.price}/day
                    </span>
                    <div className="flex space-x-1">
                      {car.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="bg-gray-500 text-xs px-2 py-1 rounded"
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