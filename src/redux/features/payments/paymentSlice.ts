import { PaymentDataProps, PaymentState } from "@/types/payment.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PaymentState = {
  isLoading: false,
  error: null,
  success: false,
  data: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action: PayloadAction<PaymentDataProps | null>) => {
      state.data = action.payload;
    },
    clearPayment: (state) => {
      state.data = null;
      state.error = null;
      state.success = false;
      state.isLoading = false;
    },
  },
});

export const { setPayment, clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
