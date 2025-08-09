import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import { injectStore } from "@/lib/axios";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authSlice from "./features/auth/authSlice";
import productSlice from "./features/products/productSlice";
import cartSlice from "./features/carts/cartSlice";
import orderSlice from "./features/orders/orderSlice";
import paymentSlice from "./features/payments/paymentSlice";

// Create a safe storage that works on both client and server
const createNoopStorage = () => {
  return {
    getItem(): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(): Promise<void> {
      return Promise.resolve();
    },
    removeItem(): Promise<void> {
      return Promise.resolve();
    },
  };
};

// Use safe storage - localStorage on client, noop on server
const safeStorage =
  typeof window !== "undefined" ? storage : createNoopStorage();

const persistConfig = {
  key: "root",
  version: 1,
  storage: safeStorage,
};

const reducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  cart: cartSlice,
  order: orderSlice,
  payment: paymentSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
