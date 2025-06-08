export interface PaymentDataProps {
  order_id: string;
  amount: number;
  status: string;
  payment_method: string;
}

export interface PaymentState {
  isLoading: boolean;
  error: unknown;
  success: boolean;
  data: PaymentDataProps | null;
}
