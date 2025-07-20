import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import ROUTES from '../../utilities/api-routes';
import api from '../../services/api';

const Media = dynamic(() => import('../../components/staticPages/media'), {
  ssr: false,
});

const MediaContainer: NextPage = ({ data }: any) => {
  return <Media data={data} />;
};

export async function getServerSideProps(context: any) {
  const { locale } = context;

  try {
    const { data: result } = await api.get(ROUTES.media());

    const props = {
      ...(await serverSideTranslations(locale)),
      data: result,
    };

    return { props };
  } catch (error) {
    const props = {
      ...(await serverSideTranslations(locale)),
      data: null,
    };

    return { props };
  }
}

export default MediaContainer;
