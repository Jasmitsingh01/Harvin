import React from 'react';
import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getProductDetail } from '../../stores/home-actions';
import {
  decryptUrl,
  getIdFromParams,
  getSelectedProductCombination,
} from '../../utilities/helper';
import { isEmpty } from 'lodash';
import PageNotFound from '../../shared/page-not-found';
import dynamic from 'next/dynamic';

const ProductDetailPage = dynamic(
  () => import('../../components/product-detail-page/index'),
  { ssr: false }
);
const ProductContainer: NextPage = (props: any) => {
  const { result, productCombination, selectedCombination, error } = props;
  const { t } = useTranslation();
  if (error || isEmpty(result)) {
    return (
      <>
        <PageNotFound />
      </>
    );
  }
  return (
    <ProductDetailPage
      result={result}
      productCombination={productCombination}
      selectedCombination={selectedCombination}
      adcart={t('addToWishList')}
    />
  );
};
export async function getServerSideProps(context: any) {
  const { params, locale, resolvedUrl } = context;
  const id = getIdFromParams(params?.id);
  const { result }: any = await getProductDetail(id);
  if (!result) {
    return {
      props: {
        id: params?.id,
        result: {},
        productCombination: {},
        selectedCombination: {},
        metaData: {},
        ...(await serverSideTranslations(locale)),
      },
    };
  }
  const selectedCombination =
    decryptUrl(resolvedUrl, result.product_combinations || []) || {};
  const selectedProductCombination =
    getSelectedProductCombination(
      selectedCombination,
      result.product_combinations || []
    ) || [];

  const images = selectedProductCombination?.images || [];
  const gallary = result?.gallary || [];

  const metaData = {
    title: result?.name || '',
    description: result?.description || '',
    image: images[0]?.original || gallary[0]?.original || '',
    url: result?.Url || '',
  };

  return {
    props: {
      id: params?.id,
      result,
      productCombination: {
        ...selectedProductCombination,
        name: result?.name,
        description: result?.description,
      },
      selectedCombination,
      metaData,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default ProductContainer;
