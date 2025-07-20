// import * as React from 'react';
import type { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MainContainer: NextPage | any = () => {};
export async function getStaticProps(context: any) {
  // extract the locale identifier from the URL
  const { locale } = context;

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  };
}
export default MainContainer;
