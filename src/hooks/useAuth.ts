"use client";

import { useMutation } from "@tanstack/react-query";
import { setCredentials, logout, setError } from "@/redux/features/auth/authSlice";
import { LoginCredentials, User } from "@/types/auth.types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { removeAllCart } from "@/redux/features/carts/cartSlice";
import { useState } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      dispatch(setError(""));
      setErrorMessage("");
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
      toast("Login has been success!");
      router.push("/dashboard");
    },
    onError: (err: any) => {
      dispatch(logout());
      const message = err.response?.data?.msg || "Email or password is incorrect";
      dispatch(setError(message));
      setErrorMessage(message);
      console.error("Login error:", message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/logout/${user?.id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      dispatch(logout());
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
