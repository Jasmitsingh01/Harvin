import React from 'react';
// import banner from '../../assets/images/category-banner.jpg';
import ProgressiveImage from '../../shared/progressive-image';
import ShopByCategory from './ShopByCategory';
import SofaStyleBlock from './SofaStyleBlock';
import { CategoryPage } from './styled';
import ShopByMaterial from './ShopByMaterial';
import ProductSlider from '../../shared/product-slider';
import { useTranslation } from 'react-i18next';
import BreadCrumbs from '../../shared/breadcrumbs';
import { isEmpty, range } from 'lodash';
import { SkeletonHomeBanner } from '../home/styled';
import { Skeleton } from '@mui/material';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import PromoSection from '../promo-section';
import { getIdFromParams } from '../../utilities/helper';
const SliderSkeleton = ({ value }: { value: number }): any =>
  range(value).map(() => (
    <SkeletonHomeBanner key={value}>
      <Skeleton variant="rectangular" width={1200} height={400} />
    </SkeletonHomeBanner>
  ));
const CategoryDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const id = getIdFromParams(router?.query?.id);
  const { data, error } = useSWR(ROUTES.categoryDetail(id), fetcherSWR);
  const loading = isEmpty(data) && !error;
  const { data: product } = useSWR(
    ROUTES.bestSellerProductCategory(id),
    fetcherSWR
  );
  const { data: shopByMaterial, isLoading: shopByMaterialLoading } = useSWR(
    ROUTES.shopByMaterialCategory(id),
    fetcherSWR
  );

  console.log(product, 'product');
  // const materialLoading = isEmpty(shopByMaterial) && !shopByMaterialError;
  const { data: advertismentBanner, error: advertismentBannerError } = useSWR(
    ROUTES.categoryAdvertismentData(id),
    fetcherSWR
  );

  console.log(advertismentBanner, 'advertismentBanner');
  const advertiseLoading =
    isEmpty(advertismentBanner) && !advertismentBannerError;
  return (
    <CategoryPage className="category-page">
      <BreadCrumbs discardBreadCrumbs={['Products']} />
      {loading && <SliderSkeleton value={1} />}
      {!loading && (
        <section className="banner-section">
          <div className="container">
            <div className="banner-listing">
              <div className="banner" style={{ cursor: 'default' }}>
                <ProgressiveImage
                  src={data?.image?.url}
                  alt=""
                  className="w-100"
                />
              </div>
            </div>
          </div>
        </section>
      )}
      {data?.children?.length > 0 && (
        <ShopByCategory
          result={data}
          childrenCategory={data?.children}
          loading={loading}
          title={t('shopByCategory')}
        />
      )}
      <PromoSection data={advertismentBanner} index={0} />
      <ProductSlider
        title={t('bestSellingSofaSelections')}
        loading={loading}
        data={product}
      />

      {data?.children?.length > 0 && (
        <SofaStyleBlock loading={loading} data={data?.children} />
      )}
      <PromoSection
        data={advertismentBanner}
        index={1}
        loading={advertiseLoading}
      />
      {shopByMaterial?.length > 0 && (
        <ShopByMaterial
          title={t('shopByuMaterial')}
          data={shopByMaterial}
          loading={shopByMaterialLoading}
        />
      )}
    </CategoryPage>
  );
};

export default CategoryDetailPage;
