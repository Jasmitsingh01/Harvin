// StoreDetailsPage.tsx
import React from 'react';
// import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import api from '../../services/api';
import ROUTES from '../../utilities/api-routes';

const StoreDetailsPage = ({ storeData }: any) => {
  //   const router = useRouter();
  //   const { id } = router.query;

  if (!storeData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="product-listing-title">
      <div className="container">
        <h1>{storeData.name}</h1>
        <p>{storeData.city}</p>
        <p>{storeData.address}</p>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { id } = context.query;

  try {
    const { data: storeData } = await api.get(ROUTES.storeDetail(id));

    return {
      props: {
        storeData,
        ...(await serverSideTranslations(locale)),
      },
    };
  } catch (error) {
    return {
      props: {
        storeData: null,
        ...(await serverSideTranslations(locale)),
      },
    };
  }
};

export default StoreDetailsPage;
