import React, { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/store";

// React Query client khusus untuk testing (cache aman dan isolate)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

// Gabungkan semua provider
interface ProvidersProps {
  children: ReactNode;
}

const AllProviders = ({ children }: ProvidersProps) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Provider>
);

// Custom render dengan AllProviders
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllProviders, ...options });

// Export semua fungsi bawaan RTL + custom render
export * from "@testing-library/react";
export { customRender as render };
