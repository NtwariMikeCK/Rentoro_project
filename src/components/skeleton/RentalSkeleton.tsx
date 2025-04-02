"use client";

export const RentalRequestsSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-4 animate-pulse"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Section */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>

            {/* Car Section */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-56"></div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rental Details */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>

            {/* Status & Cost */}
            <div className="flex items-center space-x-4">
              <div className="h-6 bg-gray-300 rounded-full w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>

            {/* Metadata */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
