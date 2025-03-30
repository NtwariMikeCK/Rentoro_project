"use client";

import request from "@/utils/axios";
import { CarDataType } from "@/types/carType";
import { useQuery } from "@tanstack/react-query";
import { CarCard } from "@/components/CarsDashboard";
import CarsSkeleton from "@/components/skeleton/DashboardCardPage";

export default function CarsPage() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["cars_single"],
    queryFn: async () => {
      return (await request.get(`/cars/all`)) as CarDataType[];
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Car Management</h1>
        <p className="text-muted-foreground">
          Manage your fleet of rental vehicles
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isPending && (
          <>
            <CarsSkeleton />
            <CarsSkeleton />
          </>
        )}

        {data &&
          data?.map((car: CarDataType) => (
            <CarCard key={car.id} car={car} refetch={refetch} />
          ))}
      </div>
    </div>
  );
}
