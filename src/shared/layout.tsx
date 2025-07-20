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
        <a 
          href="https://wa.me/919109056169"
          className="callback-float"
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <div className="callback-content">
            <p className="callback-title">Request</p>
            <div className="callback-icon">
              <i className="fa-solid fa-phone"></i>
            </div>
            <p className="callback-subtitle">Callback</p>
          </div>
        </a>
      </AppProvider>
    </MetaTags>
  );
};

export default Layout;
