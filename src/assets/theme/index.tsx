'use client';
import React, { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from './theme';
import Head from 'next/head';

interface Props {
  children: ReactNode;
}

function ThemeWrapper({ children }: Props) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Head>
        <meta name="theme-color" content={lightTheme.colors.dominant} />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default ThemeWrapper;
