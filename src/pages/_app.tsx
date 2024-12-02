import Layout from "@/components/layouts/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/userContext";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient();

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CssBaseline />

        <Layout page={appProps.router.pathname}>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </QueryClientProvider>
  );
}
