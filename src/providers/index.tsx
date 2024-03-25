"use client";
import { ToastContainer } from "react-toastify";
import { RainbowProvider } from "./RainbowProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvier } from "@/contexts/ThemeContext";
import { AuthProvier } from "@/contexts/AuthContext";
import IKProvider from "./IKProvider";
import { useLayoutEffect } from "react";
import cookie from "cookie";
import { useRouter } from "next/navigation";

// Create a react query client
const queryClient = new QueryClient({
  defaultOptions: {
    // react query stop refetch when switch browser tabs
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useLayoutEffect(() => {
    const cookies = cookie.parse(window.document.cookie);
    if (!cookies?.accessToken) {
      router.push(`/login`);
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ThemeProvier>
        <RainbowProvider>
          <AuthProvier>
            <IKProvider>
              <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </IKProvider>
          </AuthProvier>
        </RainbowProvider>
      </ThemeProvier>
    </>
  );
}
