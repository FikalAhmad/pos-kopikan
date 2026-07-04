"use client";

import { axiosJWT, axiosPublic, clearAuthSession } from "@/lib/axios";
import {
  logout,
  setCredentials,
  setError,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { LoginCredentials, User } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, error } = useAppSelector((state) => state.auth);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      dispatch(setError(""));
      const response = await axiosPublic.post("/api/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      const decoded = jwtDecode(data.accessToken) as User;
      dispatch(
        setCredentials({
          user: decoded,
          accessToken: data.accessToken,
        }),
      );
      Cookies.set("token", data.refreshToken, {
        expires: 1,
        secure: true,
      });
      toast("Login has been success!");
      router.push("/dashboard");
    },
    onError: (err: { response?: { data?: { msg?: string } } }) => {
      dispatch(logout());
      const message =
        err.response?.data?.msg || "Email or password is incorrect";
      dispatch(setError(message));
      console.error("Login error:", message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // logout endpoint typically benefits from authorized JWT interceptor
      const response = await axiosJWT.patch(`/api/logout/${user?.id}`);
      return response.data;
    },
    onSuccess: () => {
      clearAuthSession(false);
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return {
    user,
    isAuthenticated,
    error,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
  };
};

