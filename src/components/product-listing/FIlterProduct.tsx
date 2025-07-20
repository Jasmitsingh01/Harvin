import React from 'react';

const FIlterProduct = () => {
  return (
    <section className="filter">
      <div className="container">
        <div className="filter-dropdown-wrap">
          <div className="dropdown filter-dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort
            </button>
            <ul className="dropdown-menu filter-dropdown-menu sort-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Recommended
                </a>
                <input type="radio" id="" name="sort" value="" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Newest
                </a>
                <input type="radio" id="" name="sort" value="" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Fast Shipping
                </a>
                <input type="radio" id="" name="sort" value="" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Price (Low to High)
                </a>
                <input type="radio" id="" name="sort" value="" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Price (Hight to Low)
                </a>
                <input type="radio" id="" name="sort" value="" />
              </li>
            </ul>
          </div>
          <div className="dropdown filter-dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Price Range
            </button>
            <ul className="dropdown-menu filter-dropdown-menu price-range-menu">
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  Under ₹ 19,999
                </a>
                <span className="filter-count">(11)</span>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  ₹ 20,000 - ₹ 29,999
                </a>
                <span className="filter-count">(104)</span>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  ₹ 30,000 - ₹ 39,999
                </a>
                <span className="filter-count">(96)</span>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  ₹ 40,000 - ₹ 49,999
                </a>
                <span className="filter-count">(72)</span>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  ₹ 50,000 - ₹ 59,999
                </a>
                <span className="filter-count">(24)</span>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  ₹ 60,000 - ₹ 69,999
                </a>
                <span className="filter-count">(12)</span>
              </li>
            </ul>
          </div>
          <div className="dropdown filter-dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Seats
            </button>
            <ul className="dropdown-menu filter-dropdown-menu price-range-menu seats-menu">
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  1 Seater
                </a>
                <span className="filter-count">(24)</span>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  2 Seater
                </a>
                <span className="filter-count">(11)</span>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  3 Seater
                </a>
                <span className="filter-count">(104)</span>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  L Shape
                </a>
                <span className="filter-count">(96)</span>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  3+1+1 Seater
                </a>
                <span className="filter-count">(72)</span>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  3+2 Seater
                </a>
                <span className="filter-count">(12)</span>
              </li>
            </ul>
          </div>
          <div className="dropdown filter-dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Color
            </button>
            <ul className="dropdown-menu filter-dropdown-menu price-range-menu">
              <li>
                <a className="dropdown-item" href="#">
                  <input
                    type="checkbox"
                    id=""
                    name="sort"
                    value=""
                    className="filter-checkbox"
                  />
                  <div className="color-filter"></div>
                  White
                </a>
                <span className="filter-count">(24)</span>
              </li>
              {/* <li>
                                <a className="dropdown-item" href="#">
                                    <input type="checkbox" id="" name="sort" value="" className="filter-checkbox" />
                                    <div className="color-filter" style="background-color: #D6616B;"></div>
                                    Cherry
                                </a>
                                <span className="filter-count">(11)</span>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <input type="checkbox" id="" name="sort" value="" className="filter-checkbox" />
                                    <div className="color-filter" style="background-color: #A55194;"></div>
                                    Purple
                                </a>
                                <span className="filter-count">(104)</span>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <input type="checkbox" id="" name="sort" value="" className="filter-checkbox" />
                                    <div className="color-filter" style="background-color: #FF7F0E;"></div>
                                    Orange
                                </a>
                                <span className="filter-count">(96)</span>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <input type="checkbox" id="" name="sort" value="" className="filter-checkbox" />
                                    <div className="color-filter" style="background-color: #9C9EDE;"></div>
                                    Lavender
                                </a>
                                <span className="filter-count">(72)</span>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <input type="checkbox" id="" name="sort" value="" className="filter-checkbox" />
                                    <div className="color-filter" style="background-color: #073958;"></div>
                                    Dark green
                                </a>
                                <span className="filter-count">(12)</span>
                            </li> */}
            </ul>
          </div>
          <div className="dropdown filter-dropdown">
            <button
              className="btn btn-secondary dropdown-toggle more-filter-btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#more-filter"
              aria-controls="offcanvasRight"
            >
              More Filters
            </button>

            <div
              className="offcanvas offcanvas-end"
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
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body more-filter-side">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
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
                      className="accordion-collapse collapse show"
                    >
                      <div className="accordion-body">
                        <ul className="filter-dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <input type="radio" id="" name="sort" value="" />
                              Recommended
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input type="radio" id="" name="sort" value="" />
                              Newest
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input type="radio" id="" name="sort" value="" />
                              Fast Shipping
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input type="radio" id="" name="sort" value="" />
                              Price (Low to High)
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input type="radio" id="" name="sort" value="" />
                              Price (Hight to Low)
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#price-range"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Price Range
                      </button>
                    </h2>
                    <div
                      id="price-range"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        <ul className="filter-dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              Under ₹ 19,999
                            </a>
                            <span className="filter-count">(11)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              ₹ 20,000 - ₹ 29,999
                            </a>
                            <span className="filter-count">(104)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              ₹ 30,000 - ₹ 39,999
                            </a>
                            <span className="filter-count">(96)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              ₹ 40,000 - ₹ 49,999
                            </a>
                            <span className="filter-count">(72)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              ₹ 50,000 - ₹ 59,999
                            </a>
                            <span className="filter-count">(24)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              ₹ 60,000 - ₹ 69,999
                            </a>
                            <span className="filter-count">(12)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#color"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Color
                      </button>
                    </h2>
                    <div id="color" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <ul className="filter-dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              <div className="color-filter"></div>
                              White
                            </a>
                            <span className="filter-count">(24)</span>
                          </li>
                          {/* <li>
                                                        <a className="dropdown-item" href="#">
                                                            <input type="checkbox" id="" name="sort" value="" className="filter-checkbox" />
                                                            <div className="color-filter" style="background-color: #D6616B;"></div>
                                                            Cherry
                                                        </a>
                                                        <span className="filter-count">(11)</span>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            <input type="checkbox" id="" name="sort" value="" className="filter-checkbox" />
                                                            <div className="color-filter" style="background-color: #A55194;"></div>
                                                            Purple
                                                        </a>
                                                        <span className="filter-count">(104)</span>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            <input type="checkbox" id="" name="sort" value="" className="filter-checkbox" />
                                                            <div className="color-filter" style="background-color: #FF7F0E;"></div>
                                                            Orange
                                                        </a>
                                                        <span className="filter-count">(96)</span>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            <input type="checkbox" id="" name="sort" value="" className="filter-checkbox" />
                                                            <div className="color-filter" style="background-color: #9C9EDE;"></div>
                                                            Lavender
                                                        </a>
                                                        <span className="filter-count">(72)</span>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            <input type="checkbox" id="" name="sort" value="" className="filter-checkbox" />
                                                            <div className="color-filter" style="background-color: #073958;"></div>
                                                            Dark green
                                                        </a>
                                                        <span className="filter-count">(12)</span>
                                                    </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#seater"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Seater
                      </button>
                    </h2>
                    <div id="seater" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <ul className="filter-dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              1 Seater
                            </a>
                            <span className="filter-count">(24)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              2 Seater
                            </a>
                            <span className="filter-count">(11)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              3 Seater
                            </a>
                            <span className="filter-count">(104)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              L Shape
                            </a>
                            <span className="filter-count">(96)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              3+1+1 Seater
                            </a>
                            <span className="filter-count">(72)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              3+2 Seater
                            </a>
                            <span className="filter-count">(12)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#design"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Design
                      </button>
                    </h2>
                    <div id="design" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <ul className="filter-dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              L-Shape Sofa
                            </a>
                            <span className="filter-count">(24)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              Sofa cum Bed
                            </a>
                            <span className="filter-count">(11)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#brand"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Brand
                      </button>
                    </h2>
                    <div id="brand" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <ul className="filter-dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              WoodenStreet
                            </a>
                            <span className="filter-count">(24)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              CasaStyle Sofa
                            </a>
                            <span className="filter-count">(11)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#material"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Material
                      </button>
                    </h2>
                    <div id="material" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <ul className="filter-dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              Fabric Sofa
                            </a>
                            <span className="filter-count">(24)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              Wooden Sofa
                            </a>
                            <span className="filter-count">(11)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#discount"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Discount
                      </button>
                    </h2>
                    <div id="discount" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <ul className="filter-dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              40% Off
                            </a>
                            <span className="filter-count">(24)</span>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <input
                                type="checkbox"
                                id=""
                                name="sort"
                                value=""
                                className="filter-checkbox"
                              />
                              20% Off
                            </a>
                            <span className="filter-count">(11)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="side-filter-btn-wrap">
                <button className="btn btn-theme view-filter">
                  View (123)
                </button>
                <button className="btn cancel-filter">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FIlterProduct;
