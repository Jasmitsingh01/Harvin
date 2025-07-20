import * as React from 'react';
import type { NextPage } from 'next';
import ProductListing from '../../../components/product-listing';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ProductContainer: NextPage = (props: any) => {
  const { params, resolvedUrl } = props;
  return <ProductListing id={params.id} resolvedUrl={resolvedUrl} />;
};

export async function getServerSideProps(context: any) {
  const { locale, resolvedUrl } = context;
  return {
    props: {
      params: context.params,
      resolvedUrl: resolvedUrl,

      ...(await serverSideTranslations(locale)),
    },
  };
}

export default ProductContainer;
