import React from "react";
import Link from "next/link";
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const CarSharingSection = () => {
  const features = [
    {
      icon: CurrencyDollarIcon,
      title: "Earn money sharing your car",
      description: "Average hosts earn $10,516 annually sharing their car",
    },
    {
      icon: ShieldCheckIcon,
      title: "Insurance included",
      description: "Up to $1M in liability insurance and 24/7 support",
    },
    {
      icon: CalendarIcon,
      title: "You're in control",
      description: "Set your own price, availability, and rules",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Share your car, earn extra income
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of hosts in Rwanda who are earning money by sharing
              their cars on Rentoro.
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-5 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <feature.icon className="w-8 h-8 text-purple-600 group-hover:text-purple-700 transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/list-your-car">
            <button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-10 rounded-lg transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Get Started
            </button>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute -inset-2 bg-purple-200 rounded-3xl opacity-30 blur-xl"></div>
            <Image
              src="/images/host with a carl.png"
              alt="Car Sharing Illustration"
              className="relative z-10 rounded-3xl shadow-2xl object-cover w-full h-[500px]"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSharingSection;
