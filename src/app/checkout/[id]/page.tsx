"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  CreditCard,
  Shield,
  Check,
  Car,
  Clock,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import request from "@/utils/axios";
import { CarDataType } from "@/types/carType";
import { useParams } from "next/navigation";
import ImageCarousels from "@/components/ImageCarousel";

// Define a type for rental details
interface RentalDetailsType {
  days: number;
  subtotal: number;
  taxes: number;
  total: number;
}

const CheckoutPage = () => {
  const router = useRouter();
  const params: { id: string } = useParams<{ id: string }>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullName, setFullName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [rentalDetails, setRentalDetails] = useState<RentalDetailsType | null>(
    null
  );

  // Predefined Rwandan Provinces
  const rwandanProvinces = [
    "Kigali City",
    "Eastern Province",
    "Northern Province",
    "Southern Province",
    "Western Province",
  ];

  // Rwandan Districts (more specific locations)
  const rwandanDistricts = [
    "Gasabo",
    "Kicukiro",
    "Nyarugenge", // Kigali City
    "Bugesera",
    "Kayonza",
    "Kirehe",
    "Ngoma",
    "Rwamagana", // Eastern
    "Burera",
    "Gakenke",
    "Gicumbi",
    "Musanze",
    "Rulindo", // Northern
    "Gisagara",
    "Huye",
    "Kamonyi",
    "Muhanga",
    "Nyamagabe",
    "Nyanza",
    "Nyaruguru",
    "Ruhango", // Southern
    "Karongi",
    "Ngororero",
    "Nyabihu",
    "Rubavu",
    "Rusizi",
    "Rutsiro", // Western
  ];

  const { data: carData } = useQuery({
    queryKey: ["cars_single", params.id],
    queryFn: async () => {
      return (await request.get(`/cars/${params.id}`)) as CarDataType;
    },
  });

  // Calculate rental details
  const calculateRentalDetails = (): RentalDetailsType | null => {
    if (!startDate || !endDate || !carData?.dailyRate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in days
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return null;

    const subtotal = diffDays * carData.dailyRate;
    const taxes = subtotal * 0.18; // 18% VAT in Rwanda
    const total = subtotal + taxes;

    return {
      days: diffDays,
      subtotal: subtotal,
      taxes: taxes,
      total: total,
    };
  };

  // Update rental details whenever dates or car data changes
  useEffect(() => {
    const details = calculateRentalDetails();
    setRentalDetails(details);
  }, [startDate, endDate, carData]);

  // Validate Email
  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setEmailError("Email is required");
      return false;
    }

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  // Validate Full Name
  const validateFullName = (value: string): boolean => {
    if (!value.trim()) {
      setNameError("Full name is required");
      return false;
    }

    if (value.trim().length < 3) {
      setNameError("Name must be at least 3 characters");
      return false;
    }

    setNameError("");
    return true;
  };

  // Validate Phone Number
  const validatePhoneNumber = (value: string): boolean => {
    if (!value.trim()) {
      setPhoneError("Phone number is required");
      return false;
    }

    // Regular expression for international phone number validation
    // Allows +, digits, spaces, dashes and parentheses
    const phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError("Please enter a valid phone number");
      return false;
    }

    setPhoneError("");
    return true;
  };

  // Validate Pickup Location
  const validateLocation = (location: string): boolean => {
    // Check if location is empty
    if (!location.trim()) {
      setLocationError("Please enter a pickup location");
      return false;
    }

    // Check if location is in Rwanda (districts or provinces)
    const normalizedLocation = location.toLowerCase();
    const isValidRwandanLocation = [
      ...rwandanProvinces.map((p) => p.toLowerCase()),
      ...rwandanDistricts.map((d) => d.toLowerCase()),
    ].some(
      (validLocation) =>
        normalizedLocation.includes(validLocation) ||
        validLocation.includes(normalizedLocation)
    );

    if (!isValidRwandanLocation) {
      setLocationError("Please enter a valid location in Rwanda");
      return false;
    }

    setLocationError("");
    return true;
  };

  // Handle checkout submission
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const isLocationValid = validateLocation(pickupLocation);
    const isEmailValid = validateEmail(email);
    const isNameValid = validateFullName(fullName);
    const isPhoneValid = validatePhoneNumber(phoneNumber);

    // Check if all validations pass
    if (
      !startDate ||
      !endDate ||
      !paymentMethod ||
      !isLocationValid ||
      !isEmailValid ||
      !isNameValid ||
      !isPhoneValid ||
      !rentalDetails
    ) {
      return;
    }

    // Proceed to confirmation
    router.push(`/confirmation/${params.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Complete Your Reservation
      </h1>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Car Summary Section */}
          <div className="p-6 bg-gray-50">
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
              {carData?.imageUrls && carData?.imageUrls.length > 0 ? (
                <ImageCarousels images={carData?.imageUrls} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Car className="w-20 h-20 text-gray-400" />
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold mb-4">
              {carData?.year} {carData?.make} {carData?.model}
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-medium">
                  Daily Rate: ${carData?.dailyRate?.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Pickup Location: {pickupLocation || "Not selected"}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>
                  Rental Period:{" "}
                  {startDate && endDate
                    ? `${new Date(
                        startDate
                      ).toLocaleDateString()} to ${new Date(
                        endDate
                      ).toLocaleDateString()}`
                    : "Not selected"}
                </span>
              </div>
            </div>

            {/* Protection Plan */}
            <div className="bg-green-50 p-4 rounded-lg flex items-start space-x-4 mb-6">
              <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-800">
                  Discounts coming your way
                </h3>
                <p className="text-sm text-green-700">
                  After renting 3 cars, you will have access to our exclusive
                  discounts and premium vehicle selection.
                </p>
              </div>
            </div>

            {/* Rental Summary */}
            {rentalDetails && (
              <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  Rental Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Rental Duration</span>
                    <span className="font-medium">
                      {rentalDetails.days}{" "}
                      {rentalDetails.days === 1 ? "day" : "days"}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Daily Rate</span>
                    <span className="font-medium">
                      ${carData?.dailyRate?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      $
                      {rentalDetails.subtotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Taxes (18% VAT)</span>
                    <span className="font-medium">
                      $
                      {rentalDetails.taxes.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-blue-700 pt-2">
                    <span>Total</span>
                    <span>
                      $
                      {rentalDetails.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Form Section */}
          <div className="p-6">
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-blue-700">
                  Checkout Details
                </h2>

                {/* Pickup Location */}
                <div className="mb-5">
                  <label className="block mb-2 font-semibold text-gray-700">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter pickup location in Rwanda"
                    value={pickupLocation}
                    onChange={(e) => {
                      setPickupLocation(e.target.value);
                      if (locationError) validateLocation(e.target.value);
                    }}
                    onBlur={(e) => validateLocation(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      locationError ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {locationError && (
                    <p className="text-red-500 text-sm mt-1">{locationError}</p>
                  )}
                </div>

                {/* Location Suggestions */}
                <div className="mb-5">
                  <p className="text-sm text-gray-600 mb-2">
                    Suggested Locations:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[...rwandanProvinces, ...rwandanDistricts.slice(0, 6)].map(
                      (location) => (
                        <button
                          key={location}
                          type="button"
                          onClick={() => {
                            setPickupLocation(location);
                            validateLocation(location);
                          }}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition"
                        >
                          {location}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Rental Dates */}
                <div className="mb-5">
                  <label className="block mb-2 font-semibold text-gray-700">
                    Rental Dates
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1 text-gray-600">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-gray-600">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={
                          startDate || new Date().toISOString().split("T")[0]
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-5">
                  <label className="block mb-3 font-semibold text-gray-700">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Credit Card", "PayPal", "Mobile Money"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`
                          relative flex flex-col items-center justify-center 
                          p-4 border rounded-lg transition
                          ${
                            paymentMethod === method
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-300 hover:bg-gray-50"
                          }
                        `}
                      >
                        {paymentMethod === method && (
                          <div className="absolute top-2 right-2 bg-blue-600 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <CreditCard
                          className={`w-6 h-6 mb-2 ${
                            paymentMethod === method
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        />
                        <span className="text-sm">{method}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (nameError) validateFullName(e.target.value);
                      }}
                      onBlur={(e) => validateFullName(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                        nameError ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {nameError && (
                      <p className="text-red-500 text-sm mt-1">{nameError}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) validateEmail(e.target.value);
                      }}
                      onBlur={(e) => validateEmail(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                        emailError ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {emailError && (
                      <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Your phone number"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (phoneError) validatePhoneNumber(e.target.value);
                      }}
                      onBlur={(e) => validatePhoneNumber(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                        phoneError ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {phoneError && (
                      <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    !startDate ||
                    !endDate ||
                    !paymentMethod ||
                    !pickupLocation ||
                    !rentalDetails
                  }
                  className="w-full py-4 bg-blue-600 text-white rounded-lg
                    hover:bg-blue-700 transition font-semibold text-lg
                    disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
                >
                  Complete Reservation
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By completing this reservation, you agree to our Terms of
                  Service and Privacy Policy.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
 