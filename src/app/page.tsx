"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CarDataType } from "@/types/carType";
import request from "@/utils/axios";
import { Car } from "@/components/Car";
import NavBar from "@/components/NavBar";
import CarSharingSection from "@/components/CarSharingSection";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create query parameters
    const searchParams = new URLSearchParams();
    if (location) searchParams.set("location", location);
    if (startDate) searchParams.set("minYear", startDate);
    if (endDate) searchParams.set("maxYear", endDate);

    // Navigate to cars page with search parameters
    router.push(`/cars?${searchParams.toString()}`);
  };

  const { data } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const res: CarDataType[] = await request.get(`/cars`);
      return [...res];
    },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[800px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 blur-sm"
          style={{
            backgroundImage: "url('/images/pexels-shkrabaanthony-7144209.jpg')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r"></div>
        </div>

        {/*Navbar */}
        <NavBar />

        {/* Hero Content with Enhanced Typography */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 pt-32 max-w-7xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl">
            <h2
              className="text-6xl font-extrabold  mb-6
              bg-gradient-to-r from-white to-gray-300
              bg-clip-text text-transparent
              leading-tight tracking-tight"
            >
              Find Your Perfect Drive
            </h2>
            <p
              className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium
              leading-relaxed tracking-wide"
            >
              Explore Rwandas most comprehensive car sharing marketplace with
              seamless booking and unmatched convenience
            </p>

            {/* Search Form with Refined Design */}
            <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-8 w-full max-w-4xl">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Where
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-3.5 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-[#593CFB] focus:border-transparent
                        text-gray-900 placeholder-gray-500 transition-all duration-300"
                        placeholder="City, airport, or address"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-3.5 text-gray-400"
                        size={20}
                      />
                      <select
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB] text-gray-900"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      >
                        {Array.from(
                          { length: new Date().getFullYear() - 1995 + 1 },
                          (_, index) => 1995 + index,
                        ).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Until
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-3.5 text-gray-400"
                        size={20}
                      />
                      <select
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB] text-gray-900"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      >
                        {Array.from(
                          { length: new Date().getFullYear() - 1995 + 1 },
                          (_, index) => 1995 + index,
                        ).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full bg-[#593CFB] hover:bg-[#452CC9] text-white font-medium py-3.5 px-4 rounded-lg transition-colors"
                >
                  Search for cars
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">
            Popular cars in Rwanda
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data &&
              data
                ?.slice(0, 3)
                .map((car: CarDataType) => <Car car={car} key={car.id} />)}
          </div>

          <div className="mt-12 text-center">
            <button
              className="bg-white text-[#593CFB] border-2 border-[#593CFB] hover:bg-[#593CFB] hover:text-white font-medium py-3 px-8 rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();
                router.push("/cars");
              }}
            >
              Browse all cars
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold mb-16 text-gray-900">
            How Rentoro works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                  <Image
                      src="/images/pexels-rdne-8052221.jpg"
                      alt="Browse cars"
                      className="w-full h-full object-cover object-center"
                      fill
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                Browse Cars
              </h3>
              <p className="text-gray-800 leading-relaxed text-center">
                Find the perfect car for your next adventure. Filter by make,
                model, price, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                  <Image
                      src="/images/Online-car-rental-booking.png"
                      alt="Book instantly"
                      className="w-full h-full object-cover object-center"
                      fill
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                Book instantly
              </h3>
              <p className="text-gray-800 leading-relaxed text-center">
                Book the car you want with instant confirmation. No waiting for
                approval needed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                  <Image
                      src="/images/pexels-vera-zaharieva-1766494-8127187.jpg"
                      alt="Hit the road"
                      className="w-full h-full object-cover object-center"
                      fill
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                Hit the road
              </h3>
              <p className="text-gray-800 leading-relaxed text-center">
                Pick up your car at the agreed location and start your adventure
                with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Become a Host Section */}
      <CarSharingSection />
      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Rentoro</h3>
              <p className="text-gray-400 leading-relaxed">
                The trusted car sharing marketplace in Rwanda
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Explore</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                      href="/book"
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                    Book a car
                  </Link>
                </li>
                <li>
                  <Link
                      href="/host"
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                    Share your car
                  </Link>
                </li>
                <li>
                  <Link
                      href="/about"
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                      href="/cities"
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cities
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                      href="/help"
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                      href="/support"
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                      href="/insurance"
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                    Insurance & protection
                  </Link>
                </li>
                <li>
                  <Link
                      href="/safety"
                      className="text-gray-400 hover:text-white transition-colors"
                  >
                    Safety standards
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Follow us</h4>
              <div className="flex space-x-4">
                <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
              <p className="mt-8 text-sm text-gray-400">
                © {new Date().getFullYear()} Rentoro. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
