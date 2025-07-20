import React, { useEffect } from 'react';
import { AppProps } from 'next/app';

import Layout from '../shared/layout';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  removeCartItmes,
  removeSelectedProduct,
} from '../stores/cart/cart-action';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
// import CookieBanner from '../components/CookieBanner/CookieBanner';

// Client-side cache, shared for the whole session of the user in the browser.

interface MyAppProps extends AppProps {}
const theme = {
  // Your theme properties
};

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  // eslint-disable-next-line no-undef
  const googleClientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const router = useRouter();

  useEffect(() => {
    const handleBeforeHistoryChange = (url) => {
      if (!url.includes('/checkout')) {
        removeSelectedProduct();
      }
    };

    const handleRouteChangeComplete = (url) => {
      // Check if the current URL does not include '/checkout'
      if (!url.includes('/checkout')) {
        removeSelectedProduct();
      }
    };

    router.events.on('beforeHistoryChange', handleBeforeHistoryChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [removeSelectedProduct, router]);

  useEffect(() => {
    const handleBeforeHistoryChange = (url) => {
      if (url.includes('/thankyou')) {
        removeCartItmes();
      }
    };

    const handleRouteChangeComplete = (url) => {
      if (url.includes('/checkout')) {
        removeCartItmes();
      }
    };

    router.events.on('beforeHistoryChange', handleBeforeHistoryChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [removeCartItmes, router]);

  return (
    <GoogleOAuthProvider clientId={googleClientID}>
      <ThemeProvider theme={theme}>
        <Layout metaData={pageProps.metaData}>
          <NextNProgress
            color="#ff4b01"
            startPosition={0.2}
            height={4}
            showOnShallow={true}
          />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export async function getStaticProps(context: any) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
export default appWithTranslation(MyApp);
