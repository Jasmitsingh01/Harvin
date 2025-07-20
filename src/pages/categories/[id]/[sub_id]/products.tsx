import * as React from 'react';
import type { NextPage } from 'next';

const ProductListing = dynamic(
  () => import('../../../../components/product-listing'),
  { ssr: false }
);

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const ProductContainer: NextPage = (props: any) => {
  const { params, resolvedUrl } = props;
  return <ProductListing id={params.sub_id} resolvedUrl={resolvedUrl} />;
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
