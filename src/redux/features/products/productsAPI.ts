import { useQuery } from "@tanstack/react-query";
import { axiosJWT } from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setDataProduct } from "./productSlice";

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { product, error } = useAppSelector((state) => state.product);

  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosJWT.get("/api/products");
      dispatch(setDataProduct(response.data));
      return response.data;
    },
    enabled: product.length === 0,
  });

  return {
    product,
    error,
  };
};
