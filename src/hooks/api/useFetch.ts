// src/hooks/useFetch.ts
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export function useFetch<T>(
  key: string[],
  url: string,
  headers?: HeadersInit,
  options?: RequestInit
) {
  const { data } = useQuery<T>({
    queryKey: key,
    queryFn: async () => await fetcher<T>(url, { headers, ...options }),
    staleTime: 1000 * 60 * 5, // Cache selama 5 menit
    refetchOnWindowFocus: false, // Tidak refetch saat berpindah tab
  });
  return { data };
}
