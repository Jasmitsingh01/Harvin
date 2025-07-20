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
          href="https://wa.me/919109056169?text=Hi%20there!%20I%20need%20help%20with%20furniture."
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <div className="whatsapp-content">
            <div className="whatsapp-icon">
              <i className="fab fa-whatsapp"></i>
            </div>
            <p className="whatsapp-text">Chat with us</p>
          </div>
        </a>
      </AppProvider>
    </MetaTags>
  );
};

export default Layout;
