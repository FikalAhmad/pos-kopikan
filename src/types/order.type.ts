export interface OrderDataProps {
  customer_id: string;
  order_type: string;
  order_source: string;
  delivery_address?: string;
  order_items: {
    product_id: string;
    qty: number;
  }[];
  total: number;
  status: string;
}

export interface OrderState {
  isLoading: boolean;
  error: unknown;
  success: boolean;
  data: OrderDataProps | null;
}
