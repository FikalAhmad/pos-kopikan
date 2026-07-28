import { baseQueryWithReauth } from "../baseQueryReauth";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CloseShiftTypes,
  OpenShiftTypes,
  ShiftResponse,
} from "@/types/shift.types";
import { ApiResponse } from "@/types/globals.types";

export const shiftApi = createApi({
  reducerPath: "shiftApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Shift"],
  endpoints: (builder) => ({
    openShift: builder.mutation<ApiResponse<ShiftResponse>, OpenShiftTypes>({
      query: (body) => ({ url: "/shift/open", method: "POST", body }),
      invalidatesTags: ["Shift"],
    }),
    closeShift: builder.mutation<ApiResponse<ShiftResponse>, CloseShiftTypes>({
      query: (body) => ({
        url: `/shift/${body.shift_id}/close`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Shift"],
    }),
  }),
});

export const { useOpenShiftMutation, useCloseShiftMutation } = shiftApi;
