import { axiosJWT } from "@/lib/axios";

import { PaymentDataProps, PaymentState } from "@/types/payment.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const createPayment = createAsyncThunk(
  "checkoutFlow/createPayment",
  async (paymentData: PaymentDataProps, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.post("/api/payments", paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
    setPayment: (
      state,
      action: PayloadAction<{
        order_id: string;
        status: string;
        payment_method: string;
        transaction_id?: string;
        amount: number;
        qrUrl?: string;
      }>
    ) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.data = null;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
