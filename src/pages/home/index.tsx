import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Loading from '../../shared/Loading';

const Home = dynamic(() => import('../../components/home'), {
  ssr: false,
  loading: () => <Loading />,
});

const HomeContainer: NextPage = () => {
  return <Home />;
};
export async function getStaticProps(context: any) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
export default HomeContainer;
