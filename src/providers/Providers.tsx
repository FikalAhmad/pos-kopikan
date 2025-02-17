"use client";

import { Provider } from "react-redux";
import ReactQueryProvider from "./ReactQueryProviders";
import { store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export function Providers({ children }: { children: React.ReactNode }) {
  const persister = persistStore(store);
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <PersistGate persistor={persister}>{children}</PersistGate>
      </ReactQueryProvider>
    </Provider>
  );
}
