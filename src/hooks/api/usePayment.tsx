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

      if (res) {
        dispatch(setPayment(res.data.data));
      }
      return await res.data.data;
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
      if (res.data) {
        console.log(res.data);

        dispatch(
          setPayment({
            order_id: res.data.order_id,
            status: "PENDING",
            payment_method: paymentMethod,
            amount: res.data.gross_amount,
            qrUrl: res.data.actions[0].url,
          })
        );
      }
      return await res.data;
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
