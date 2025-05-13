import { useMutation } from "@tanstack/react-query";
import { axiosJWT } from "@/lib/axios";
import { setCredentials, logout } from "@/redux/features/auth/authSlice";
import { LoginCredentials, User } from "@/types/auth.types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, error } = useAppSelector(
    (state) => state.auth
  );

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
      logout();
      router.push("/");
      console.error(error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosJWT.patch("/api/logout");
      return response.data;
    },
    onSuccess: () => {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      logout();
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
