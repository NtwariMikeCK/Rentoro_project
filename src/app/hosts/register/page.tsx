"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, DollarSign, Shield, Star, Loader2 } from "lucide-react";
import NavBar from "@/components/NavBar";
import ImageUploader from "@/components/MultipleImageUploader";
import { useMutation } from "@tanstack/react-query";
import request from "@/utils/axios";
import { toast } from "react-toastify";

interface CarData {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  location: string;
  description: string;
  dailyRate: number;
  imageUrls: string[];
}

interface UploadedImage {
  url: string;
  publicId: string;
}

const ListYourCar = () => {
  const [carDetails, setCarDetails] = useState<CarData>({
    make: "",
    model: "",
    color: "",
    year: 0,
    description: "",
    licensePlate: "",
    location: "",
    imageUrls: [],
    dailyRate: 0,
  });

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  // ADDED: New state variables for license plate validation
  const [licenseError, setLicenseError] = useState("");
  const [isLicensePlateValid, setIsLicensePlateValid] = useState(false);

  // Modified photo handling
  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setPhotoUrls(newUrls);
  };

  const removePhoto = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPhotoUrls((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // MODIFIED: Updated to handle license plate validation and formatting
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "licensePlate") {
      const formattedValue = formatRwandanLicensePlate(value);
      setCarDetails((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
      validateRwandanLicensePlate(formattedValue);
    } else {
      setCarDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCarDetails((prev) => ({
      ...prev,
      dailyRate: Number(value),
    }));
  };

  // MODIFIED: Updated to use license plate validation
  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return (
          !!carDetails.make &&
          !!carDetails.model &&
          !!carDetails.year &&
          isLicensePlateValid && // Use validation state instead of just checking existence
          !!carDetails.location
        );
      case 2:
        return selectedFiles.length >= 1;
      case 3:
        return !!carDetails.dailyRate;
      default:
        return false;
    }
  };

  // ADDED: Validation function for Rwandan license plates
  const validateRwandanLicensePlate = (plate: string) => {
    // Remove any spaces for validation
    const formattedPlate = plate.trim().replace(/\s+/g, "");

    if (!formattedPlate) {
      setLicenseError("License plate is required");
      setIsLicensePlateValid(false);
      return false;
    }

    // Pattern for standard Rwandan plates: RAA 123A, RAB 123C, etc.
    const standardPattern = /^RA[A-Z][0-9]{3}[A-Z]$/;

    // Pattern for government plates: GR 123A
    const governmentPattern = /^GR[0-9]{3}[A-Z]$/;

    // Pattern for diplomatic plates: CD 123A
    const diplomaticPattern = /^CD[0-9]{3}[A-Z]$/;

    // Pattern for possible numeric endings: RAA 1234
    const numericEndPattern = /^RA[A-Z][0-9]{4}$/;

    if (
      standardPattern.test(formattedPlate) ||
      governmentPattern.test(formattedPlate) ||
      diplomaticPattern.test(formattedPlate) ||
      numericEndPattern.test(formattedPlate)
    ) {
      setLicenseError("");
      setIsLicensePlateValid(true);
      return true;
    } else {
      setLicenseError(
        "Please enter a valid Rwandan license plate (e.g., RAA 123A)"
      );
      setIsLicensePlateValid(false);
      return false;
    }
  };

  // ADDED: Formatting function for Rwandan license plates
  const formatRwandanLicensePlate = (plate: string) => {
    // Remove existing spaces
    let value = plate.toUpperCase().replace(/\s/g, "");

    // Different format based on plate type
    if (value.startsWith("RA")) {
      // For standard plates: RAA 123A
      if (value.length > 3) {
        value = value.substring(0, 3) + " " + value.substring(3);
      }
    } else if (value.startsWith("GR") || value.startsWith("CD")) {
      // For government or diplomatic plates: GR 123A or CD 123A
      if (value.length > 2) {
        value = value.substring(0, 2) + " " + value.substring(2);
      }
    }

    return value;
  };

  const uploadPhotos = async (): Promise<string[]> => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Upload failed");
      }

      const data = await response.json();
      return data.images.map((img: UploadedImage) => img.url);
    } catch (error: any) {
      console.error("Upload error:", error);
      throw new Error("Failed to upload photos: " + error.message);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CarData) => {
      // Return the response from the API call
      return await request.post("/cars", data);
    },
    onSuccess: () => {
      setSuccess(true);
      toast.success("Successfully saved car.");
      setTimeout(() => {
        router.push("/cars");
      }, 2000);
    },
    onError: (error: any) => {
      setError(
        error.response?.data?.message || error.message || "Error saving car"
      );
      toast.error("Error saving car");
    },
  });

  // MODIFIED: Added license plate validation before submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      // Added license plate validation before submission
      if (!validateRwandanLicensePlate(carDetails.licensePlate)) {
        setLoading(false);
        return; // Stop if license plate is invalid
      }

      // Validate files
      if (selectedFiles.length === 0) {
        throw new Error("Please select at least one image");
      }

      if (selectedFiles.length < 3) {
        throw new Error("Please select at least three image");
      }

      // Upload images
      const uploadedUrls = await uploadPhotos();

      const carData: CarData = {
        make: carDetails.make,
        model: carDetails.model,
        year: Number(carDetails.year),
        licensePlate: carDetails.licensePlate,
        color: carDetails.color,
        location: carDetails.location,
        description: carDetails.description,
        dailyRate: Number(carDetails.dailyRate),
        imageUrls: uploadedUrls,
      };

      // Pass JSON object directly
      mutate(carData);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        toast.error("Login to access this page");
        router.push("/hosts");
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white">
      <NavBar isDark={true} isHost={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
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
                {stepNumber < 3 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      step > stepNumber ? "bg-[#593CFB]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
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
                  Car Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={carDetails.color}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]"
                  placeholder="e.g., Red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car description
                </label>
                <textarea
                  name="description"
                  value={carDetails.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]"
                  placeholder="Describe your car"
                  rows={3}
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

              {/* MODIFIED: Updated license plate input field with validation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License plate number
                </label>
                <input
                  type="text"
                  name="licensePlate"
                  value={carDetails.licensePlate}
                  onChange={handleInputChange}
                  onBlur={() =>
                    validateRwandanLicensePlate(carDetails.licensePlate)
                  }
                  className={`w-full px-4 py-3 border-2 ${
                    licenseError ? "border-red-500" : "border-gray-200"
                  } rounded-lg focus:outline-none focus:border-[#593CFB]`}
                  placeholder="Enter license plate number (e.g., RAA 123A)"
                />
                {licenseError && (
                  <p className="mt-1 text-sm text-red-600">{licenseError}</p>
                )}
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
                disabled={!validateStep(1)}
                className={`bg-[#593CFB] hover:bg-[#452CC9] text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center ${
                  !validateStep(1) ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
              Upload Car Photos
            </h2>

            <ImageUploader
              onFilesSelected={handleFilesSelected}
              previewUrls={photoUrls}
              onRemove={removePhoto}
            />

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

        {/* Step 3: Pricing */}
        {step === 3 && (
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
                    value={carDetails.dailyRate}
                    onChange={handlePricingChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB]"
                    placeholder="Enter daily rate"
                  />
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
                onClick={handleSubmit}
                disabled={!validateStep(3) || loading || isPending}
                className={`bg-[#593CFB] hover:bg-[#452CC9] text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center ${
                  !validateStep(3) || loading || isPending
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading || isPending ? (
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
                {"Make money when you're not using your car"}
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
