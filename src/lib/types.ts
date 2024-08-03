export interface Dessert {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
}

export interface Cart {
  id: string;
  dessert: Dessert;
  amount: number;
}
