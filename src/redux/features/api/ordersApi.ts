import {
  OrderData,
  OrderDataRequest,
  OrderDataResponse,
  PaymentDataResponse,
  TrackOrderResponse,
} from "@/types/order.type";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryReauth";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<PaymentDataResponse, OrderDataRequest>({
      query: (orderData) => ({
        url: "/api/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query<OrderData, void>({
      query: () => "/api/orders",
      providesTags: ["Orders"],
    }),
    getOrder: builder.query<OrderDataResponse, string>({
      query: (id) => `/api/orders/${id}`,
    }),
    getTrackOrder: builder.query<{ data: TrackOrderResponse[] }, void>({
      query: () => "/api/trackorder",
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/api/orders/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useGetTrackOrderQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;
