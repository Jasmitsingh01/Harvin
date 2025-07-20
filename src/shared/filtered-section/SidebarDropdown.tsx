import React, { useState } from 'react';
import { SidebarDropdownStyle } from './styled';
import {
  openSidebarModal,
  useProductFilterAttributes,
} from '../../stores/product-listing/product-listing-store';
import {
  openCloseSidebarModal,
  updateFilter,
} from '../../stores/product-listing/product-listing-action';
import { updateSearchFilter } from '../../stores/search/search-action';
import { useProductSearchFilterAttributes } from '../../stores/search/search-store';
import { discountFilterData, sortFilterData } from '../fields/field-data';

const SidebarDropdown = ({
  data,
  searchFlag,
  attributesCounts,
  productList,
  discountAttributesCounts, // productList,
}: any) => {
  const { attributes, sortFilter, discountFilter } = searchFlag
    ? useProductSearchFilterAttributes()
    : useProductFilterAttributes();
  const [openTab, setOpenTab] = useState('sortBy');
  const { sidebarModal } = openSidebarModal();
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: any,
    type: string
  ) => {
    const isChecked = e.target.checked;
    searchFlag
      ? updateSearchFilter(isChecked, item?.id, type)
      : updateFilter(isChecked, item?.id, type);
  };

  const handleCloseTab = () => {
    openCloseSidebarModal(false);
  };

  const handleTabChange = (tab) => {
    setOpenTab((prevTab) => (prevTab === tab ? '' : tab));
  };

  const handleClearFilters = () => {
    updateFilter({}, 'all', 'clear');
    updateSearchFilter({}, 'all', 'clear');
  };
  return (
    <SidebarDropdownStyle
      className={`offcanvas offcanvas-end ${sidebarModal ? 'show' : ''}`}
      id="more-filter"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title text-18 weight-600"
          id="offcanvasRightLabel"
        >
          Filter & Sort
        </h5>
        <button
          onClick={handleCloseTab}
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body more-filter-side ">
        <div className="accordion" id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                onClick={() => handleTabChange('sortBy')}
                className={`accordion-button  ${
                  openTab === 'sortBy' ? 'collapsed' : ''
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sort-by"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Sort By
              </button>
            </h2>
            <div
              id="sort-by"
              className={`accordion-collapse ${
                openTab === 'sortBy' ? 'show' : ''
              }`}
            >
              <div className="accordion-body">
                <ul className="filter-dropdown-menu">
                  {sortFilterData.map((item: any, index: any) => (
                    <li key={index}>
                      <label className="dropdown-item">
                        <input
                          type="radio"
                          checked={sortFilter?.includes(Number(item.id))}
                          id={`filterPriceRangeCheckbox_${index}`}
                          name="sortFilter"
                          onChange={(e) =>
                            handleCheckboxChange(e, item, 'sortFilter')
                          }
                          value={sortFilter?.includes(Number(item.id))}
                          className="filter-checkbox"
                        />
                        {item.label}
                      </label>
                      {/* <span className="filter-count">
                        ({productList?.length || 0})
                      </span> */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {data?.map((elem) => {
            return (
              <div className="accordion-item" key={elem?.value}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${
                      openTab === String(elem.name) ? '' : 'collapsed'
                    }`}
                    aria-expanded={openTab === elem?.name ? 'true' : 'false'}
                    type="button"
                    onClick={() => handleTabChange(elem?.name)}
                    // data-bs-toggle="collapse"
                    data-bs-target="#seater"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    {elem?.name}
                  </button>
                </h2>
                <div
                  id="seater"
                  className={`accordion-collapse ${
                    openTab === elem?.name ? 'show' : ''
                  }`}
                >
                  <div className="accordion-body">
                    <ul
                      className={`filter-dropdown-menu ${
                        openTab === elem?.name ? '' : 'collapse'
                      }`}
                    >
                      {elem?.values.map((item) => {
                        const isChecked = attributes?.includes(
                          parseInt(item.id)
                        );

                        const arr = attributesCounts[elem.id];
                        const obj = arr?.find(
                          (c) =>
                            c.id === item.id &&
                            c.attribute_id === item.attribute_id
                        );

                        return (
                          <li
                            key={item?.value}
                            className={`${
                              (obj?.count || 0) === 0 ? 'disabled-view' : ''
                            }`}
                          >
                            <label className="dropdown-item">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                checked={Boolean(isChecked)} // Set the checked attribute
                                className="filter-checkbox"
                                onChange={(e) =>
                                  handleCheckboxChange(e, item, 'attributes')
                                }
                              />
                              {item?.value}
                            </label>
                            <span className="filter-count">({obj?.count})</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                onClick={() => handleTabChange('discount')}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#discount"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Discount
              </button>
            </h2>
            <div
              id="discount"
              className={`accordion-collapse ${
                openTab === 'discount' ? 'show' : ''
              }`}
            >
              <div className="accordion-body">
                <ul
                  className={`filter-dropdown-menu ${
                    openTab === 'discount' ? '' : 'collapse'
                  }`}
                >
                  {discountFilterData.map((item) => {
                    const isChecked = discountFilter?.includes(
                      parseInt(Number(item.id) as any)
                    );
                    return (
                      <li
                        key={item?.label}
                        className={`${
                          discountAttributesCounts[item.id] === 0
                            ? 'disabled-view'
                            : ''
                        }`}
                      >
                        <label className="dropdown-item">
                          <input
                            type="checkbox"
                            id="discount-checkbox"
                            name="discount"
                            value=""
                            checked={Boolean(isChecked)} // Set the checked attribute
                            className="filter-checkbox"
                            onChange={(e) =>
                              handleCheckboxChange(e, item, 'discountFilter')
                            }
                          />
                          {item?.label}
                        </label>
                        <span className="filter-count">
                          ({discountAttributesCounts[item.id]})
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`side-filter-btn-wrap ${!sidebarModal && 'd-none'} `}>
        <button
          onClick={handleClearFilters}
          className="btn btn-theme view-filter"
        >
          View {productList?.length}
        </button>
        <button className="btn cancel-filter" onClick={handleCloseTab}>
          Cancel
        </button>
      </div>
    </SidebarDropdownStyle>
  );
};

export default SidebarDropdown;
