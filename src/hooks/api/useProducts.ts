import { useQuery } from "@tanstack/react-query";
import { axiosJWT } from "@/lib/axios";
import { ProductWithOption } from "@/types/product.types";

export const useProducts = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosJWT.get("/api/products?pageSize=50");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Cache aman selama 5 menit
    refetchOnWindowFocus: false,
  });

  return {
    products: query.data?.data as ProductWithOption[] | undefined,
    success: query.data?.success || false,
    ...query,
  };
};
