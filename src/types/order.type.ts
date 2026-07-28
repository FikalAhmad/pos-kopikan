import { ProductWithOption } from "./product.types";

export interface OrderDataProps {
  customer_name?: string;
  table_id?: string;
  shift_id?: string;
  order_source: string;
  order_type: string;
  total: number;
  payment_method: string;
  discounts?: string[];
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
  customer_name: string;
  order_date: string;
  order_number: string;
  order_source: string;
  order_type: string;
  shift_id?: string;
  table_id?: string;
  order_details: OrderDetailResponse[];
  total: number;
  status: string;
  createdAt: string;
}

export interface OrderState {
  data: OrderDataResponse[];
  success: boolean;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface OrderDetailResponse {
  id: string;
  product_id: string;
  product: Omit<ProductWithOption, "options">;
  options: {
    optionValue: {
      id: string;
      createdAt: Date;
      option_id: string;
      label: string;
      extra_price: number;
      option: {
        id: string;
        createdAt: Date;
        product_id: string;
        name: string;
      };
    };
  }[];
  qty: number;
  total_price: number;
  unit_price: number;
}

export interface TableResponse {
  id: string;
  table_number: string;
  qr_token: string;
  is_active: boolean;
  createdAt: string;
}
