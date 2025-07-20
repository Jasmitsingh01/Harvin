import * as React from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Checkout = dynamic(() => import('../../components/checkout'), {
  ssr: false,
});

const CheckoutContainer: NextPage = () => {
  return typeof window !== 'undefined' ? <Checkout /> : null;
};
export async function getStaticProps(context: any) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
export default CheckoutContainer;
