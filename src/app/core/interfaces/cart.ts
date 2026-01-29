import { Product } from './product';

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
  color?: string;
}

export interface Cartt {
  _id: string;
  cartItems: CartItem[];
  totalCartPrice: number;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
