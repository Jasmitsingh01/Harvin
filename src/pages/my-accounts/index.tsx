import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const MyAccounts = dynamic(() => import('../../components/my-accounts'), {
  ssr: false,
});

const MyAccountsContainer: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/home');
      }
    }
  }, [router]);
  return <MyAccounts />;
};
export async function getStaticProps(context: any) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
export default MyAccountsContainer;
