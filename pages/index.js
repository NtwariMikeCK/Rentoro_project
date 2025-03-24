import Link from "next/link";
import React, { useState } from "react";
import { Calendar, Search, MapPin } from "lucide-react";
import SignUpModal from "../components/auth/signup";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
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
      <div className="relative min-h-[800px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/pexels-shkrabaanthony-7144209.jpg')",
          }}
        >
          <div className="absolute inset-0  bg-opacity-30"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-6">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-4xl font-black text-white">Rentoro</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/host"
              className="text-white hover:text-gray-200 text-base font-medium"
            >
              Become a host
            </Link>
            <button
              onClick={openSignUpModal}
              className="bg-white hover:bg-gray-100 text-gray-900 px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              Sign up
            </button>
            <button className="text-white hover:text-gray-200 font-medium">
              Log in
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-8 pt-32 max-w-7xl mx-auto">
          <h2 className="text-6xl font-black text-white mb-8 max-w-3xl">
            Find your drive
          </h2>
          <p className="text-xl text-white mb-12 max-w-2xl font-medium">
            Explore the largest car sharing marketplace in Rwanda
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Where
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB] text-gray-900 placeholder-gray-500"
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
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB] text-gray-900"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
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
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#593CFB] text-gray-900"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      min={startDate || new Date().toISOString().split("T")[0]}
                    />
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
                <div className="relative h-64">
                  <img
                    src={"/images/2019_Toyota_RAV4_LE_2.5L_front_4.14.19.jpg"}
                    alt="Car"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
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
          <h2 className="text-4xl font-bold mb-16 text-gray-900">
            How Rentoro works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="mb-6">
                <img
                  src="/images/browse-cars.svg"
                  alt="Browse cars"
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Browse cars
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Find the perfect car for your next adventure. Filter by make,
                model, price, and more.
              </p>
            </div>

            <div>
              <div className="mb-6">
                <img
                  src="/images/book-instantly.svg"
                  alt="Book instantly"
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Book instantly
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Book the car you want with instant confirmation. No waiting for
                approval needed.
              </p>
            </div>

            <div>
              <div className="mb-6">
                <img
                  src="/images/hit-the-road.svg"
                  alt="Hit the road"
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Hit the road
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Pick up your car at the agreed location and start your adventure
                with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Become a Host Section */}
      <div className="relative py-24 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Share your car, earn extra income
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of hosts in Rwanda who are earning money by
                sharing their cars on Rentoro.
              </p>
              <div className="space-y-6 mb-10">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#593CFB] bg-opacity-10 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#593CFB]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Earn money sharing your car
                    </h3>
                    <p className="text-gray-600">
                      Average hosts earn $10,516 annually sharing their car
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#593CFB] bg-opacity-10 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#593CFB]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Insurance included
                    </h3>
                    <p className="text-gray-600">
                      Up to $1M in liability insurance and 24/7 support
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#593CFB] bg-opacity-10 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-[#593CFB]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      You're in control
                    </h3>
                    <p className="text-gray-600">
                      Set your own price, availability, and rules
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/list-your-car">
                <button className="bg-[#593CFB] hover:bg-[#452CC9] text-white font-medium py-3.5 px-8 rounded-lg transition-colors">
                  Get started
                </button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="/images/host with a car.png"
                alt="Host with car"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">What our users say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from hosts and renters who use Rentoro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Jean Claude</h4>
                  <p className="text-gray-600 text-sm">Car Owner, Kigali</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been able to make extra income from my car when I'm not
                using it. The platform is easy to use and support is always
                there when I need help."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Sophia M.</h4>
                  <p className="text-gray-600 text-sm">Traveler, USA</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Renting a car through Rentoro made my trip to Rwanda so much
                more enjoyable. The process was smooth, and I got a great car
                for a reasonable price."
              </p>
            </div>
          </div>
        </div>
      </div>
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
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
