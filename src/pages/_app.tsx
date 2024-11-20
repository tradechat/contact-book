import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  console.log(appProps.router.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout page={appProps.router.pathname}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
