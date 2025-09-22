"use client";

import { useMutation } from "@tanstack/react-query";
import { setCredentials, logout } from "@/redux/features/auth/authSlice";
import { LoginCredentials, User } from "@/types/auth.types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import { useState } from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        credentials,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      const decoded = jwtDecode(data.accessToken) as User;
      dispatch(
        setCredentials({
          user: decoded,
          accessToken: data.accessToken,
        })
      );
      Cookies.set("token", data.refreshToken, {
        expires: 1,
        secure: true,
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.msg);
      } else {
        console.error(error);
      }
      logout();
      router.push("/");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/logout`
        // { refresh_token: accessToken },
        // {
        //   withCredentials: true,
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      return response.data;
    },
    onSuccess: () => {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      logout();
      dispatch(removeAllCart());
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return {
    user,
    isAuthenticated,
    error: errorMessage,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
  };
};
