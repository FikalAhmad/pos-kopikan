import { useQuery } from "@tanstack/react-query";
import { axiosJWT } from "@/lib/axios";

export function useFetch(key: string[], url: string) {
  const { data, ...rest } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await axiosJWT.get(url);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Cache selama 5 menit
    refetchOnWindowFocus: false, // Tidak refetch saat berpindah tab
  });
  return { data, ...rest };
}
