"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarDays, CarIcon, MapPin, Star } from "lucide-react";
import React, { useState } from "react";
import request from "@/utils/axios";
import { CarDataType } from "@/types/carType";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const CarDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="max-w-6xl mx-auto bg-gray-200 shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-300 h-64 w-full" />

          <div className="p-6">
            <div className="h-8 bg-gray-400 rounded w-3/4 mb-4" />
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-6" />

            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="h-6 bg-gray-400 rounded w-1/3 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-1/4" />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="h-12 bg-gray-400 rounded-lg w-1/2" />
              <div className="h-12 bg-gray-300 rounded-lg w-1/2" />
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6 border-t">
          <div className="h-6 bg-gray-400 rounded w-1/3 mb-4" />
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 bg-gray-300 rounded-full" />
            <div className="h-6 bg-gray-400 rounded w-1/3" />
          </div>
          <div className="flex items-center space-x-3 text-gray-600 mt-3">
            <CalendarDays className="w-5 h-5 text-gray-400" />
            <div className="h-4 bg-gray-300 rounded w-1/4" />
          </div>
          <div className="mt-3 h-10 bg-gray-400 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};

const CarDetailsPage = () => {
  const params: { id: string } = useParams<{ id: string }>();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data, isPending } = useQuery({
    queryKey: ["cars_single"],
    queryFn: async () => {
      return (await request.get(`/cars/${params.id}`)) as CarDataType;
    },
  });

  // Add the carImage is found in array form
  const carImages: string[] = Array.isArray(data?.imageUrls)
    ? data?.imageUrls
    : [];

  const carDetails = [
    {
      icon: <CarIcon className="w-5 h-5 text-blue-600" />,
      label: "Color",
      value: data?.color || "Red",
    },
    {
      icon: <MapPin className="w-5 h-5 text-blue-600" />,
      label: "Location",
      value: data?.location || "Kigali, Rwanda",
    },
  ];

  return (
    <>
      {isPending && <CarDetailsSkeleton />}
      {data && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Main Image */}
              <div className="relative h-96">
                {carImages.length > 0 ? (
                  <>
                    <Image
                      src={carImages[selectedImage] ?? "/placeholder.svg"}
                      alt={`${data?.year || "Car"}`}
                      fill
                      className="object-cover"
                    />

                    {/* Image Thumbnails */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {carImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-16 h-16 border-2 ${
                            selectedImage === index
                              ? "border-blue-500"
                              : "border-gray-300"
                          } rounded overflow-hidden`}
                        >
                          <Image
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <Image src="/placeholder.svg" alt="Placeholder" fill />
                )}
              </div>

              {/* Car Details */}
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">
                  {data?.year} {data?.model}
                </h1>

                {/* Price and Availability */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      ${data?.dailyRate.toLocaleString()}
                      <span className="text-sm text-gray-500 ml-2">
                        per day
                      </span>
                    </p>
                    <p className="text-sm text-green-600">Available</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-semibold">4.8 (125 trips)</span>
                  </div>
                </div>

                {/* Car Details List */}
                <div className="space-y-3 mb-6">
                  {carDetails.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {detail.icon}
                      <div>
                        <span className="font-semibold">{detail.label}:</span>{" "}
                        <span>{detail.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Link key={data?.id} href={`/checkout/${data?.id}`}>
                    <button
                      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      onClick={() => router.push(`/checkout/${data?.id}`)}
                    >
                      Continue to Checkout
                    </button>
                  </Link>

                  <button
                    className="flex-1 px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                    onClick={() => router.push("/cars")}
                  >
                    Back to Inventory
                  </button>
                </div>
              </div>
            </div>

            {/* Host Information */}
            <div className="bg-gray-50 p-6 border-t">
              <h2 className="text-2xl font-bold mb-4">HOSTED By</h2>
              <div className="flex items-center space-x-6">
                <Image
                  src={data?.owner.picture}
                  alt={data?.owner.firstName}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    {data?.owner.firstName}
                  </h3>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className="flex items-center">
                      <CalendarDays className="w-5 h-5 mr-1" />
                      <span>Joined {data?.owner.createdAt}</span>
                    </div>
                  </div>
                  <button className="mt-3 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                    Contact Host
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};
export default CarDetailsPage;
