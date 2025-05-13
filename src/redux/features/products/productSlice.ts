import { Product, ProductState } from "@/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductState = {
  product: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});
export const { setDataProduct, setError } = productSlice.actions;
export default productSlice.reducer;
