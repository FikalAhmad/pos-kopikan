export interface PaymentDataProps {
  order_id: string;
  payment_date: string;
  amount: number;
  status: string;
  payment_method: string;
  transaction_id?: string;
}

export interface PaymentState {
  isLoading: boolean;
  error: unknown;
  success: boolean;
  data: PaymentDataProps | null;
}
