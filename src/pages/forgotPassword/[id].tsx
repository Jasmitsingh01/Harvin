import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const ResetPassword = dynamic(
  () => import('../../components/auth/ForgotPassword/ResetPassword'),
  { ssr: false }
);
const ResetPasswordContainer: NextPage = () => {
  return <ResetPassword />;
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

export default ResetPasswordContainer;
