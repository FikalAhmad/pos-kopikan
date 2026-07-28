import { fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { logout } from "./auth/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

let isRefreshing = false;

let pendingRequests: Array<() => void> = [];

const waitForRefresh = () =>
  new Promise<void>((resolve) => pendingRequests.push(resolve));

const resolvePending = () => {
  pendingRequests.forEach((resolve) => resolve());
  pendingRequests = [];
};

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (isRefreshing) await waitForRefresh();
  let result = await rawBaseQuery(args, api, extraOptions);
  if (result.error?.status !== 401 && result.error?.status !== 403)
    return result;
  if (isRefreshing) {
    await waitForRefresh();
    return rawBaseQuery(args, api, extraOptions);
  }
  isRefreshing = true;
  const refreshResult = await rawBaseQuery(
    { url: "/api/token", method: "GET" },
    api,
    extraOptions,
  );
  if (refreshResult.data) {
    isRefreshing = false;
    resolvePending();
    result = await rawBaseQuery(args, api, extraOptions);
  } else {
    isRefreshing = false;
    resolvePending();
    api.dispatch(logout());
  }
  return result;
};
