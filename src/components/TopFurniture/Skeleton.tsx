import React from 'react';
import { range } from 'lodash';
import { Skeleton } from '@mui/material';
import { FurnitureStyled } from './styled';
import { useTranslation } from 'react-i18next';

export const SliderSkeleton = ({ value }: { value: number }): any => {
  return (
    <>
      {range(value).map((index) => (
        <div
          className="category-item"
          style={{ marginRight: '5px' }}
          key={index}
        >
          <Skeleton
            variant="rectangular"
            height={200}
            style={{ borderRadius: '3px' }}
          />
          <Skeleton
            variant="text"
            width={150}
            height={20}
            style={{ marginTop: '8px' }}
          />
        </div>
      ))}
    </>
  );
};

export const SliderSkeletonTF = ({ value }: { value: number }): any => {
  const { t } = useTranslation();

  return (
    <FurnitureStyled className="category">
      <div className="container">
        <div className="section-heading text-center">
          <h2>{t('topFurnitureCategories')}</h2>
        </div>

        <div className="categoty-listing mt-5">
          {range(value).map((index) => (
            <div
              className="category-item"
              style={{ marginRight: '5px' }}
              key={index}
            >
              <Skeleton
                variant="rectangular"
                height={200}
                style={{ borderRadius: '3px' }}
              />
              <Skeleton
                variant="text"
                width={150}
                height={20}
                style={{ marginTop: '8px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </FurnitureStyled>
  );
};
