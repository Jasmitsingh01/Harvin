import * as React from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CartPage = dynamic(() => import('../../components/cart'), { ssr: false });

const CartContainer: NextPage = () => {
  return typeof window !== 'undefined' ? <CartPage /> : null;
};
export async function getStaticProps(context: any) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
export default CartContainer;
