import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryReauth";
import { CreateUserRequest, UserResponse } from "@/types/user.types";
import { ApiResponse } from "@/types/globals.types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    createUser: builder.mutation<UserResponse, CreateUserRequest>({
      query: (userData) => ({
        url: "/api/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
    getAllUsers: builder.query<ApiResponse<UserResponse[]>, void>({
      query: () => "/api/users",
      providesTags: ["Users"],
    }),
    getUser: builder.query<UserResponse, string>({
      query: (id) => `/api/users/${id}`,
    }),
  }),
});

export const { useCreateUserMutation, useGetAllUsersQuery, useGetUserQuery } =
  usersApi;
