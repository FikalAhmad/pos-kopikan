"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { axiosPublic, axiosJWT } from "@/lib/axios";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (user) {
      setReady(true);
      return;
    }

    const initializeAuth = async () => {
      try {
        // ponytail: refresh dulu, baru fetch profile — supaya semua request setelahnya pakai cookie baru
        await axiosPublic.get("/api/token");
        const userProfile = await axiosJWT.get("/api/me");
        dispatch(setCredentials({ user: userProfile.data.data }));
      } catch {
        // No active session — user will be redirected to login by route guard
      } finally {
        setReady(true);
      }
    };

    initializeAuth();
  }, [dispatch, user]);

  if (!ready) return null;

  return <>{children}</>;
}

