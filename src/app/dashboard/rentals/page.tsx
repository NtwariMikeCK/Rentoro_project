"use client";

import RentalPageDashboard from "@/components/RentalDashboardPage";
import { RentalRequestsSkeleton } from "@/components/skeleton/RentalSkeleton";
import { RentalRequest } from "@/types/carType";
import request from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const RentalRequestsPage = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin_request_data"],
    queryFn: async () => {
      return (await request.get("/admin/rental-requests")) as RentalRequest[];
    },
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Rental Requests</h1>
      {isLoading && <RentalRequestsSkeleton />}

      <div className="space-y-4">
        {data &&
          data?.length > 0 &&
          data?.map((request: RentalRequest) => (
            <RentalPageDashboard
              request={request}
              key={request.id}
              refetch={refetch}
            />
          ))}
      </div>

      {data?.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 mt-8">
          No rental requests found
        </div>
      )}
    </div>
  );
};

export default RentalRequestsPage;
