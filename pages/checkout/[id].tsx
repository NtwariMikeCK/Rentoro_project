import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { 
  Calendar, 
  MapPin, 
  CreditCard, 
  Shield, 
  Check 
} from 'lucide-react';
import cars from '../../data/cars.json';
import { Car } from '../../types/carType';

// Mock function to fetch car details
const fetchCarDetails = async (id: string): Promise<Car | null> => {
  return cars.find(car => car.id.toString() === id) || null;
};

// Checkout Page Component
const CheckoutPage: React.FC<{ car: Car }> = ({ car }) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [locationError, setLocationError] = useState('');

  // Predefined Rwandan Provinces
  const rwandanProvinces = [
    'Kigali City',
    'Eastern Province',
    'Northern Province', 
    'Southern Province',
    'Western Province'
  ];

  // Rwandan Districts (more specific locations)
  const rwandanDistricts = [
    'Gasabo', 'Kicukiro', 'Nyarugenge', // Kigali City
    'Bugesera', 'Kayonza', 'Kirehe', 'Ngoma', 'Rwamagana', // Eastern
    'Burera', 'Gakenke', 'Gicumbi', 'Musanze', 'Rulindo', // Northern
    'Gisagara', 'Huye', 'Kamonyi', 'Muhanga', 'Nyamagabe', 'Nyanza', 'Nyaruguru', 'Ruhango', // Southern
    'Karongi', 'Ngororero', 'Nyabihu', 'Rubavu', 'Rusizi', 'Rutsiro' // Western
  ];

  // Calculate rental details
  const calculateRentalDetails = () => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    
    return {
      days,
      subtotal: car.price * days,
      taxes: car.price * days * 0.1,
      total: car.price * days * 1.1
    };
  };

  // Validate Pickup Location
  const validateLocation = (location: string) => {
    // Check if location is empty
    if (!location.trim()) {
      setLocationError('Please enter a pickup location');
      return false;
    }

    // Check if location is in Rwanda (districts or provinces)
    const normalizedLocation = location.toLowerCase();
    const isValidRwandanLocation = [
      ...rwandanProvinces.map(p => p.toLowerCase()),
      ...rwandanDistricts.map(d => d.toLowerCase())
    ].some(validLocation => 
      normalizedLocation.includes(validLocation) || 
      validLocation.includes(normalizedLocation)
    );

    if (!isValidRwandanLocation) {
      setLocationError('Please enter a valid location in Rwanda');
      return false;
    }

    setLocationError('');
    return true;
  };

  // Handle checkout submission
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!startDate || !endDate || !paymentMethod || !validateLocation(pickupLocation)) {
      return;
    }

    // Proceed to confirmation
    router.push(`/confirmation/${car.id}`);
  };

  const rentalDetails = calculateRentalDetails();

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Car Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Car Summary Section */}
          <div className="p-6 bg-gray-50">
            <div className="relative h-64 mb-6">
              <Image 
                src={car.image} 
                alt={`${car.name} ${car.year}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">
              {car.year} {car.name}
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Daily Rate: ${car.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Pickup Location: {pickupLocation || 'Not selected'}</span>
              </div>
              {/* Protection Plan */}
              <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-4 space-y-4">
                  <Shield className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Discounts coming your way</h3>
                    <p className="text-sm text-green-700">
                      After renting 3 cars, you will have access to our discounts
                    </p>
                  </div>
                </div>

            </div>

            {rentalDetails && (
              <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Rental Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Rental Days</span>
                    <span>{rentalDetails.days} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${rentalDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>${rentalDetails.taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-blue-600">
                    <span>Total</span>
                    <span>${rentalDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Checkout Form Section */}
          <div className="p-2">
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                
                {/* Pickup Location */}
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Pickup Location</label>
                  <input 
                    type="text" 
                    placeholder="Enter pickup location in Rwanda"
                    value={pickupLocation}
                    onChange={(e) => {
                      setPickupLocation(e.target.value);
                      validateLocation(e.target.value);
                    }}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      locationError ? 'border-red-500' : ''
                    }`}
                    required 
                  />
                  {locationError && (
                    <p className="text-red-500 text-sm mt-1">{locationError}</p>
                  )}
                </div>

                {/* Location Suggestions */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Suggested Locations:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[...rwandanProvinces, ...rwandanDistricts.slice(0, 6)].map((location) => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => {
                          setPickupLocation(location);
                          validateLocation(location);
                        }}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rental Dates */}
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Rental Dates</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Start Date</label>
                      <input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">End Date</label>
                      <input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required 
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <label className="block mb-2 font-semibold">Payment Method</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Credit Card', 'PayPal', 'Mobile Money'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`
                          flex flex-col items-center justify-center 
                          py-4 border rounded-lg
                          ${paymentMethod === method 
                            ? 'border-blue-600 bg-blue-50 text-blue-600' 
                            : 'border-gray-300 hover:bg-gray-50'}
                        `}
                      >
                        {paymentMethod === method && (
                          <Check className="absolute top-2 right-2 text-blue-600" />
                        )}
                        <CreditCard className="w-6 h-6 mb-2" />
                        <span>{method}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Your full name"
                      className="w-full px-3 py-2 border rounded-lg"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Email</label>
                    <input 
                      type="email" 
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border rounded-lg"
                      required 
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={!startDate || !endDate || !paymentMethod}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg 
                    hover:bg-blue-700 transition
                    disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Complete Reservation
                </button>
              </div>
            </form>
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

export default CheckoutPage;