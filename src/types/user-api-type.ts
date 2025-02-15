export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface QueryOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
  headers?: HeadersInit;
}

export interface MutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  invalidateQueries?: string[];
  headers?: HeadersInit;
  updateCache?: {
    queryKey: string[];
    updater: <TCacheData>(oldData: TCacheData, newData: TData) => TCacheData;
  };
}
