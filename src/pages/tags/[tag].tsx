import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const OurCompany = dynamic(() => import('../../components/tags'), {
  ssr: false,
});

const OurCompanyContainer: NextPage = () => {
  return <OurCompany />;
};
export async function getServerSideProps(context: any) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
export default OurCompanyContainer;
