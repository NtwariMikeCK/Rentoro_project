"use client";

import Link from "next/link";
import React, { useState } from "react";
import { MapPin, Filter, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import request from "@/utils/axios";
import { CarDataType } from "@/types/carType";
import NotFound from "@/components/auth/NotFound";
import {useSearchParams} from "next/navigation";

const CarListingsPage = () => {
  const searchParams = useSearchParams()

  const [filterOpen, setFilterOpen] = useState(false);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [minYear, setMinYear] = useState(searchParams.get("minYear")|| "");
  const [maxYear, setMaxYear] = useState(searchParams.get("maxYear") || "");
  const [minDailyRate, setMinDailyRate] = useState("");
  const [maxDailyRate, setMaxDailyRate] = useState("");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  const { data, isPending } = useQuery({
    queryKey: [
      "cars",
      make,
      model,
      minYear,
      maxYear,
      minDailyRate,
      maxDailyRate,
      location,
    ],
    queryFn: async () => {
      const params: Record<string, string> = {
        ...(make && { make }),
        ...(model && { model }),
        ...(minYear && { minYear }),
        ...(maxYear && { maxYear }),
        ...(minDailyRate && { minDailyRate }),
        ...(maxDailyRate && { maxDailyRate }),
        ...(location && { location }),
      };

      const carsUrl: string = new URLSearchParams(params).toString();
      const res: CarDataType[] = await request.get(`/cars?${carsUrl}`);
      return [...res];
    },
  });

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
              <button className="bg-[#593CFB] text-white px-4 py-2 rounded-md font-medium hover:bg-[#452CC9]">
                Sign up
              </button>
              <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md font-medium hover:bg-[#452CC9] hover:text-white">
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
            {/* Make */}
            <div className="flex items-center px-4 py-2 border rounded-md bg-white">
              <input
                type="text"
                className="border-none focus:outline-none"
                placeholder="Car Make"
                onChange={(e) => setMake(e.target.value)}
              />
            </div>

            {/* Model */}
            <div className="flex items-center px-4 py-2 border rounded-md bg-white">
              <input
                type="text"
                className="border-none focus:outline-none"
                placeholder="Car Model"
                onChange={(e) => setModel(e.target.value)}
              />
            </div>

            {/* Min Year */}
            <div className="flex items-center px-4 py-2 border rounded-md bg-white">
              <input
                type="number"
                className="border-none focus:outline-none"
                placeholder="Min Year"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
              />
            </div>

            {/* Max Year */}
            <div className="flex items-center px-4 py-2 border rounded-md bg-white">
              <input
                type="number"
                className="border-none focus:outline-none"
                placeholder="Max Year"
                value={maxYear}
                onChange={(e) => setMaxYear(e.target.value)}
              />
            </div>

            {/* Min Daily Rate */}
            <div className="flex items-center px-4 py-2 border rounded-md bg-white">
              <input
                type="number"
                className="border-none focus:outline-none"
                placeholder="Min Daily Rate"
                onChange={(e) => setMinDailyRate(e.target.value)}
              />
            </div>

            {/* Max Daily Rate */}
            <div className="flex items-center px-4 py-2 border rounded-md bg-white">
              <input
                type="number"
                className="border-none focus:outline-none"
                placeholder="Max Daily Rate"
                onChange={(e) => setMaxDailyRate(e.target.value)}
              />
            </div>

            {/* Location */}
            <div className="flex items-center px-4 py-2 border rounded-md bg-white">
              <MapPin size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                className="border-none focus:outline-none"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Filter button */}
            <button
              className="flex items-center px-4 py-2 border rounded-md bg-white hover:bg-gray-50"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter size={18} className="text-gray-400 mr-2" />
              <span>Filters</span>
              <ChevronDown size={18} className="text-gray-400 ml-2" />
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
                      onChange={(e) => setMinDailyRate(e.target.value)}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Max"
                      onChange={(e) => setMaxDailyRate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/*Not found cars*/}
      <div className={"w-full p-4"}>
        {data && data?.length <= 0 && <NotFound statement={"No Cars found"} />}
      </div>

      {/* Car Listings */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/*Pending state*/}
          {isPending &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white p-4 rounded-lg shadow-md w-[400px]"
              >
                <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            ))}

          {data &&
            data?.map((car: CarDataType) => (
              <Link
                key={car.id}
                href={`/individual_car/${car.id}`}
                className="block"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  {/* Car Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold">
                        {car.make} {car.model} ({car.year})
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-2">{car.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-blue-600">
                        ${car.dailyRate}/day
                      </span>
                      <div className="flex space-x-1"></div>
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
