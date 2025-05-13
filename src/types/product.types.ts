export interface ProductState {
  product: Product[];
  isLoading: boolean;
  error: string | null;
}

export interface Product {
  id: string;
  product_name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  stock: number;
}
