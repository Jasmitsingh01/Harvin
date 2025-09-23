import React from 'react';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWRPost } from '../../services/api';
import useSWR from 'swr';
import ProductSlider from '../../shared/product-slider';

const SellerProducts = ({ loading, title, referenceCodes = ["REF001", "REF002", "REF003"], language = "en" }: any) => {
  const { data, isLoading, error } = useSWR(
    [ROUTES.fetchProductListwithRefrecode(), { reference_codes: referenceCodes, language }],
    ([url, body]) => fetcherSWRPost(url, body)
  );
  
  // Extract products from the API response
  const products = data?.data?.products || [];
  
  return (
    <ProductSlider
      loading={isLoading || loading}
      error={error} 
      title={title}
      data={products}
    />
  );
};

export default SellerProducts;
