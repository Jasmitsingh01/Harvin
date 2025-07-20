import React from 'react';
// import Slider from '../../components/home/slider';
// import RecenteltViewed from './RecenteltViewed';
import ProductSlider from '../../shared/product-slider';
import useSWR from 'swr';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';
import { useRouter } from 'next/router';
import RecenteltViewed from './RecenteltViewed';
import { getIdFromParams } from '../../utilities/helper';
// import { useTranslation } from 'react-i18next';
const swrConfig = {
  revalidateIfStale: true,
  refreshInterval: 0,
  revalidateOnFocus: false,
};
const BottomProductList = () => {
  // const { t } = useTranslation();
  const router = useRouter();
  const id = getIdFromParams(router?.query?.id);
  const { data: similarProducts, isLoading: similerLoading } = useSWR(
    ROUTES.getSimmilerProduct(id),
    fetcherSWR,
    swrConfig
  );
  const { data: otherProducts, isLoading } = useSWR(
    ROUTES.getOtherOrderProductDetail(id),
    fetcherSWR,
    swrConfig
  );
  const { data: recentlyData, isLoading: recentlyLoading } = useSWR(
    ROUTES.lastViewdProduct(),
    fetcherSWR,
    swrConfig
  );
  return (
    <div>
      <ProductSlider
        title={'relatedProducts'}
        data={similarProducts}
        loading={similerLoading}
      />
      <ProductSlider
        title={'frequentlyBoughtTogether'}
        data={otherProducts?.data}
        loading={isLoading}
      />
      <RecenteltViewed result={recentlyData ?? []} loading={recentlyLoading} />
    </div>
  );
};

export default BottomProductList;
