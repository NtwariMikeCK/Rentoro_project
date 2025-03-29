import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import Link from "next/link";
import { 
  MapPin, 
  Car as CarIcon, 
  Shield, 
  Star, 
  CalendarDays, 
  User 
} from 'lucide-react';
import cars from '../../data/cars.json';
import { Car } from '../../types/carType';
import React from "react";



const fetchCarDetails = async (id: string): Promise<Car | null> => {
  return cars.find(car => car.id.toString() === id) || null;
};

// Car Details Page Component
const CarDetailsPage: React.FC<{ car: Car }> = ({ car }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Car Not Found</h1>
        <button 
          onClick={() => router.push('/')} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Inventory
        </button>
      </div>
    );
  }

  // Mock host data (you would typically fetch this from your backend)
  const host = {
    name: "Alex Johnson",
    profilePic: "/api/placeholder/200/200",
    rating: 4.8,
    trips: 125,
    joined: "May 2022"
  };

  // Additional car details
  const carDetails = [
    { icon: <CarIcon className="w-5 h-5 text-blue-600" />, label: "Transmission", value: car.transmission || "Automatic" },
    { icon: <MapPin className="w-5 h-5 text-blue-600" />, label: "Location", value: car.location || "Kigali, Rwanda" },
    { icon: <Shield className="w-5 h-5 text-blue-600" />, label: "Protection Plan", value: "Premium" },
  ];

  // Mock car images (extend this with actual car images)
  const carImages = [
    car.image,
    car.image,
    car.image,
    car.image
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Image */}
          <div className="relative h-96">
            <Image 
              src={carImages[selectedImage]} 
              alt={`${car.name} ${car.year}`}
              fill
              className="object-cover"
            />
            {/* Image Thumbnails */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carImages.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 border-2 ${
                    selectedImage === index 
                      ? 'border-blue-500' 
                      : 'border-gray-300'
                  } rounded overflow-hidden`}
                >
                  <Image 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`} 
                    width={64} 
                    height={64} 
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Car Details */}
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">
              {car.year} {car.name} {car.features}
            </h1>
            
            {/* Price and Availability */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  ${car.price.toLocaleString()} 
                  <span className="text-sm text-gray-500 ml-2">per day</span>
                </p>
                <p className="text-sm text-green-600">Available</p>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-1" />
                <span className="font-semibold">4.8 (125 trips)</span>
              </div>
            </div>

            {/* Car Details List */}
            <div className="space-y-3 mb-6">
              {carDetails.map((detail, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {detail.icon}
                  <div>
                    <span className="font-semibold">{detail.label}:</span>{' '}
                    <span>{detail.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Link 
                key={car.id}
                href={`/checkout/${car.id}`}
              >
              <button 
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => router.push(`/checkout/${car.id}`)}
              >
                Continue to Checkout
              </button>
              </Link>
              
              <button 
                className="flex-1 px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                onClick={() => router.push('/inventory')}
              >
                Back to Inventory
              </button>
            </div>
          </div>
        </div>

        {/* Host Information */}
        <div className="bg-gray-50 p-6 border-t">
          <h2 className="text-2xl font-bold mb-4">HOSTED By</h2>
          <div className="flex items-center space-x-6">
            <Image 
              src={host.profilePic} 
              alt={host.name} 
              width={120} 
              height={120} 
              className="rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{host.name}</h3>
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  <span>{host.rating} Rating</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="w-5 h-5 mr-1" />
                  <span>Joined {host.joined}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-1" />
                  <span>{host.trips} Trips</span>
                </div>
              </div>
              <button className="mt-3 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                Contact Host
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Server-side rendering to fetch car details
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};

  // Ensure id is a string
  const carId = Array.isArray(id) ? id[0] : id;

  if (!carId) {
    return {
      notFound: true,
    };
  }

  const car = await fetchCarDetails(carId);

  if (!car) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      car,
    },
  };
};

export default CarDetailsPage;