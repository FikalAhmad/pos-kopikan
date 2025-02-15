"use client";

import { Provider } from "react-redux";
import ReactQueryProvider from "./ReactQueryProviders";
import { store } from "@/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </Provider>
  );
}
