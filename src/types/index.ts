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
}
