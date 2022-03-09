import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { AppContextProvider } from "../context/AppContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Quotation - Create a quote NFT on ethereum</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="This is where you can create a one and only quote NFT on the ethereum blockchain" />
        <meta name="keywords" content="NFT, ethereum, quotes, quotation, gift, memory, metamask, mint, trade, opensea" />
      </Head>
      <AppContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </>
  );
}

export default MyApp;
