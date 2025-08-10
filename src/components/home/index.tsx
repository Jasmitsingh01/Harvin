'use client';
import React from 'react';
import PromoSection from '../promo-section';
import CollectionSection from './collections-section';
import SlickSlider from '../../shared/slick-slider';
import ProgressiveImage from '../../shared/progressive-image';
// import promoImg from '../../assets/images/coupon.png';
import OfferSection from './offers-section';
import { BannerSectionStyled, SkeletonHomeBanner } from './styled';
import ArrivalProducts from './arrival-products';
import SellerProducts from './seller-products';
// import EnhancedBestSellers from './enhanced-bestsellers';
// import EnhancedNewArrivals from './enhanced-newarrivals';
import FeaturedShowcase from './featured-showcase';
import ROUTES from '../../utilities/api-routes';
import useSWR from 'swr';
import { fetcherSWR } from '../../services/api';
import { Skeleton } from '@mui/material';
// import Login from '../auth/Login';
// import Modal from 'react-modal';
// import banner from '../../assets/images/banner-first.jpg';
// import banner2 from '../../assets/images/banner-second.jpg';
// import banner3 from '../../assets/images/banner-third.jpg';
import { range } from 'lodash';
import { bannerRouting } from '../../utilities/helper';

import dynamic from 'next/dynamic';
import { SliderSkeletonTF } from '../TopFurniture/Skeleton';

const TopFurniture = dynamic(() => import('../TopFurniture/TopFurniture'), {
  ssr: false,
  loading: () => <SliderSkeletonTF value={12} />,
});

const SliderSkeleton = ({ value }: { value: number }): any =>
  range(value).map(() => (
    <SkeletonHomeBanner key={value}>
      <Skeleton variant="rectangular" width={1200} height={500} />
    </SkeletonHomeBanner>
  ));
const Home = () => {
  const { data, isLoading } = useSWR(ROUTES.getHomePageBanner, fetcherSWR);
  const handleBannerRouting = (elem: any) => {
    bannerRouting(elem);
  };

  const { data: advertismentBanner } = useSWR(
    ROUTES.categoryAdvertisment(),
    fetcherSWR
  );

  // console.log(data, 'dahdjkh');

  return (
    <>
      <main className="home">
        <BannerSectionStyled className="banner-section">
          <div className="container">
            <div className="banner-listing">
              {isLoading && <SliderSkeleton value={1} />}
              <SlickSlider>
                {data?.homebanner1?.map((elem: any) => {
                  return (
                    <div
                      className="banner"
                      key={elem?.name}
                      onClick={() => handleBannerRouting(elem)}
                    >
                      <ProgressiveImage
                        src={elem?.banner?.url}
                        alt={elem?.name}
                        className="w-100"
                        key={elem?.name}
                      />
                    </div>
                  );
                })}
              </SlickSlider>
            </div>
          </div>
        </BannerSectionStyled>
        <TopFurniture loading={isLoading} />
        {/* <PromoSection isLoading={isLoading} data={data?.homebanner2} index={0} /> */}
        <PromoSection data={advertismentBanner} index={0} />

        {/* Enhanced Best Sellers Section */}
        {/* <EnhancedBestSellers /> */}

        <CollectionSection
          data={data?.collections_in_focus}
          loading={isLoading}
        />

        {/* Enhanced New Arrivals Section */}
        <ArrivalProducts title={'Deals of the Day'} />

        {/* Featured Products Showcase */}
        <FeaturedShowcase />
        <SellerProducts title={'Diwali Special Products'} loading={isLoading} />
        {/* Original sections for fallback */}
        <SellerProducts title={'bestSellingProduct'} loading={isLoading} />
        <ArrivalProducts title={'New at Harvin'} />
        <OfferSection data={data?.homebanner3} />
      </main>
    </>
  );
};

export default Home;
