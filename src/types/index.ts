export interface IUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  dietaryPreferences: string[]; // for customers
  cuisineSpecialties: string[]; // for providers
  otp?: string;
  otpExpiredAt?: Date;
  status?: string;
  passwordChangedAt?: Date;
  isDeleted?: boolean;
}

interface IProvider {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: "PROVIDER";
  dietaryPreferences: string[];
  cuisineSpecialties: string[];
  status: "ACTIVE" | "INACTIVE"; // Assuming other possible statuses
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


export interface IMeal {
  _id: string;
  mealProviderId: string;
  name: string;
  description: string;
  image: string;
  ingredients: string[];
  portionSize: string;
  price: number;
  availability: boolean;
  ratings: number;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  totalRatings: number;
}

export interface IOrder {
  _id: string;
  customerId: IUser;
  mealId: IMeal;
  mealProviderId: IProvider;
  amount: number;
  customization?: string;
  schedule: string; // Using string as MongoDB stores dates in ISO format
  deliveryAddress: string;
  status: "PENDING" | "ACCEPTED" | "DELIVERED" | "CANCELLED"; // Enum-like values
  paymentStatus: "PAID" | "PENDING";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  paymentIntentId?: string;
}
