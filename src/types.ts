export enum CuisineType {
  INDIAN = "Indian",
  CHINESE = "Chinese",
  ITALIAN = "Italian",
  STREET_FOOD = "Street Food",
  FINE_DINING = "Fine Dining",
  CASUAL = "Casual Dining",
  SOUTH_INDIAN = "South Indian",
  NORTH_INDIAN = "North Indian",
  MUGHLAI = "Mughlai",
  SEAFOOD = "Seafood",
  CONTINENTAL = "Continental",
}

export enum Category {
  STARTER = "Starter",
  MAIN_COURSE = "Main Course",
  DESSERT = "Dessert",
  BEVERAGE = "Beverage",
  STREET_FOOD = "Street Food",
}

export enum PriceCategory {
  CHEAP = "₹",
  MODERATE = "₹₹",
  EXPENSIVE = "₹₹₹",
  LUXURY = "₹₹₹₹",
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  description: string;
  rating: number;
  isPopular?: boolean;
  reviews: Review[];
}

export interface Restaurant {
  id: string;
  name: string;
  city: string;
  location: string;
  rating: number;
  cuisine: CuisineType[];
  image: string;
  history: string;
  trustScore: number;
  authenticityScore: number;
  priceCategory: PriceCategory;
  description: string;
  menu: Dish[];
  popularDishId: string;
  reviews: Review[];
}

export interface UserProfile {
  name: string;
  preferences: CuisineType[];
  budget: PriceCategory;
  history: string[]; // Restaurant IDs
}
