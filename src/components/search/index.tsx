'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  useCurrentPage,
  useSearchGetData,
} from '../../stores/search/search-store';
import { useTranslation } from 'react-i18next';
import SearchCategory from './SearchCategory';
import { SliderSkeleton } from '../product-listing';
import ListHeader from '../product-listing/ListHeader';
import FilterProductSection from '../../shared/filtered-section';
import { PaginationStyled } from '../product-listing/styled';
import Pagination from 'react-js-pagination';
import Card from '../product-listing/Card';
import { decryptUrlForFilter } from '../../utilities/helper';
import { filterData } from '../../stores/product-listing/product-listing-action';
import { isEmpty } from 'lodash';
import { fetcherSWR } from '../../services/api';
import useSWR from 'swr';
import ROUTES from '../../utilities/api-routes';
import { updateCurrentPage } from '../../stores/search/search-action';
import NoDataAvailable from '../../shared/common/NoDataAvailable';
import TopFurniture from '../TopFurniture/TopFurniture';
import img from '../../assets/images/no-result-found.png';
import ProgressiveImage from '../../shared/progressive-image';

const Search = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const { key } = router.query;

  const {
    data = {},
    isLoading,
    error,
  } = useSWR(ROUTES.getSearchProductList(key), fetcherSWR);

  const routeID = data.category_list && data.category_list[0]?.id?.toString();

  const { data: attributesData } = useSWR(
    ROUTES.attributeFilter(routeID),
    fetcherSWR
  );

  const { productList } = useSearchGetData();
  const currentPage = useCurrentPage();
  const itemsPerPage = 8 || 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = productList?.slice(startIndex, endIndex) || [];

  const isProductListLoading = isEmpty(data?.productList) && !error;
  // const isCategoryLoading = isEmpty(data?.category_list) && !error;
  useEffect(() => {
    const decryptData = decryptUrlForFilter(window.location.href, true);

    filterData(decryptData, data.productList, attributesData, true);
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
            searchFlag={true}
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
            <section className="no-result-section">
              <div className="container">
                <div className="no-result text-center">
                  <ProgressiveImage
                    src={img}
                    alt=""
                    height={64}
                    width={64}
                    layout="intrisinic"
                  />
                  <h4 className="text-24 weight-600">
                    We couldn&apos;t find any matches for ‘{key}’
                  </h4>
                  <p className="weight-500">
                    Please check the spelling or try searching something else
                  </p>
                </div>
              </div>
            </section>
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

export default Search;
