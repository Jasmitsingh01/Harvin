import React, { useEffect, useCallback } from 'react';
import ListHeader from './ListHeader';
import BreadCrumbs from '../../shared/breadcrumbs';
import { ProductListingStyled } from './styled';
import FilterProductSection from '../../shared/filtered-section';
import PromoSection from '../promo-section';
import promoImg from '../../assets/images/emi-banner.jpg';
import Card from './Card';
import useSWR from 'swr';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';
import { isEmpty, range } from 'lodash';
// import NoDataAvailable from '../../shared/common/NoDataAvailable';
import { Skeleton } from '@mui/material';
import {
  filterData,
  loadMoreItems,
  initializeDisplayedItems,
} from '../../stores/product-listing/product-listing-action';
import { decryptUrlForFilter, getIdFromParams } from '../../utilities/helper';
import { useProductListingData } from '../../stores/product-listing/product-listing-store';
import ProgressiveImage from '../../shared/progressive-image';
import img from '../../assets/images/Group.png';
import Loading from '../../shared/Loading';

export const SliderSkeleton = ({ value }: { value: number }): any => (
  <>
    {range(value).map((index) => (
      <div className="product-item" key={index}>
        <div className="product-img">
          <Skeleton width={242} height={228} />
        </div>
        <div className="product-detail">
          <Skeleton width={242} height={100} />
        </div>
      </div>
    ))}
  </>
);

const ProductListing = ({ id }: any) => {
  const routeID = getIdFromParams(id);
  const { data: attributesData } = useSWR(
    ROUTES.attributeFilter(routeID),
    fetcherSWR
  );

  const { data, error, isLoading } = useSWR(
    ROUTES.productListing(routeID),
    fetcherSWR
  );

  const { productList, displayedItems, hasMoreItems, isLoadingMore } =
    useProductListingData();

  const isProductListLoading = isEmpty(data?.productList) && !error;

  const isLoadingAttributes = !attributesData;
  const isLoadingProducts = !data && !error;

  // Show more button callback
  const handleShowMore = useCallback(() => {
    if (hasMoreItems && !isLoadingMore) {
      loadMoreItems();
    }
  }, [hasMoreItems, isLoadingMore]);

  // const isLoading = isEmpty(data?.productList) && !error;

  useEffect(() => {
    const decryptData = decryptUrlForFilter(window.location.href);
    filterData(decryptData, data?.productList, attributesData);
  }, [window.location.href, isLoading, isLoadingAttributes, isLoadingProducts]);

  // Initialize displayed items when productList changes
  useEffect(() => {
    if (productList && productList.length > 0) {
      initializeDisplayedItems(productList);
    }
  }, [productList]);

  if (isLoadingAttributes || isLoadingProducts) {
    return <Loading />;
  }

  return (
    <ProductListingStyled className="product-listing-page">
      <BreadCrumbs discardBreadCrumbs={['Products']} />

      <main className="home">
        <ListHeader category={data?.category_detail} />
        {!isEmpty(data?.productList) && (
          <FilterProductSection
            attributesData={attributesData}
            productList={data?.productList}
          />
        )}

        {isEmpty(data?.productList) && !isLoading ? (
          <></>
        ) : (
          <section className="product-listing-section">
            <div className="container">
              <div className="product-listing-wrap">
                {/* {isProductListLoading && <SliderSkeleton value={8} />} */}
                {displayedItems?.map((val: any, index: number) => {
                  return <Card product={val} key={index} keyValue={index} />;
                })}

                {!isProductListLoading && isEmpty(displayedItems) && (
                  <section className="no-result-section">
                    <div className="container">
                      <div className="no-result text-center">
                        <p className="text-20 weight-500">No Products Found!</p>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </section>
        )}
        {isEmpty(data?.productList) && !isLoading ? (
          <section className="no-result-section">
            <div className="container">
              <div className="no-result text-center">
                <ProgressiveImage
                  src={img}
                  alt=""
                  layout="intrinsic"
                  height={100}
                  width={100}
                />
                <h4 className="text-24 weight-600">
                  No products found in this category, explore other categories
                  for now.
                </h4>
                <p className="weight-500">
                  Don&apos;t worry; we&apos;re constantly adding new pieces to
                  our collection. Visit again for fresh inventory.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <PromoSection img={promoImg} index={0} />
        {/* Show More Button Section */}
        {hasMoreItems && displayedItems.length > 0 && (
          <div className="show-more-section">
            <div className="container">
              <div className="text-center">
                <button
                  className="btn btn-outline-primary show-more-btn"
                  onClick={handleShowMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? 'Loading...' : 'Show More Products'}
                </button>
                <p className="show-more-info">
                  Showing {displayedItems.length} of {productList?.length || 0}{' '}
                  products
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator when loading more */}
        {isLoadingMore && (
          <div className="loading-more-container">
            <div className="container">
              <div className="product-listing-wrap">
                <SliderSkeleton value={4} />
              </div>
            </div>
          </div>
        )}

        {/* End of results indicator */}
        {!hasMoreItems && displayedItems.length > 0 && (
          <div className="end-of-results">
            <div className="container">
              <div className="text-center">
                <p
                  className="text-16 weight-500"
                  style={{ padding: '20px 0', color: '#666' }}
                >
                  All products displayed ({displayedItems.length} total)
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </ProductListingStyled>
  );
};

export default ProductListing;
