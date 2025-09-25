"use client";

import { axiosJWT } from "@/lib/axios";
import { setPayment } from "@/redux/features/payments/paymentSlice";
import { useAppDispatch } from "@/redux/store";
import { useState } from "react";

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const payWithCash = async (
    orderId: string,
    amount: number,
    discounts: string[]
  ) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosJWT.post("/api/payments", {
        order_id: orderId,
        amount,
        payment_method: "CASH",
        discounts,
      });

      const data = await res.data;
      dispatch(setPayment(data));
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Caught an Error:" + error.message);
      } else {
        setError("Caught an unknown error:" + error);
      }
    } finally {
      setLoading(false);
    }
  };

  const payWithEWallet = async (
    orderId: string,
    amount: number,
    paymentMethod: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosJWT.post("/api/payments/ewallet", {
        order_id: orderId,
        amount,
        customer_name: "Cashier",
        customer_email: "cashier@kopikan.com",
        payment_method: paymentMethod,
      });

      const data = await res.data;
      dispatch(
        setPayment({
          status: "PENDING",
          order_id: orderId,
          payment_method: paymentMethod.toUpperCase(),
          amount: amount,
          qrUrl: data.actions?.find(
            (a: { name: string }) => a.name === "generate-qr-code"
          )?.url,
        })
      );

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Caught an Error:" + error.message);
      } else {
        setError("Caught an unknown error:" + error);
      }
    } finally {
      setLoading(false);
    }
  };

  // const checkStatus = async (orderId: string) => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const res = await fetch(`/api/payment/status/${orderId}`);
  //     const data = await res.json();
  //     setPayment(data);
  //     return data;
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       setError("Caught an Error:" + error.message);
  //     } else {
  //       setError("Caught an unknown error:" + error);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return {
    loading,
    error,
    payWithCash,
    payWithEWallet,
    // checkStatus,
  };
};
