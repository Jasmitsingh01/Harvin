'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import FilterProductSection from '../../shared/filtered-section';

import Pagination from 'react-js-pagination';

import { decryptUrlForFilter } from '../../utilities/helper';
import { filterData } from '../../stores/product-listing/product-listing-action';
import { isEmpty } from 'lodash';
import { fetcherSWR } from '../../services/api';
import useSWR from 'swr';
import ROUTES from '../../utilities/api-routes';
import { updateCurrentPage } from '../../stores/search/search-action';
import NoDataAvailable from '../../shared/common/NoDataAvailable';
import SearchCategory from '../search/SearchCategory';
import ListHeader from '../product-listing/ListHeader';
import { SliderSkeleton } from '../product-listing';
import Card from '../product-listing/Card';
import TopFurniture from '../TopFurniture/TopFurniture';
import { PaginationStyled } from '../product-listing/styled';
import { useProductListingData } from '../../stores/product-listing/product-listing-store';

const ourCompany = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const { tag } = router.query;

  const transformedTag = Array.isArray(tag)
    ? tag.map((t) => t.replace(/-/g, ' '))
    : tag
    ? tag.replace(/-/g, ' ')
    : '';

  const {
    data = {},
    isLoading,
    error,
  } = useSWR(ROUTES.getSearchProductList(transformedTag), fetcherSWR);
  const { productList, currentPage } = useProductListingData();

  const routeID = data?.productList && data?.productList[0]?.default_category;

  const { data: attributesData } = useSWR(
    ROUTES.attributeFilter(routeID),
    fetcherSWR
  );

  const itemsPerPage = data?.productList?.length || 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = productList?.slice(startIndex, endIndex) || [];

  const isProductListLoading = isEmpty(data?.productList) && !error;
  // const isCategoryLoading = isEmpty(data?.category_list) && !error;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const decryptData = decryptUrlForFilter(window.location.href, false);
      filterData(decryptData, data.productList, attributesData, false);
    }
  }, [window.location.href, isProductListLoading, attributesData?.length]);

  const handlePageChange = (page: number) => {
    updateCurrentPage(page);
  };

  return (
    <>
      <main className="home">
        <SearchCategory
          result={data.category_list}
          childrenCategory={data.category_list}
          loading={isLoading}
          title={t('Categories')}
        />

        <ListHeader category={data.category_list} />

        {!isEmpty(data?.productList) && (
          <FilterProductSection
            id={
              data.category_list
                ? data.category_list[0]?.id?.toString()
                : productList[0]?.default_category
            }
            attributesData={attributesData}
            productList={productList}
            searchFlag={false}
          />
        )}

        {isEmpty(data?.productList) && !isLoading ? (
          <></>
        ) : (
          <section className="product-listing-section">
            <div className="container">
              <div className="product-listing-wrap">
                {isProductListLoading && <SliderSkeleton value={8} />}
                {displayedItems?.map((val: any, index: number) => {
                  return <Card product={val} key={index} keyValue={index} />;
                })}

                {!isProductListLoading && isEmpty(displayedItems) && (
                  <NoDataAvailable />
                )}
              </div>
            </div>
          </section>
        )}
        {isEmpty(data?.category_list) &&
        isEmpty(data?.productList) &&
        !isLoading ? (
          <div className="container">
            {/* <p>We are sorry, no data available.</p> */}
            <TopFurniture loading={isLoading} />
          </div>
        ) : null}
        <PaginationStyled>
          {displayedItems.length > 0 && (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={productList?.length || 0}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass={'page-item'}
              innerClass="pagination"
              activeClass="active"
              linkClass="page-link"
            />
          )}
        </PaginationStyled>
      </main>
    </>
  );
};

export default ourCompany;
