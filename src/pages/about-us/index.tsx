import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import ROUTES from '../../utilities/api-routes';
import api from '../../services/api';

const AboutUs = dynamic(() => import('../../components/staticPages/aboutUs'), {
  ssr: false,
});

const AboutUsContainer: NextPage = (props: any) => {
  const { data } = props;
  return <AboutUs data={data} />;
};

export async function getServerSideProps(context: any) {
  const { locale } = context;
  try {
    const { data: result } = await api.get(ROUTES.aboutUs());
    return {
      props: {
        data: result,
        ...(await serverSideTranslations(locale)),
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        ...(await serverSideTranslations(locale)),
      },
    };
  }
}
export default AboutUsContainer;
