import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const Search = dynamic(() => import('../../components/search'), {
  ssr: false,
});

const SearchContainer: NextPage = () => {
  return <Search />;
};
export async function getStaticProps(context: any) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
export default SearchContainer;
