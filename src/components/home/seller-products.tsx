import React from 'react';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';
import useSWR from 'swr';
import ProductSlider from '../../shared/product-slider';
const SellerProducts = ({ loading, title }: any) => {
  const { data, isLoading, error } = useSWR(
    ROUTES.getBestSellerProducts(),
    fetcherSWR
  );
  return (
    <ProductSlider
      loading={isLoading || loading}
      error={error} 
      title={title}
      data={data}
    />
  );
};

export default SellerProducts;
