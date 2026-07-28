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

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role_id: string;
};

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role_id: string;
  createdAt: Date;
  role: {
    role_name: string;
  };
};
