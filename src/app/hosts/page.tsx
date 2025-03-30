"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Shield, Calendar, DollarSign } from "lucide-react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";

const HostPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/*Nav bar*/}
      <NavBar isDark={true} />

      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Maximize Your Vehicles Potential with Rentoro
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
                    Optimize Your Vehicles Earning Potential
                  </p>
                </div>
                <div className="mt-4 ml-16 text-base text-gray-600">
                  Transform your idle vehicle into a revenue stream. Maintain
                  complete control over your listing, including availability,
                  pricing, and booking preferences.
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#593CFB] text-white">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-xl font-bold text-gray-900">
                    Unparalleled Scheduling Flexibility
                  </p>
                </div>
                <div className="mt-4 ml-16 text-base text-gray-600">
                  Seamlessly integrate car sharing into your lifestyle.
                  Customize your availability, easily block out personal use
                  times, and maintain complete control over your vehicles
                  schedule.
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#593CFB] text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-xl font-bold text-gray-900">
                    Comprehensive Platform Protection
                  </p>
                </div>
                <div className="mt-4 ml-16 text-base text-gray-600">
                  Experience peace of mind with our robust verification
                  processes, secure payment systems, and dedicated support to
                  ensure a safe and reliable car sharing experience.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Your Path to Effortless Car Sharing
            </h2>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#6A5ACD] to-[#483D8B] mx-auto shadow-md">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  Showcase Your Vehicle
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Craft a compelling, detailed listing in minutes. Highlight
                  your cars unique features, upload professional photos, and set
                  competitive pricing.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#6A5ACD] to-[#483D8B] mx-auto shadow-md">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  Manage Bookings Seamlessly
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Leverage our intuitive platform to review and respond to
                  booking requests. Coordinate logistics effortlessly through
                  our secure, integrated messaging system.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#6A5ACD] to-[#483D8B] mx-auto shadow-md">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  Maximize Your Earnings
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Experience hassle-free income generation. Receive direct
                  deposits to your bank account, transforming your vehicle into
                  a valuable asset.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FDFBFF] text-black">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Unlock Your Vehicles Earning Potential
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Join our thriving community of hosts and turn your car into a
              profitable opportunity
            </p>
            <div className="mt-8">
              <Link href="/hosts/register">
                <button className="bg-white text-[#22223B] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center shadow-lg">
                  Start Your Listing Now
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
