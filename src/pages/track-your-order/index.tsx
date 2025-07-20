import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PageNotFoundStyled } from '../../shared/page-not-found/style';

const ComingSoon: NextPage = () => {
  return (
    <PageNotFoundStyled className="main">
      <div className="error-404-wrap text-center">
        <div className="error-404-img"></div>
        <h3 className="">Coming Soon...</h3>
      </div>
    </PageNotFoundStyled>
  );
};
export async function getStaticProps(context: any) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
export default ComingSoon;
