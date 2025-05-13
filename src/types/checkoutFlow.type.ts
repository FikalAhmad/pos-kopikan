import { Product } from "./product.types";

export interface CartState {
  cart: Cart[];
}

export interface Cart {
  productItem: Product;
  qty: number;
}

export interface OrderState {
  id: string;
}

export interface PaymentState {
  id: string;
}
