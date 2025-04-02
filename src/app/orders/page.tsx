"use client";

import NavBar from "@/components/NavBar";
import { RentalRequestsSkeleton } from "@/components/skeleton/RentalSkeleton";
import { UserRequest } from "@/types/carType";
import request from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import NotFound from "@/components/NotFound";
import Image from "next/image";
import returnImage from "@/lib/returnImages";

function UserOrders({ orders }: { orders: UserRequest[] }) {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy h:mm a");
  };

  // Calculate rental duration in days
  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Rental Orders</h1>

      {orders?.length === 0 ? (
        <div className="text-center py-12">
          <NotFound statement="No request found" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders &&
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onClick={() =>
                  setSelectedOrder(order.id === selectedOrder ? null : order.id)
                }
              >
                {/* Car Image */}
                <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                  {order?.car && order?.car?.imageUrls?.length ? (
                    <Image
                      src={returnImage(order.car.imageUrls)}
                      alt={`${order.car.make} ${order.car.model}`}
                      className="object-cover"
                      fill
                    />
                  ) : (
                    <Image
                      src="/placeholder.svg"
                      alt="Placeholder"
                      className="object-cover"
                      width={300}
                      height={192}
                    />
                  )}
                </div>

                {/* Order Summary */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold">
                      {order.car.make} {order.car.model}
                    </h2>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusBadgeColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="text-gray-600 mb-4">
                    <p>
                      {order.car.year} • {order.car.color} •{" "}
                      {order.car.licensePlate}
                    </p>
                    <p className="text-sm mt-1">{order.car.location}</p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium">Start Date</p>
                      <p>{formatDate(order.startDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">End Date</p>
                      <p>{formatDate(order.endDate)}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">
                            ${order.car.dailyRate}
                          </span>{" "}
                          x {calculateDuration(order.startDate, order.endDate)}{" "}
                          days
                        </p>
                      </div>
                      <p className="text-lg font-bold">
                        ${parseFloat(order.totalCost).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedOrder === order.id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <h3 className="font-medium mb-2">Order Details</h3>
                    <div className="text-sm grid grid-cols-2 gap-2">
                      <p className="text-gray-600">Order ID:</p>
                      <p className="truncate">{order.id}</p>
                      <p className="text-gray-600">Created:</p>
                      <p>{formatDate(order.createdAt)}</p>
                      <p className="text-gray-600">Last Updated:</p>
                      <p>{formatDate(order.updatedAt)}</p>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        Contact Support
                      </button>
                      {order.status === "PENDING" && (
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                          Cancel Rental
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default function OrderPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["user_requests"],
    queryFn: async () => {
      return (await request.get("/rental-requests")) as UserRequest[];
    },
  });

  return (
    <div>
      <NavBar isDark />
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Rental Requests</h1>
        {isLoading && <RentalRequestsSkeleton />}

        {!isLoading && data && <UserOrders orders={data} />}
      </div>
    </div>
  );
}
