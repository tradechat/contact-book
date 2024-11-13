import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  console.log(appProps.router.pathname);

  return (
    <Layout page={appProps.router.pathname}>
      <Component {...pageProps} />
    </Layout>
  );
}
