import { ProductState, ProductWithOption } from "@/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductState = {
  products: [],
  success: false,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (
      state,
      action: PayloadAction<{ success: boolean; data: ProductWithOption[] }>
    ) => {
      const { success, data } = action.payload;
      state.success = success;
      state.products = data;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});
export const { setDataProduct, setError } = productSlice.actions;
export default productSlice.reducer;
