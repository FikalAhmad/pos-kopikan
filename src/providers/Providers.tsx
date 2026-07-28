"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import dynamic from "next/dynamic";
import ReactQueryProvider from "./ReactQueryProviders";
import { persistor, store } from "@/redux/store";
import { kopikanLogo } from "@/lib/icons";
import Image from "next/image";
import { AuthProvider } from "./AuthProvider";

const ProvidersComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <PersistGate
          loading={
            <div className="flex-col gap-4 w-full flex items-center justify-center border-2 h-screen">
              <div className="w-28 h-28 animate-bounce flex items-center justify-center">
                <Image src={kopikanLogo} alt="Loading" unoptimized priority />
              </div>
            </div>
          }
          persistor={persistor}
        >
          <AuthProvider>{children}</AuthProvider>
        </PersistGate>
      </ReactQueryProvider>
    </Provider>
  );
};

export const Providers = dynamic(() => Promise.resolve(ProvidersComponent), {
  ssr: false,
});
