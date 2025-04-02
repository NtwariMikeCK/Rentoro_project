import { CarDataType } from "@/types/carType";
import Image from "next/image";
import Link from "next/link";

export function Car({ car }: { car: CarDataType }) {
  const carImages: string[] = Array.isArray(car?.imageUrls)
    ? car?.imageUrls
    : [];
  return (
    <Link key={car.id} href={`/cars/${car.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="relative w-full h-40">
          {carImages?.length > 0 ? (
            carImages && (
              <Image
                src={car?.imageUrls[0] || "/placeholder.svg"}
                alt="Car Image"
                className="object-contain"
                fill
              />
            )
          ) : (
            <Image src="/placeholder.svg" alt="Placeholder" fill />
          )}
        </div>

        {/* Car Details */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold">
              {car.make} {car.model} ({car.year})
            </h3>
          </div>
          <p className="text-gray-600 mb-2">{car.location}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-blue-600">
              ${car.dailyRate}/day
            </span>
            <div className="flex space-x-1"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
