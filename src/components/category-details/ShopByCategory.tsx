import React from 'react';
import ProgressiveImage from '../../shared/progressive-image';
// import { categoryCard } from '../TopFurniture/data';
// import sofas1 from '../../assets/images/fabric-sofa.png';
import { useRouter } from 'next/router';
import { SliderSkeleton } from '../TopFurniture/Skeleton';
import { isEmpty } from 'lodash';
import NoDataAvailable from '../../shared/common/NoDataAvailable';

const ShopByCategory = ({ result, childrenCategory, title, loading }: any) => {
  const { id, slug } = result || {};
  const router = useRouter();
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
                  onClick={() =>
                    router.push(
                      `/categories/${id}-${slug}/${category?.id}-${category?.slug}/products`
                    )
                  }
                >
                  <div className="category-img">
                    <ProgressiveImage
                      src={category?.icon?.url}
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

export default ShopByCategory;
