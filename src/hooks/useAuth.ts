import { useMutation } from "@tanstack/react-query";
import { axiosJWT } from "@/lib/axios";
import { setCredentials, logout } from "@/redux/features/auth/authSlice";
import { LoginCredentials, User } from "@/types/auth.types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, error } = useAppSelector(
    (state) => state.auth
  );

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      console.log("Sending login request");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/api/login`,
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
      console.log("Login response:", data);
      // document.cookie = `refreshToken=${data.refreshToken};max-age=${
      //   24 * 60 * 60 * 1000
      // }secure`;
      router.push("/dashboard");
    },
    onError: (error) => {
      dispatch(logout());
      router.push("/");
      console.error(error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosJWT.patch("/api/logout");
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);

      dispatch(logout());
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
