import React from 'react';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';
import useSWR from 'swr';
import ProductSlider from '../../shared/product-slider';

const ArrivalProducts = () => {
  const { data, isLoading, error } = useSWR(ROUTES.getNewArrival(), fetcherSWR);
  return (
    <ProductSlider
      loading={isLoading}
      error={error}
      title={'newAtHarvin'}
      data={data}
    />
  );
};

export default ArrivalProducts;
