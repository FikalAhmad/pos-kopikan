import { ProductWithOption } from "./product.types";

export interface OrderDataRequest {
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

export interface PaymentData {
  id: string;
  order_id: string;
  amount: number;
  status: string;
  payment_method: string;
  midtrans_order_id?: string;
  qr_url?: string;
  expiry_time: string;
  refunded_amount?: number;
  refund_reason?: string;
  createdAt: string;
}
export interface PaymentDataResponse {
  data: PaymentData;
  success: boolean;
}

export interface OrderData {
  id: string;
  customer_name: string | null;
  createdAt: Date;
  status: string;
  order_number: string;
  table_id: string | null;
  shift_id: string | null;
  order_source: string;
  order_type: string;
  total: number;
}

export interface OrderDataResponse {
  data: OrderData[];
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

export interface TrackOrderResponse {
  id: string;
  customer_name: string | null;
  createdAt: Date;
  status: string;
  order_number: string;
  table_id: string | null;
  order_details: OrderDetailResponse[];
  table: {
    table_number: string;
    is_active: boolean;
  } | null;
  shift_id: string | null;
  order_source: string;
  order_type: string;
  total: number;
}
export interface TableResponse {
  id: string;
  table_number: string;
  qr_token: string;
  is_active: boolean;
  createdAt: string;
}
