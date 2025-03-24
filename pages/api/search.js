// Sample car data - Replace this with your database query
const carsData = [
  {
    id: 1,
    make: "Toyota",
    model: "RAV4",
    year: 2022,
    image: "/images/2019_Toyota_RAV4_LE_2.5L_front_4.14.19.jpg",
    location: "Kigali",
    pricePerDay: 45,
    rating: 4.9,
    trips: 42,
    type: "suv",
    transmission: "automatic",
  },
  {
    id: 2,
    make: "Honda",
    model: "CR-V",
    year: 2021,
    image: "/images/Honda_CR-V_e-HEV_Elegance_AWD_(VI)_–_f_14072024.jpg",
    location: "Kigali",
    pricePerDay: 42,
    rating: 4.8,
    trips: 36,
    type: "suv",
    transmission: "automatic",
  },
  {
    id: 3,
    make: "Jeep",
    model: "Wrangler",
    year: 2020,
    image: "/images/pexels-esmihel-13696704.jpg",
    location: "Musanze",
    pricePerDay: 55,
    rating: 4.7,
    trips: 28,
    type: "suv",
    transmission: "manual",
  },
  {
    id: 4,
    make: "Toyota",
    model: "Land Cruiser",
    year: 2019,
    image: "/images/Toyota Land Cruiser.jpg",
    location: "Kigali",
    pricePerDay: 60,
    rating: 4.9,
    trips: 52,
    type: "suv",
    transmission: "automatic",
  },
  {
    id: 5,
    make: "Hyundai",
    model: "Tucson",
    year: 2021,
    image: "/images/Hyundai-Tucson-2023_12.webp",
    location: "Rubavu",
    pricePerDay: 38,
    rating: 4.6,
    trips: 19,
    type: "suv",
    transmission: "automatic",
  },
  {
    id: 6,
    make: "Nissan",
    model: "X-Trail",
    year: 2020,
    image: "/images/Nissan X-Trail.webp",
    location: "Kigali",
    pricePerDay: 40,
    rating: 4.7,
    trips: 31,
    type: "suv",
    transmission: "automatic",
  },
];

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    location,
    startDate,
    endDate,
    minPrice,
    maxPrice,
    carType,
    transmission,
  } = req.query;

  // Filter cars based on search criteria
  let filteredCars = [...carsData];

  // Filter by location
  if (location) {
    filteredCars = filteredCars.filter((car) =>
      car.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Filter by price range
  if (minPrice && maxPrice) {
    filteredCars = filteredCars.filter(
      (car) =>
        car.pricePerDay >= parseInt(minPrice) &&
        car.pricePerDay <= parseInt(maxPrice)
    );
  }

  // Filter by car type
  if (carType && carType !== "all") {
    filteredCars = filteredCars.filter((car) => car.type === carType);
  }

  // Filter by transmission
  if (transmission && transmission !== "all") {
    filteredCars = filteredCars.filter(
      (car) => car.transmission === transmission
    );
  }

  // In a real application, you would also:
  // 1. Check availability based on startDate and endDate
  // 2. Query a real database
  // 3. Implement pagination
  // 4. Add error handling for invalid dates
  // 5. Add authentication if required
  // 6. Add rate limiting
  // 7. Validate input parameters

  res.status(200).json(filteredCars);
}
