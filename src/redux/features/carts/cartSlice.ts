import { AddCartProps, CartState } from "@/types/cart.types";
import { ProductItemCartProps } from "@/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddCartProps>) => {
      const itemInCart = state.cart.find((product) => {
        if (product.productItem.id !== action.payload.productItem.id)
          return false;
        if (
          product.productItem.options.length !==
          action.payload.productItem.options.length
        )
          return false;
        return product.productItem.options.every((opt1) =>
          action.payload.productItem.options.some(
            (opt2) => opt1.id === opt2.id && opt1.values.id === opt2.values.id
          )
        );
      });

      if (itemInCart) {
        if (action.payload.qty) {
          itemInCart.qty += action.payload.qty;
        }
      } else {
        state.cart.push(action.payload);
      }
      toast.success("Added to cart", {
        description: `${action.payload.productItem.product_name} has been successfully added.`,
      });

      state.totalPrice = state.cart.reduce((acc, curr) => {
        const basePrice = curr.productItem.price;
        const extraPrice = curr.productItem.options.reduce(
          (sum, opt) => sum + opt.values.extra_price,
          0
        );
        return acc + curr.qty * (basePrice + extraPrice);
      }, 0);
    },
    increaseQty: (state, action: PayloadAction<ProductItemCartProps>) => {
      const itemInCart = state.cart.find((product) => {
        if (product.productItem.id !== action.payload.id) return false;
        if (
          product.productItem.options.length !== action.payload.options.length
        )
          return false;
        return product.productItem.options.every((opt1) =>
          action.payload.options.some(
            (opt2) => opt1.id === opt2.id && opt1.values.id === opt2.values.id
          )
        );
      });
      if (itemInCart) {
        itemInCart.qty += 1;

        state.totalPrice = state.cart.reduce((acc, curr) => {
          const basePrice = curr.productItem.price;
          const extraPrice = curr.productItem.options.reduce(
            (sum, opt) => sum + opt.values.extra_price,
            0
          );
          return acc + curr.qty * (basePrice + extraPrice);
        }, 0);
      }
    },
    decreaseQty: (state, action: PayloadAction<ProductItemCartProps>) => {
      const itemInCart = state.cart.find((product) => {
        if (product.productItem.id !== action.payload.id) return false;
        if (
          product.productItem.options.length !== action.payload.options.length
        )
          return false;
        return product.productItem.options.every((opt1) =>
          action.payload.options.some(
            (opt2) => opt1.id === opt2.id && opt1.values.id === opt2.values.id
          )
        );
      });
      if (itemInCart && itemInCart.qty > 1) {
        itemInCart.qty -= 1;
        state.totalPrice = state.cart.reduce(
          (acc, curr) => acc + curr.qty * curr.productItem.price,
          0
        );
      } else {
        state.cart = state.cart.filter((item) => {
          if (item.productItem.id !== action.payload.id) return true;

          if (item.productItem.options.length !== action.payload.options.length)
            return true;

          const isSameOptions = item.productItem.options.every((opt1) =>
            action.payload.options.some(
              (opt2) => opt1.id === opt2.id && opt1.values.id === opt2.values.id
            )
          );

          return !isSameOptions;
        });
        toast.info("Removed from cart");
        state.totalPrice = state.cart.reduce(
          (acc, curr) => acc + curr.qty * curr.productItem.price,
          0
        );
      }
    },
    removeToCart: (state, action: PayloadAction<ProductItemCartProps>) => {
      state.cart = state.cart.filter((item) => {
        if (item.productItem.id !== action.payload.id) return true;

        if (item.productItem.options.length !== action.payload.options.length)
          return true;

        const isSameOptions = item.productItem.options.every((opt1) =>
          action.payload.options.some(
            (opt2) => opt1.id === opt2.id && opt1.values.id === opt2.values.id
          )
        );

        return !isSameOptions;
      });
      toast.info("Removed from cart");

      state.totalPrice = state.cart.reduce(
        (acc, curr) => acc + curr.qty * curr.productItem.price,
        0
      );
    },

    removeAllCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
      toast.info("All products removed from cart");
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
