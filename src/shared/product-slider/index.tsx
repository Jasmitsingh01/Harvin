import React from 'react';
import Slider from '../../components/home/slider';
import { ProductSliderStyled, SliderSkeletonStyled } from './styled';
import { isEmpty, range } from 'lodash';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import NoDataAvailable from '../common/NoDataAvailable';
const SliderSkeleton = ({ value }: { value: number }): any =>
  range(value).map((item) => (
    <SliderSkeletonStyled key={`${item}`}>
      <Skeleton variant="rectangular" width={200} height={250} />
      <Skeleton variant="rectangular" width={200} height={15} />
      <Skeleton variant="rectangular" width={150} height={15} />
    </SliderSkeletonStyled>
  ));
const ProductSlider = ({ loading, data, title }: any) => {
  const { t } = useTranslation();

  if (isEmpty(data) && !loading) {
    return null;
  }
  return (
    <ProductSliderStyled className="product detail-page-product">
      <div className="container">
        <div className="section-heading">
          <h2>{t(title)}</h2>
        </div>
        {isEmpty(data) && !loading && <NoDataAvailable />}
        <div className="row ">
          {loading && <SliderSkeleton value={5} />}
          <Slider products={data} />
        </div>
      </div>
    </ProductSliderStyled>
  );
};

export default ProductSlider;
