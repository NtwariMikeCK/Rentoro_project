export interface Car {
  id: number;
  model: string;
  make: string;
  name: string;
  year: number;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  transmission: string;
  features: string[];
}

interface Owner {
  id: string;
  email: string;
  firstName: string;
  picture: string;
  createdAt: string;
}

export interface CarDataType {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  dailyRate: number;
  isAvailable: boolean;
  isValidated: boolean;
  location: string;
  description: string;
  ownerId: string;
  updatedAt: string;
  imageUrls: string[];
  owner: Owner;
}

export interface User {
  firstName: string;
  lastName: string;
  picture: string;
  roles: string[];
}

export type RentalRequest = {
  id: string;
  clientId: string;
  carId: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
  totalCost: string;
  createdAt: string;
  updatedAt: string;
  car: Car;
  client: Client;
};

export type Client = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  isEmailVerified: boolean;
  roles: ("user" | "admin")[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserRequest = {
  id: string;
  clientId: string;
  carId: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  totalCost: string;
  createdAt: string;
  updatedAt: string;
  car: CarDataType;
};
