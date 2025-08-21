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
    
  ];

  // Combine API data with static categories
  const combinedCategories = React.useMemo(() => {
    const categories = Array.isArray(data) ? data : [];
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
