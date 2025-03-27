// types/carTypes.ts or types/car.ts
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
}
