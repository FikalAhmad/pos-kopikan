import { IS_ADMIN } from "@/constant/roles";
import { logout, setCredentials } from "@/redux/features/auth/authSlice";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import { RootState } from "@/redux/store";
import { User } from "@/types/auth.types";
import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

let store: Store<RootState>;
export const injectStore = (_store: Store<RootState>) => {
  store = _store;
};

export const axiosPublic = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosJWT = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const clearAuthSession = (redirect = true) => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  if (store) {
    store.dispatch(logout());
    store.dispatch(removeAllCart({ silent: true }));
  }
  if (redirect && typeof window !== "undefined") {
    window.location.href = "/logins";
  }
};

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await axios.get(`${baseURL}/api/token`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { accessToken } = response.data;
      const decoded = jwtDecode(accessToken) as User;

      if (store) {
        store.dispatch(
          setCredentials({
            user: decoded,
            accessToken,
          }),
        );
      }

      if (decoded.role_id !== IS_ADMIN) {
        clearAuthSession();
        return null;
      }

      return accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      clearAuthSession();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

axiosJWT.interceptors.request.use(
  async (config) => {
    if (!store) return config;

    const state = store.getState();
    const { accessToken } = state.auth;

    if (accessToken) {
      const decoded = jwtDecode(accessToken) as User;
      // 10-second buffer check before actual expiration
      if (decoded.exp * 1000 - 10000 < Date.now()) {
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            config.headers.Authorization = `Bearer ${newToken}`;
          } else {
            return Promise.reject(
              new Error("Session expired, redirecting to login..."),
            );
          }
        } catch (error) {
          console.error("Failed to refresh token:", error);
          return Promise.reject(error);
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor response to handle unauthorized responses
axiosJWT.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request, logging out...");
      clearAuthSession();
    }
    return Promise.reject(error);
  },
);
