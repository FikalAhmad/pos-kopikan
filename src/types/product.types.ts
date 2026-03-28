export interface ProductState {
  products: ProductWithOption[];
  success: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ProductOptionValue {
  id: string;
  label: string;
  extra_price: number;
}

export interface ProductOption {
  id: string;
  name: string;
  values: ProductOptionValue[];
}

export interface ProductWithOption {
  id: string;
  product_name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  options: ProductOption[];
}

export interface ProductItemCartProps {
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
}
