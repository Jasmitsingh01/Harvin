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
  if (isLoading || loading) {
    return <SliderSkeletonTF value={12} />;
  }
  return (
    <FurnitureStyled className="category">
      <div className="container">
        <div className="section-heading text-center">
          <h2>{t('topFurnitureCategories')}</h2>
        </div>
        {isEmpty(data) && !isLoading && <NoDataAvailable />}
        <div className="categoty-listing mt-5">
          {data?.map((item: any, index: number) => {
            return <TopFurnitureCard item={item} key={index} />;
          })}
        </div>
      </div>
    </FurnitureStyled>
  );
};

export default TopFurniture;
