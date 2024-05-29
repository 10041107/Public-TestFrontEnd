import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "../client/base";
import SeoHead from "../components/seo-head";
import Spinner from "../components/Spinner";
import twitterStyles from '../styles/Twitter.module.css';
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Rollbar from 'rollbar';

export default function App({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENV !== 'development') {
      const rollbar = new Rollbar({
        accessToken: 'YOUR_ACCESS_TOKEN',
        captureUncaught: true,
        captureUnhandledRejections: true,
      });
      window.rollbar = rollbar;

      const rollbarScript = document.createElement('script');
      rollbarScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/rollbar.js/2.11.0/rollbar.min.js';
      rollbarScript.async = true;
      document.body.appendChild(rollbarScript);

      return () => {
        document.body.removeChild(rollbarScript);
      };
    }
  }, []);

  const isTwitterPage = router.pathname === '/twitter';

  return (
    <>
      <SeoHead />
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#63489a",
            colorLink: "#63489a",
            colorLinkHover: "#7f68a6",
          },
        }}
        locale={koKR}
      >
        <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
          <QueryClientProvider client={queryClient}>
            {loading ? (
              <Spinner />
            ) : (
              <main className={`font-sans ${isTwitterPage ? twitterStyles.twitterPage : ''}`}>
                <Component {...pageProps} />
              </main>
            )}
          </QueryClientProvider>
        </SWRConfig>
      </ConfigProvider>
    </>
  );
}
