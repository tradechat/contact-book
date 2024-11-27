import Layout from "@/components/layouts/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout page={appProps.router.pathname}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
