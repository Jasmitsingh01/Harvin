import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const CmsPageDetails = dynamic(() => import('../../components/cms/index'), {
  ssr: false,
});
const cmsPageDetailsContainer: NextPage = () => {
  return <CmsPageDetails />;
};
export async function getServerSideProps(context: any) {
  const { locale } = context;
  return {
    props: {
      //   id: params?.id,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default cmsPageDetailsContainer;
