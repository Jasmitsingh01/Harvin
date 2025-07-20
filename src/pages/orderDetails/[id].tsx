import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const OrderDetails = dynamic(
  () => import('../../components/my-accounts/order-details'),
  { ssr: false }
);
const OrderDetailsContainer: NextPage = () => {
  return <OrderDetails />;
};
export async function getServerSideProps(context: any) {
  const { params, locale } = context;
  return {
    props: {
      id: params?.id,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default OrderDetailsContainer;
