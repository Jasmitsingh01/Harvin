import React from 'react';
import ProgressiveImage from '../../shared/progressive-image';
import { SliderSkeleton } from '../TopFurniture/Skeleton';
import { isEmpty } from 'lodash';
import NoDataAvailable from '../../shared/common/NoDataAvailable';
import { useRouter } from 'next/router';

const SearchCategory = ({ childrenCategory, title, loading }: any) => {
  //   const { id, slug } = result || {};
  const router = useRouter();

  if (isEmpty(childrenCategory) && !loading) {
    return null;
  }

  return (
    <section className="category">
      <div className="container">
        <div className="section-heading text-center">
          <h2>{title}</h2>
        </div>
        {isEmpty(childrenCategory) && !loading && <NoDataAvailable />}

        <div className="categoty-listing mt-4 mt-lg-5">
          {loading && <SliderSkeleton value={6} />}
          {childrenCategory?.map((category: any, index: number) => {
            return (
              <>
                <div
                  className="category-item"
                  key={index}
                  onClick={() => router.push(`/${category?.url}`)}
                >
                  <div className="category-img">
                    <ProgressiveImage
                      src={category?.icon?.original}
                      alt=""
                      key={category?.name}
                    />
                  </div>
                  <h4>{category?.name}</h4>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchCategory;
