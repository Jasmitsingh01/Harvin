'use client';
import React from 'react';
import Header from './headers';
import MetaTags from './meta-tags';
import Footer from './footer';
import { AppProvider } from './providers';
import '../assets/css/app.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import CookieBanner from '../components/CookieBanner/CookieBanner';

const Layout = (props: any) => {
  const { metaData } = props;
  return (
    <MetaTags metaData={metaData}>
      <CookieBanner />
      <AppProvider>
        <Header />
        <main>{props?.children}</main>
        <Footer />
      </AppProvider>
    </MetaTags>
  );
};

export default Layout;
