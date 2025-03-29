import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, DollarSign } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16 lg:py-24">
          {/* Content Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
              <ShieldCheck className="mr-2 h-5 w-5" />
              Trusted by Rwanda's Car Owners
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl leading-tight">
              Earn Money by Sharing Your Car
            </h1>

            <p className="text-xl text-gray-600 max-w-xl">
              Transform your idle car into a profitable asset. Earn an average
              of $1,516 annually in Rwanda*
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/list-your-car" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#593CFB] hover:bg-[#452CC9] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center">
                  Get Started Now
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </Link>

              <div className="inline-flex items-center space-x-2 pl-4 text-gray-600">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span>No upfront costs</span>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              *Based on annual earnings of hosts in Rwanda sharing one car
            </p>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="absolute -inset-4 bg-purple-100 rounded-3xl opacity-50 blur-2xl"></div>
            <div className="relative z-10">
              <Image
                src="/images/host with a car.png"
                alt="Host with car"
                width={800}
                height={600}
                className="rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Quick Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <ShieldCheck className="h-10 w-10 text-purple-600 mb-4" />
            <h3 className="text-lg font-bold mb-2 text-gray-700 ">
              Fully Insured
            </h3>
            <p className="text-gray-600">
              Comprehensive protection for your vehicle
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <DollarSign className="h-10 w-10 text-green-600 mb-4" />
            <h3 className="text-lg font-bold mb-2 text-gray-700 ">
              High Earnings
            </h3>
            <p className="text-gray-600">
              Maximize your car's earning potential
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <ArrowRight className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold mb-2 text-gray-700 ">
              Easy Process
            </h3>
            <p className="text-gray-600">Simple steps to start earning</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
