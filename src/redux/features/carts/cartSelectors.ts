import { TAX_RATE } from "@/constant/payment";
import { RootState } from "@/redux/store";
import { DiscountProps } from "@/types/discount.types";
import { createSelector } from "@reduxjs/toolkit";

// 1. Base Selectors (Un-memoized & Null-safe)
export const selectTotalPrice = (state: RootState) =>
  state.cart?.totalPrice ?? 0;

// 2. Dynamic Input Extractors
const selectSelectedDiscount = (
  _: RootState,
  selectedDiscount?: DiscountProps | null,
) => selectedDiscount;
const selectTotalCash = (
  _: RootState,
  __?: DiscountProps | null,
  totalCash: number = 0,
) => totalCash;

// 3. Derived Memoized Selectors
export const selectDiscount = createSelector(
  [selectTotalPrice, selectSelectedDiscount],
  (subtotal, selectedDiscount) => {
    if (!selectedDiscount || subtotal <= 0) return 0;

    if (selectedDiscount.type === "PERCENTAGE") {
      let discount = Math.floor((subtotal * selectedDiscount.value) / 100);
      if (
        selectedDiscount.max_discount &&
        discount > selectedDiscount.max_discount
      ) {
        discount = selectedDiscount.max_discount;
      }
      return discount;
    }
    return selectedDiscount.value;
  },
);

export const selectTax = createSelector(
  [selectTotalPrice, selectDiscount],
  (subtotal, discount) => {
    const taxableAmount = Math.max(0, subtotal - discount);
    return Math.floor(taxableAmount * TAX_RATE);
  },
);

export const selectGrandTotal = createSelector(
  [selectTotalPrice, selectDiscount, selectTax],
  (subtotal, discount, tax) => Math.max(0, subtotal - discount + tax),
);

// 4. Combined Result Selector (Single Source of Truth)
export const selectCartTotals = createSelector(
  [
    selectTotalPrice,
    selectDiscount,
    selectTax,
    selectGrandTotal,
    selectTotalCash,
  ],
  (totalPrice, discountValue, taxValue, totalPaymentAfterTax, totalCash) => {
    const totalAfterDiscount = Math.max(0, totalPrice - discountValue);
    const changeAmount = Math.max(0, totalCash - totalPaymentAfterTax);

    return {
      discountValue,
      totalAfterDiscount,
      taxValue,
      totalPaymentAfterTax,
      changeAmount,
    };
  },
);
