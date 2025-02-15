import { logout, setCredentials } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { User } from "@/types/auth.types";
import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL = process.env.NEXT_PUBLIC_USER_API_URL;

let store: Store<RootState>;
export const injectStore = (_store: Store<RootState>) => {
  store = _store;
};

export const axiosJWT = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Fungsi untuk memperbarui token
const refreshAccessToken = async () => {
  try {
    const response = await axios.get(`${baseURL}/token`, {
      withCredentials: true,
    });
    const decoded = jwtDecode(response.data.accessToken) as User;

    // Perbarui state Redux
    store.dispatch(
      setCredentials({
        user: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          exp: decoded.exp,
        },
        accessToken: response.data.accessToken,
      })
    );

    return response.data.accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    store.dispatch(logout());
    window.location.href = "/";
    return null;
  }
};

// Interceptor request
axiosJWT.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    let { accessToken } = state.auth;

    if (accessToken) {
      const decoded = jwtDecode(accessToken) as User;

      // Jika token sudah expired, coba refresh
      if (decoded.exp * 1000 < Date.now()) {
        accessToken = await refreshAccessToken();
      }

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor response untuk menangani logout jika token expired
axiosJWT.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request, logging out...");
      store.dispatch(logout());
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
