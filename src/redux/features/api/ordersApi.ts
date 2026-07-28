import {
  OrderDataProps,
  OrderDataResponse,
  OrderState,
} from "@/types/order.type";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryReauth";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderState, OrderDataProps>({
      query: (orderData) => ({
        url: "/api/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query<OrderState, void>({
      query: () => "/api/orders",
      providesTags: ["Orders"],
    }),
    getOrder: builder.query<OrderDataResponse, string>({
      query: (id) => `/api/orders/${id}`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderQuery,
} = ordersApi;
