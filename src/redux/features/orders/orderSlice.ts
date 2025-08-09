import { axiosJWT } from "@/lib/axios";
import { OrderDataProps, OrderState } from "@/types/order.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "checkoutFlow/createOrder",
  async (orderData: OrderDataProps, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.post("/api/orders", orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: OrderState = {
  isLoading: false,
  error: null,
  success: false,
  dataOrder: null,
};

// kalau dah ke beli stocknya kurangin di BE
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.dataOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { resetStatus } = orderSlice.actions;
export default orderSlice.reducer;
