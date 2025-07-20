import React from 'react';
import ShopByMaterialCard from './ShopByMaterialCard';
import { isEmpty, range } from 'lodash';
import NoDataAvailable from '../../shared/common/NoDataAvailable';
import { Skeleton } from '@mui/material';
import { categoryRouting } from '../../utilities/helper';
import { useRouter } from 'next/router';

const SliderSkeleton = ({ value }: { value: number }): any => (
  <>
    {range(value).map((index) => (
      <div className="col-md-4 mt-5" key={index}>
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

const ShopByMaterial = ({ title, data, loading }: any) => {
  const router = useRouter();
  const handleCategoryRouting = (elem) => {
    categoryRouting(elem, router);
  };
  return (
    <section className="sofa-material">
      <div className="container">
        <div className="section-heading text-center">
          <h2>{title}</h2>
        </div>
        {isEmpty(data) && !loading && <NoDataAvailable />}
        <div className="row sofa-material-listing">
          {loading && <SliderSkeleton value={6} />}
          {data?.map((elem) => {
            return (
              <div
                className="col-md-4"
                key={elem?.title}
                onClick={() => handleCategoryRouting(elem)}
              >
                <ShopByMaterialCard item={elem} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopByMaterial;
