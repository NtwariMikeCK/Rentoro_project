import Link from "next/link";
import React, { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import SignUpModal from "../components/auth/signup";
import SignInModal from "../components/authSignin/signin";
import { useRouter } from "next/router";
import Testimonials from "../components/Testimonials";
import Image from "next/image";
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import CarSharingSection from "../components/CarSharingSection";

const HomePage = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };
  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Create query parameters
    const searchParams = new URLSearchParams();
    if (location) searchParams.set("location", location);
    if (startDate) searchParams.set("startDate", startDate);
    if (endDate) searchParams.set("endDate", endDate);

    // Navigate to cars page with search parameters
    router.push(`/cars?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[800px] overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 transform scale-105 blur-sm"
          style={{
            backgroundImage: "url('/images/pexels-shkrabaanthony-7144209.jpg')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-6">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-4xl font-black text-white">Rentoro</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <a
              href="/host"
              className="text-white bg-[#593CFB] hover:bg-[#452CC9] px-4 py-2 rounded-md font-medium"
            >
              Become a host
            </a>
            <button
              onClick={openSignUpModal}
              className="bg-[#593CFB] text-white px-4 py-2 rounded-md font-medium hover:bg-[#452CC9]"
            >
              Sign up
            </button>
            <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md font-medium hover:bg-[#452CC9] hover:text-white">
              Log in
            </button>
          </div>
        </nav>

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
              Explore Rwanda's most comprehensive car sharing marketplace with
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
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg 
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
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      From
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-3.5 text-gray-400"
                        size={20}
                      />
                      <input
                        type="date"
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-[#593CFB] focus:border-transparent 
                        text-gray-900 transition-all duration-300"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Until
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-3.5 text-gray-400"
                        size={20}
                      />
                      <input
                        type="date"
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-[#593CFB] focus:border-transparent 
                        text-gray-900 transition-all duration-300"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        min={
                          startDate || new Date().toISOString().split("T")[0]
                        }
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-[#593CFB] hover:bg-[#452CC9] 
                  text-white font-semibold py-4 px-4 rounded-lg 
                  transition-all duration-300 transform hover:-translate-y-1 
                  shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-[#593CFB]"
                >
                  Search for Cars
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
            {[1, 2, 3].map((car) => (
              <div
                key={car}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-64 ">
                  <Image
                    src={"/images/2019_Toyota_RAV4_LE_2.5L_front_4.14.19.jpg"}
                    alt="Car"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    fill
                  />

                  <div className="absolute top-4 right-4">
                    <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-colors duration-300 ease-in-out 
                   fill-none hover:fill-[#452CC9] 
                   cursor-pointer"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Toyota RAV4
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-gray-600">
                          4.9 (42 trips)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        $45
                      </span>
                      <span className="text-gray-600">/day</span>
                    </div>
                    <button className="bg-[#593CFB] hover:bg-[#452CC9] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="bg-white text-[#593CFB] border-2 border-[#593CFB] hover:bg-[#593CFB] hover:text-white font-medium py-3 px-8 rounded-lg transition-colors">
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
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                  <img
                    src="/images/pexels-rdne-8052221.jpg"
                    alt="Browse cars"
                    className="w-full h-full object-cover object-center"
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
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                  <img
                    src="/images/Online-car-rental-booking.png"
                    alt="Book instantly"
                    className="w-full h-full object-cover object-center"
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
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                  <img
                    src="/images/pexels-vera-zaharieva-1766494-8127187.jpg"
                    alt="Hit the road"
                    className="w-full h-full object-cover object-center"
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
      {/* Existing Modals */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      />
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
