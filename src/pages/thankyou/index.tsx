import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const Thankyou = dynamic(
  () => import('../../components/my-accounts/thankyou'),
  { ssr: false }
);
const ThankyouContainer: NextPage = () => {
  return <Thankyou />;
};
export async function getServerSideProps(context: any) {
  const { locale } = context;
  return {
    props: {
      // id: params?.id,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default ThankyouContainer;
