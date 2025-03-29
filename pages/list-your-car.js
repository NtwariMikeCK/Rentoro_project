import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ArrowRight,
  Camera,
  DollarSign,
  Shield,
  Star,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import NavbarHost from "../components/navbarHost"; // Import the NavbarHost component

const ListYourCar = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [carDetails, setCarDetails] = useState({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    location: "",
    photos: [],
    availability: {
      advanceNotice: "same_day",
      minDuration: "1",
      maxDuration: "30",
    },
    pricing: {
      dailyRate: "",
      weeklyDiscount: "0",
      monthlyDiscount: "0",
    },
  });

  const fileInputRef = useRef(null);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleAvailabilityChange = (e) => {
  //   const { name, value } = e.target;
  //   setCarDetails((prev) => ({
  //     ...prev,
  //     availability: {
  //       ...prev.availability,
  //       [name]: value,
  //     },
  //   }));
  // };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [name]: value,
      },
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedPhotos((prev) => [...prev, ...files]);

    // Create preview URLs
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setPhotoUrls((prev) => [...prev, ...newUrls]);
  };

  const removePhoto = (index) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoUrls((prev) => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return (
          carDetails.make &&
          carDetails.model &&
          carDetails.year &&
          carDetails.licensePlate &&
          carDetails.location
        );
      case 2:
        return uploadedPhotos.length >= 1; // Require at least one photo
      case 3:
        return true;
      case 4:
        return carDetails.pricing.dailyRate;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      // Add car details
      formData.append("make", carDetails.make);
      formData.append("model", carDetails.model);
      formData.append("year", carDetails.year);
      formData.append("licensePlate", carDetails.licensePlate);
      formData.append("location", carDetails.location);

      // Add availability and pricing as JSON strings
      formData.append("availability", JSON.stringify(carDetails.availability));
      formData.append("pricing", JSON.stringify(carDetails.pricing));

      // Add photos
      uploadedPhotos.forEach((photo, index) => {
        formData.append(`photo${index}`, photo);
      });

      const response = await fetch("/api/cars/create", {
        method: "POST",
        body: formData, // FormData will set the correct content-type
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error creating listing");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/listing-success");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b">
        <Link href="/">
          <h1 className="text-3xl font-black text-gray-900">Rentoro</h1>
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Log in
          </Link>
          <Link href="/signup">
            <button className="bg-[#593CFB] hover:bg-[#452CC9] text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
              Sign up
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? "bg-[#593CFB] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      step > stepNumber ? "bg-[#593CFB]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-4">
            <span className="text-sm font-medium text-gray-500">
              Car details
            </span>
            <span className="text-sm font-medium text-gray-500">Photos</span>
            <span className="text-sm font-medium text-gray-500">
              Availability
            </span>
            <span className="text-sm font-medium text-gray-500">Pricing</span>
          </div>
        </div>

        {/* Step 1: Car Details */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Tell us about your car
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car make
                </label>
                <input
                  type="text"
                  name="make"
                  value={carDetails.make}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]"
                  placeholder="e.g., Toyota"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car model
                </label>
                <input
                  type="text"
                  name="model"
                  value={carDetails.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]"
                  placeholder="e.g., RAV4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={carDetails.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]"
                  placeholder="e.g., 2020"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License plate number
                </label>
                <input
                  type="text"
                  name="licensePlate"
                  value={carDetails.licensePlate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]"
                  placeholder="Enter license plate number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car location
                </label>
                <input
                  type="text"
                  name="location"
                  value={carDetails.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]"
                  placeholder="Enter where your car is located"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="bg-[#593CFB] hover:bg-[#452CC9] text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
              >
                Continue
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Photos */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Add photos of your car
            </h2>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
              />
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-[#593CFB] hover:bg-[#452CC9] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Upload photos
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Add at least 6 photos. Include the front, back, sides, and
                interior of your car.
              </p>
            </div>

            {/* Photo Preview Grid */}
            {photoUrls.length > 0 && (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                {photoUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden relative">
                      <Image
                        src={url}
                        alt={`Car photo ${index + 1}`}
                        className="w-full h-full object-cover"
                        fill
                      />
                    </div>
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!validateStep(2)}
                className={`bg-[#593CFB] hover:bg-[#452CC9] text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center ${
                  !validateStep(2) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Continue
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Availability */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Set your availability
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Advance notice
                </h3>
                <p className="text-gray-600 mb-4">
                  How much notice do you need before a trip starts?
                </p>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]">
                  <option>Same day (Recommended)</option>
                  <option>24 hours notice</option>
                  <option>48 hours notice</option>
                  <option>72 hours notice</option>
                </select>
              </div>

              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Trip duration
                </h3>
                <p className="text-gray-600 mb-4">
                  Set your minimum and maximum trip duration
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]">
                      <option>1 day</option>
                      <option>2 days</option>
                      <option>3 days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]">
                      <option>7 days</option>
                      <option>14 days</option>
                      <option>30 days</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="bg-[#593CFB] hover:bg-[#452CC9] text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
              >
                Continue
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Pricing */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Set your pricing
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Daily rate
                </h3>
                <div className="relative">
                  <DollarSign
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="number"
                    name="dailyRate"
                    value={carDetails.pricing.dailyRate}
                    onChange={handlePricingChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]"
                    placeholder="Enter daily rate"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Discounts
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weekly discount (%)
                    </label>
                    <input
                      type="number"
                      name="weeklyDiscount"
                      value={carDetails.pricing.weeklyDiscount}
                      onChange={handlePricingChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]"
                      placeholder="e.g., 10"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly discount (%)
                    </label>
                    <input
                      type="number"
                      name="monthlyDiscount"
                      value={carDetails.pricing.monthlyDiscount}
                      onChange={handlePricingChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]"
                      placeholder="e.g., 20"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!validateStep(4) || loading}
                className={`bg-[#593CFB] hover:bg-[#452CC9] text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center ${
                  !validateStep(4) || loading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Creating listing...
                  </>
                ) : (
                  <>
                    Create listing
                    <ArrowRight className="ml-2" size={20} />
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 p-4 bg-green-50 text-green-600 rounded-lg">
                Listing created successfully! Redirecting...
              </div>
            )}
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <DollarSign className="h-12 w-12 text-[#593CFB] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Earn extra income
              </h3>
              <p className="text-gray-600">
                {"Make money when you're not using your car "}
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-[#593CFB] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Insurance included
              </h3>
              <p className="text-gray-600">
                {"$1M liability insurance and 24/7 support"}
              </p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-[#593CFB] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Youre in control
              </h3>
              <p className="text-gray-600">
                Set your own price and availability
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListYourCar;
