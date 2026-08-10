import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./features/auth/authSlice";
import cartSlice from "./features/carts/cartSlice";
import shiftSlice from "./features/shifts/shiftSlice";
import { ordersApi } from "./features/api/ordersApi";
import storage from "@/lib/persistStorage";
import { persistReducer, persistStore } from "redux-persist";
import { usersApi } from "./features/api/usersApi";
import { shiftApi } from "./features/api/shiftsApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart", "shift"],
};

const reducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  shift: shiftSlice,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [shiftApi.reducerPath]: shiftApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // ponytail: redux-persist wraps state as PersistPartial, losing RTK Query's api key
    }).concat(
      ordersApi.middleware as unknown as Middleware,
      usersApi.middleware as unknown as Middleware,
      shiftApi.middleware as unknown as Middleware,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
