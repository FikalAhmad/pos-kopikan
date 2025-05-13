import { Cart, CartState } from "@/types/checkoutFlow.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "checkoutFlow/createOrder"
  // fetchProducts
);

const initialState: CartState = {
  cart: [],
};
// kalau dah ke beli stocknya kurangin di BE
const checkoutFlowSlice = createSlice({
  name: "checkoutFlow",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cart>) => {
      const itemInCart = state.cart.find(
        (product) => product.productItem.id === action.payload.productItem.id
      );
      if (itemInCart) {
        itemInCart.qty++;
      } else {
        state.cart.push(action.payload);
      }
    },
    increaseQty: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cart.find(
        (product) => product.productItem.id === action.payload.id
      );
      if (item) {
        item.qty += 1;
      }
      //  else {
      //   state.cart = state.cart.filter(
      //     (product) => product.productItem.id !== action.payload.id
      //   );
      // }
    },
    decreaseQty: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cart.find(
        (product) => product.productItem.id === action.payload.id
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else {
        state.cart = state.cart.filter(
          (product) => product.productItem.id !== action.payload.id
        );
      }
    },
    removeToCart: (state, action: PayloadAction<{ id: string }>) => {
      const itemInCart = state.cart.find(
        (item) => item.productItem.id === action.payload.id
      );
      if (itemInCart) {
        state.cart = state.cart.filter(
          (item) => item.productItem.id !== action.payload.id
        );
      }
    },
    removeAllCart: (state) => {
      state.cart = [];
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getProducts.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(getProducts.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.product = action.payload;
  //     })
  //     .addCase(getProducts.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.error.message ?? null;
  //     });
  // },
});
export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeToCart,
  removeAllCart,
} = checkoutFlowSlice.actions;
export default checkoutFlowSlice.reducer;
