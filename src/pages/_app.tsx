import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR"; // antd 디자인의 한국어 로케일 설정
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr"; // SWR 설정
import { fetcher } from "../client/base"; // 데이터 패칭 함수
import SeoHead from "../components/seo-head"; // SEO 최적화를 위한 컴포넌트
import twitterStyles from '../styles/Twitter.module.css'; // Twitter 페이지 전용 스타일
import "../styles/globals.css"; // 전역 스타일 시트
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const body = document.querySelector('body');
    const html = document.querySelector('html');

    if (router.pathname === '/login') {
      body?.classList.add('login-page'); // 로그인 페이지에 특정 클래스 추가
      html?.classList.add('login-page');
    } else {
      body?.classList.remove('login-page'); // 다른 페이지에서 클래스 제거
      html?.classList.remove('login-page');
    }
  }, [router.pathname]);

  const isTwitterPage = router.pathname === '/twitter'; // 현재 페이지가 Twitter 페이지인지 확인

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
            colorPrimary: "#63489a", // 주 색상
            colorLink: "#63489a", // 링크 색상
            colorLinkHover: "#7f68a6", // 링크 호버 색상
          },
        }}
        locale={koKR}
      >
        <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
          <QueryClientProvider client={queryClient}>
            <main className={`font-sans ${isTwitterPage ? twitterStyles.twitterPage : ''}`}>
              <Component {...pageProps} />
            </main>
          </QueryClientProvider>
        </SWRConfig>
      </ConfigProvider>
    </>
  );
}
