// pages/car-details/[id].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import cars from '../../data/cars.json'; // Import the JSON file
import { Car } from '../../types/carType';



// Mock function to fetch car details (replace with your actual data fetching method)
const fetchCarDetails = async (id: string): Promise<Car | null> => {
  return cars.find(car => car.id.toString() === id) || null;
};

// Car Details Page Component
const CarDetailsPage: React.FC<{ car: Car }> = ({ car }) => {
  const router = useRouter();

  // Handle case where car is not found
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative h-64">
            <Image 
              src={car.image} 
              alt={`${car.name} ${car.year} ${car.features}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4">
              {car.year} {car.name} {car.features}
            </h1>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-blue-600">${car.price.toLocaleString()}</p>
              <p>Name: {car.name}</p>
              <p>Year: {car.year}</p>
              {car.features && (
                <p className="mt-4 text-gray-600">{car.features}</p>
              )}
            </div>
            <div className="mt-6 flex space-x-4">
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => router.push(`/purchase/${car.id}`)}
              >
                Purchase
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => router.push('/inventory')}
              >
                Back to Inventory
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