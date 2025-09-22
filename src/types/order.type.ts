import { ProductWithOption } from "./product.types";

export interface OrderDataProps {
  customer_id: string;
  order_source: string;
  delivery_address?: string;
  order_items: {
    product_id: string;
    qty: number;
    options: {
      id: string;
      name: string;
      values: {
        id: string;
        label: string;
        extra_price: number;
      };
    }[];
  }[];
}

export interface OrderDataResponse {
  id: string;
  customer_id: string;
  order_date: string;
  order_type: string;
  order_source: string;
  delivery_address?: string;
  order_details: OrderDetailResponse[];
  total: number;
  status: string;
  createdAt: string;
}

export interface OrderState {
  isLoading: boolean;
  error: unknown;
  success: boolean;
  dataOrder: { data: OrderDataResponse } | null;
}

export interface OrderDetailResponse {
  id: string;
  order_id: string;
  product_id: string;
  product: ProductWithOption;
  qty: number;
  total_price: number;
  unit_price: number;
}
