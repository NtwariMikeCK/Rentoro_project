import React from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

const ListingSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b">
        <Link href="/">
          <h1 className="text-3xl font-black text-gray-900">Rentoro</h1>
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your car has been listed!
          </h1>

          <p className="text-gray-600 mb-8">
            Congratulations! Your car is now listed on Rentoro. You'll be
            notified when someone requests to book your car.
          </p>

          <div className="space-y-4">
            <Link href="/dashboard">
              <button className="w-full bg-[#593CFB] hover:bg-[#452CC9] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center">
                Go to dashboard
                <ArrowRight className="ml-2" size={20} />
              </button>
            </Link>

            <Link href="/">
              <button className="w-full bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors border-2 border-gray-200">
                Return to home
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            What happens next?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Get requests</h3>
              <p className="text-gray-600 text-sm">
                Renters will send you trip requests for your car
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">
                Accept or decline
              </h3>
              <p className="text-gray-600 text-sm">
                Review requests and choose which trips to accept
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Start earning</h3>
              <p className="text-gray-600 text-sm">
                Get paid for each trip you complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingSuccess;
