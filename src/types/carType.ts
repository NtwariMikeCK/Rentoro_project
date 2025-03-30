export interface Car {
  id: number;
  name: string;
  year: number;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  transmission:  string,
  features: string[];
}

interface Owner {
  id:string,
  email:string,
  firstName: string,
  picture: string,
  createdAt: string,
}

export interface CarDataType{
  id: string,
  make:string,
  model: string,
  year: number,
  licensePlate: string,
  color: string,
  dailyRate: number,
  isAvailable: boolean,
  isValidated: boolean,
  location: string,
  description: string,
  ownerId: string,
  updatedAt: string,
  imageUrls: string[],
  owner: Owner
}

export interface User {
  firstName: string;
  lastName: string;
  picture: string;
  roles: string[];
}
