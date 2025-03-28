import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jean Claude",
      role: "Car Owner, Kigali",
      quote:
        "I've been able to make extra income from my car when I'm not using it. The platform is easy to use and support is always there when I need help.",
      avatar: "/images/pexels-nappy-936119.jpg",
    },
    {
      name: "Sophia M.",
      role: "Traveler, USA",
      quote:
        "Renting a car through Rentoro made my trip to Rwanda so much more enjoyable. The process was smooth, and I got a great car for a reasonable price.",
      avatar: "/images/pexels-jorge-fakhouri-filho-861811-2701660.jpg",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear authentic stories from hosts and renters who have experienced
            Rentoro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 text-lg mb-6 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center">
                <div className="w-16 h-16 mr-5">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full border-4 border-purple-100 group-hover:border-purple-200 transition-all"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
