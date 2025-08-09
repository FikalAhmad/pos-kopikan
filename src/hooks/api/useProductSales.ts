import { axiosJWT } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useProductSales = () => {
  const { data } = useQuery({
    queryKey: ["filterproducts"],
    queryFn: async () => {
      const response = await axiosJWT.get(`/api/products`);
      return response?.data;
    },
    staleTime: 1000 * 60 * 5, // Cache selama 5 menit
    refetchOnWindowFocus: false, // Tidak refetch saat berpindah tab
  });

  return data;
};
