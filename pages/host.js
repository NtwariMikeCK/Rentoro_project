import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Shield, Calendar, DollarSign } from "lucide-react";

const HostPage = () => {
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

      {/* Hero Section */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-5xl font-black text-gray-900 sm:text-6xl md:text-7xl">
                    Earn money by sharing your car
                  </h1>
                  <p className="mt-6 text-xl text-gray-600 max-w-xl">
                    Share your car whenever you're not using it and earn an
                    average of $10,516 annually in Rwanda*
                  </p>
                  <div className="mt-10">
                    <Link href="/list-your-car">
                      <button className="bg-[#593CFB] hover:bg-[#452CC9] text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center">
                        Get started now
                        <ArrowRight className="ml-2" size={20} />
                      </button>
                    </Link>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    *Based on annual earnings of hosts in Rwanda sharing one car
                  </p>
                </div>
                <div className="relative">
                  <img
                    src="/images/host with a carl.png"
                    alt="Host with car"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Why share your car on Rentoro?
            </h2>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="relative">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#593CFB] text-white">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-xl font-bold text-gray-900">
                    Earn extra income
                  </p>
                </div>
                <div className="mt-4 ml-16 text-base text-gray-600">
                  Make money sharing your car when you're not using it. You're
                  in control of your availability, pricing, and who can book.
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#593CFB] text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-xl font-bold text-gray-900">
                    Insurance included
                  </p>
                </div>
                <div className="mt-4 ml-16 text-base text-gray-600">
                  Rest easy knowing you're covered with up to $1M in liability
                  insurance and 24/7 roadside assistance.
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#593CFB] text-white">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-xl font-bold text-gray-900">
                    Flexible schedule
                  </p>
                </div>
                <div className="mt-4 ml-16 text-base text-gray-600">
                  Share your car only when it works for you. Block off times
                  when you need your car for personal use.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Getting started is easy
            </h2>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#593CFB] bg-opacity-10 mx-auto">
                  <span className="text-2xl font-bold text-[#593CFB]">1</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  List your car
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Create a free listing in minutes. Add photos, set your price,
                  and share your car's features.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#593CFB] bg-opacity-10 mx-auto">
                  <span className="text-2xl font-bold text-[#593CFB]">2</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  Get bookings
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Respond to booking requests and coordinate pickup with guests
                  through our secure messaging system.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#593CFB] bg-opacity-10 mx-auto">
                  <span className="text-2xl font-bold text-[#593CFB]">3</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  Get paid
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Earn money every time someone books your car. Get paid
                  directly to your bank account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#593CFB]">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to start earning?
            </h2>
            <p className="mt-4 text-xl text-purple-100">
              Join thousands of hosts who are already sharing their cars on
              Rentoro
            </p>
            <div className="mt-8">
              <Link href="/list-your-car">
                <button className="bg-white text-[#593CFB] hover:bg-gray-50 px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center">
                  List your car now
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            © {new Date().getFullYear()} Rentoro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HostPage;
