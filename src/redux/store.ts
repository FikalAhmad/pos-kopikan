import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";

import authSlice from "./features/auth/authSlice";
import productSlice from "./features/products/productSlice";
import cartSlice from "./features/carts/cartSlice";
import orderSlice from "./features/orders/orderSlice";
import paymentSlice from "./features/payments/paymentSlice";
import { injectStore } from "@/lib/axios";
import storage from "@/lib/persistStorage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage: localStorageAdapter,
  // whitelist: ["auth", "cart", "product", "order"], // hanya simpan data penting
};

/**
 * Root reducer
 */
const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  product: productSlice,
  order: orderSlice,
  payment: paymentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Store setup
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

injectStore(store);

/**
 * Types
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * Typed Hooks
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
