import { Product } from "./product.types";

export interface CartState {
  cart: CartDataProps[];
  totalPrice: number;
}

export interface CartDataProps {
  productItem: Product;
  qty: number;
}
