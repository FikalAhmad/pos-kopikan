// src/hooks/useMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

export function useMutate<T>(
  key: string[],
  url: string,
  method: MutationMethod,
  headers?: HeadersInit,
  options?: RequestInit
) {
  const queryClient = useQueryClient();

  return useMutation<T, Error, unknown>({
    mutationFn: (data) =>
      fetcher<T>(url, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(data),
        ...options,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key }); // Refresh cache setelah perubahan
    },
  });
}
