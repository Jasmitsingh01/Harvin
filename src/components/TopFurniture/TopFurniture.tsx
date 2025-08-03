import React from 'react';
import TopFurnitureCard from './TopFurnitureCard';
// import { TopFurnitureData } from './data';
import { useTranslation } from 'react-i18next';
import { FurnitureStyled } from './styled';
import ROUTES from '../../utilities/api-routes';
import useSWR from 'swr';
import { fetcherSWR } from '../../services/api';
import { SliderSkeletonTF } from './Skeleton';
import NoDataAvailable from '../../shared/common/NoDataAvailable';
import { isEmpty } from 'lodash';

const TopFurniture = ({ loading }: any) => {
  const { data, isLoading } = useSWR(
    ROUTES.getTopFurnitureCategory,
    fetcherSWR
  );
  const { t } = useTranslation();
  console.log(data, 'HRVANIN SERVER TOP CATEGORYS');
  // Static/hardcoded categories with Unsplash images
  const staticCategories = [
    {
      id: 'static-special-offers',
      name: 'Special Offers',
      slug: 'special-offers',
      parent: null,
      icon: {
        url: 'https://api.harvinchairs.com/storage/8691/67c197a84d9ee_WhatsApp-Image-2025-02-28-at-4.30.18-PM.jpeg',
      },
    },
    {
      id: 'static-new-arrivals',
      name: 'New Arrivals',
      slug: 'new-arrivals',
      parent: null,
      icon: {
        url: 'https://api.harvinchairs.com/storage/8691/67c197a84d9ee_WhatsApp-Image-2025-02-28-at-4.30.18-PM.jpeg',
      },
    },
    {
      id: 'static-bestsellers',
      name: 'Best Sellers',
      slug: 'bestsellers',
      parent: null,
      icon: {
        url: 'https://api.harvinchairs.com/storage/10263/686235c6bb951_WhatsApp-Image-2025-06-30-at-12.27.16-PM.jpeg',
      },
    },
  ];

  // Combine API data with static categories
  const combinedCategories = React.useMemo(() => {
    const categories = data || [];
    // Add static categories at the beginning
    return [...staticCategories, ...categories];
  }, [data]);

  if (isLoading || loading) {
    return <SliderSkeletonTF value={12} />;
  }

  return (
    <FurnitureStyled className="category">
      <div className="container">
        <div className="section-heading text-center">
          <h2>{t('topFurnitureCategories')}</h2>
        </div>
        {isEmpty(combinedCategories) && !isLoading && <NoDataAvailable />}
        <div className="categoty-listing mt-5">
          {combinedCategories?.map((item: any, index: number) => {
            return <TopFurnitureCard item={item} key={item.id || index} />;
          })}
        </div>
      </div>
    </FurnitureStyled>
  );
};

export default TopFurniture;
