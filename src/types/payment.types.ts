export interface PaymentDataProps {
  order_id: string;
  status: string;
  payment_method: string;
  amount: number;
  qrUrl?: string;
}

export interface PaymentState {
  isLoading: boolean;
  error: unknown;
  success: boolean;
  data: PaymentDataProps | null;
}
