import { create } from 'zustand';

export const INTIAL_STATE = {
  products: [],
  product: {},
  loading: false,
  colorList: [],
  error: null,
  productList: [],
  moreFilterList: [],
  moreFilterSlider: false,
  filterAttributes: {
    attributes: [],
    priceRange: [],
    sortFilter: [],
    discountFilter: [],
  },
  currentPage: 1,
  sidebarModal: false,
  productCountAttributes: {},
  priceAttributesCounts: {},
  discountAttributesCounts: {},
};

export const useProductListingStore = create(() => ({
  ...INTIAL_STATE,
}));

export const useProductListingData = () => {
  return useProductListingStore((s) => ({
    loading: s.loading,
    products: s.products,
    error: s.error,
    colorList: s.colorList,
    productList: s.productList,
    moreFilterSlider: s.moreFilterSlider,
    moreFilterList: s.moreFilterList,
    currentPage: s.currentPage,
  }));
};

export const useProductCountAttributes = () => {
  return useProductListingStore((s) => ({
    attributesCounts: s.productCountAttributes,
    priceAttributesCounts: s.priceAttributesCounts,
    discountAttributesCounts: s.discountAttributesCounts,
  }));
};

export const useProductFilterAttributes = () => {
  return useProductListingStore((s) => s.filterAttributes);
};

export const useProductCurrentPage = () => {
  return useProductListingStore((s) => s.currentPage);
};

// export const openSidebarModal = () => {
//   return useProductListingStore((s) => s.sidebarModal);
// };

export const openSidebarModal = () => {
  return useProductListingStore((s) => ({
    sidebarModal: s.sidebarModal,
  }));
};
