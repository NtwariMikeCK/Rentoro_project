"use client";

import request from "@/utils/axios";
import { CarDataType } from "@/types/carType";
import { useQuery } from "@tanstack/react-query";
import { CarCard } from "@/components/CarsDashboard";
import CarsSkeleton from "@/components/skeleton/DashboardCardPage";


export default function PendingCarsPage() {
    const { data, isPending, refetch } = useQuery({
        queryKey: ["cars_single_pending"],
        queryFn: async () => {
            return (await request.get(`/admin/validations`)) as CarDataType[];
        },
    });

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Pending Car Validations</h1>
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
