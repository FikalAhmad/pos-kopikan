import { AddCartProps, CartState } from "@/types/cart.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddCartProps>) => {
      const itemInCart = state.cart.find((product) =>
        product.productItem.options.every((opt1) => {
          return action.payload.productItem.options.some(
            (opt2) => opt1.id === opt2.id && opt1.values.id === opt2.values.id
          );
        })
      );
      if (itemInCart) {
        if (action.payload.qty) {
          itemInCart.qty += action.payload.qty;
        } else {
          itemInCart.qty++;
        }
      } else {
        state.cart.push(action.payload);
      }
      state.totalPrice = state.cart.reduce((acc, curr) => {
        // harga dasar produk
        const basePrice = curr.productItem.price;

        // hitung total extra price untuk produk ini
        const extraPrice = curr.productItem.options.reduce(
          (sum, opt) => sum + opt.values.extra_price,
          0
        );

        // total untuk 1 produk (harga dasar + tambahan) * qty
        return acc + curr.qty * (basePrice + extraPrice);
      }, 0);
    },
    increaseQty: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cart.find(
        (product) => product.productItem.id === action.payload.id
      );
      if (item) {
        item.qty += 1;

        state.totalPrice = state.cart.reduce(
          (acc, curr) => acc + curr.qty * curr.productItem.price,
          0
        );
      }
    },
    decreaseQty: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cart.find(
        (product) => product.productItem.id === action.payload.id
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
        state.totalPrice = state.cart.reduce(
          (acc, curr) => acc + curr.qty * curr.productItem.price,
          0
        );
      } else {
        state.cart = state.cart.filter(
          (product) => product.productItem.id !== action.payload.id
        );
        state.totalPrice = state.cart.reduce(
          (acc, curr) => acc + curr.qty * curr.productItem.price,
          0
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
        state.totalPrice = state.cart.reduce(
          (acc, curr) => acc + curr.qty * curr.productItem.price,
          0
        );
      }
    },
    removeAllCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
    },
  },
});
export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeToCart,
  removeAllCart,
} = cartSlice.actions;
export default cartSlice.reducer;
