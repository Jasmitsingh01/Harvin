import React, { useState } from 'react';
import { FilterdStyled } from './styled';
import SidebarDropdown from './SidebarDropdown';
// import { useProductListingData } from '../../stores/product-listing/product-listing-store';
import { priceWithCurrency } from '../../utilities/helper';
import {
  openCloseSidebarModal,
  updateCurrentPage,
  updateFilter,
} from '../../stores/product-listing/product-listing-action';
import {
  openSidebarModal,
  useProductCountAttributes,
  useProductFilterAttributes,
} from '../../stores/product-listing/product-listing-store';
import { priceRangeView, sortFilterData } from '../fields/field-data';
import AttributeListing from '../attribute-listing';
import {
  useProductSearchCountAttributes,
  useProductSearchFilterAttributes,
} from '../../stores/search/search-store';
import { updateSearchFilter } from '../../stores/search/search-action';

const FilterProductSection = ({
  attributesData,
  searchFlag,
  productList,
}: any) => {
  // const { colorList } = useProductListingData();
  const [openTab, setOpenTab] = useState<string>('');
  const { sidebarModal } = openSidebarModal();
  const { attributes, priceRange, sortFilter, discountFilter } = searchFlag
    ? useProductSearchFilterAttributes()
    : useProductFilterAttributes();

  const { attributesCounts, priceAttributesCounts, discountAttributesCounts } =
    searchFlag
      ? useProductSearchCountAttributes()
      : useProductCountAttributes();

  const handleOpenClose = (value) => {
    setOpenTab((prevValue) => (prevValue === value ? '' : value));
  };

  const menuAttributes = attributesData?.slice(0, 2);
  const sliderAttributes = attributesData?.slice(2, attributesData?.length);
  const handleCheckboxChange = (e, item, type) => {
    const isChecked = e.target.checked;
    searchFlag
      ? updateSearchFilter(isChecked, item?.id, type)
      : updateFilter(isChecked, item?.id, type);
    updateCurrentPage(1);
  };
  const handleOpenCloseSideBar = () => {
    openCloseSidebarModal(!sidebarModal);
  };

  const sidebarSelections = sliderAttributes?.filter((item) => item.selected);

  const isAnyFilterActive =
    (attributes?.length ?? 0) > 0 ||
    (priceRange?.length ?? 0) > 0 ||
    // (sortFilter?.length ?? 0) > 0 ||
    (sidebarSelections?.length ?? 0) > 0;

  const handleClearFilters = () => {
    updateFilter({}, 'all', 'clear');
    updateSearchFilter({}, 'all', 'clear');
  };

  return (
    <FilterdStyled className="filter">
      {sidebarModal && (
        <div
          onClick={() => openCloseSidebarModal(false)}
          className="offcanvas-backdrop show"
        ></div>
      )}
      <div className="container">
        <div className="filter-dropdown-wrap">
          <div className="dropdown filter-dropdown">
            <button
              onClick={() => handleOpenClose('sort')}
              className={`btn btn-secondary dropdown-toggle  ${
                openTab === 'sort' && 'show'
              }`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              Sort
            </button>
            <ul
              className={`dropdown-menu filter-dropdown-menu sort-menu ${
                openTab === 'sort' ? 'show' : ''
              }`}
            >
              {sortFilterData.map((item: any, index: any) => (
                <li key={index}>
                  <label className="dropdown-item">
                    <input
                      type="radio"
                      checked={sortFilter?.includes(Number(item.id))}
                      id={`filterPriceRangeCheckbox_${index}`}
                      name="sort"
                      onChange={(e) =>
                        handleCheckboxChange(e, item, 'sortFilter')
                      }
                      value=""
                      className="filter-checkbox"
                    />
                    {item.label}
                  </label>
                  {/* <span className="filter-count">
                    ({productList?.count || 0})
                  </span> */}
                </li>
              ))}
            </ul>
          </div>
          <div className="dropdown filter-dropdown">
            <button
              onClick={() => handleOpenClose('price-range')}
              className={`btn btn-secondary dropdown-toggle  ${
                openTab === 'price-range' && 'show'
              }`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Price Range
            </button>
            <ul
              className={`dropdown-menu filter-dropdown-menu price-range-menu ${
                openTab === 'price-range' ? 'show' : ''
              }`}
            >
              {priceRangeView?.map((item: any, index: number) => (
                <li
                  key={index}
                  className={`${
                    priceAttributesCounts[item.id] === 0 ? 'disabled-view' : ''
                  }`}
                >
                  <label className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={Boolean(priceRange?.includes(Number(item.id)))}
                      id={`filterPriceRangeCheckbox_${index}`}
                      name="sort"
                      onChange={(e) =>
                        handleCheckboxChange(e, item, 'priceRange')
                      }
                      value=""
                      className="filter-checkbox"
                    />
                    {`${
                      item?.min === 0
                        ? 'Under'
                        : `${priceWithCurrency(item?.min)} ${
                            item.max === Infinity ? '+' : ''
                          }`
                    }  ${
                      item.max === Infinity ? `` : priceWithCurrency(item.max)
                    }`}
                  </label>
                  <span className="filter-count">
                    ({priceAttributesCounts[item.id]})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {menuAttributes?.map((elem, index) => {
            return (
              <AttributeListing
                key={index}
                elem={elem}
                openTab={openTab}
                handleOpenClose={handleOpenClose}
                handleCheckboxChange={handleCheckboxChange}
                index={index}
                attributesCounts={attributesCounts || []}
                selectedAttributes={attributes || []}
              />
            );
          })}

          <div className="dropdown filter-dropdown">
            <button
              onClick={handleOpenCloseSideBar}
              className="btn btn-secondary dropdown-toggle more-filter-btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#more-filter"
              aria-controls="offcanvasRight"
            >
              More Filters
            </button>

            <SidebarDropdown
              attributesCounts={attributesCounts || []}
              discountAttributesCounts={discountAttributesCounts}
              data={sliderAttributes}
              searchFlag={searchFlag}
              productList={productList}
            />
          </div>
          {(isAnyFilterActive || discountFilter?.length > 0) && (
            <button
              className="btn btn-secondary clear-filters-btn"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </FilterdStyled>
  );
};

export default FilterProductSection;
