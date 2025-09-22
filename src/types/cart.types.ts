import { ProductItemCartProps } from "./product.types";

export interface CartState {
  cart: CartDataProps[];
  totalPrice: number;
}

export interface CartDataProps {
  productItem: ProductItemCartProps;
  qty: number;
}

export interface AddCartProps {
  productItem: {
    id: string;
    product_name: string;
    image: string;
    category: string;
    description: string;
    price: number;
    options: {
      id: string;
      name: string;
      values: {
        id: string;
        label: string;
        extra_price: number;
      };
    }[];
  };
  qty: number;
}
