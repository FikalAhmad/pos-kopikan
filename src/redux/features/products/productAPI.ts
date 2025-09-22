import { useQuery } from "@tanstack/react-query";
import { axiosJWT } from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setDataProduct } from "./productSlice";

export const useProducts = () => {
  const { products, success, error } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const { isSuccess, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosJWT.get("/api/products");
      return response.data.data;
    },
    enabled: products?.length === 0, // hanya fetch kalau redux kosong
    staleTime: 1000 * 60 * 5, // cache 5 menit
    refetchOnWindowFocus: false,
  });

  if (isSuccess) {
    dispatch(setDataProduct({ success: data.success, data: data.data }));
  }

  return {
    products,
    success,
    error,
    data,
  };
};
