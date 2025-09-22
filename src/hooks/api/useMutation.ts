// src/hooks/useMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { axiosJWT } from "@/lib/axios";

type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

export function useMutatePost<T>(
  key: string[],
  url: string,
  method: MutationMethod,
  headers?: HeadersInit,
  options?: RequestInit
) {
  const queryClient = useQueryClient();

  return useMutation<T, Error, unknown>({
    mutationFn: (data) => {
      axiosJWT.
    }
  
    })
  }