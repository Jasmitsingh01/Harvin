import { create } from 'zustand';
// import { postProduct } from '../home-actions';
export const INTIAL_STATE: any = {
  searchedItems: [],
  searchResultData: [],
  categoryList: [],
  productList: [],
  loading: true,
  error: null,
  currentPage: 1,
  filterAttributes: {
    attributes: [],
    priceRange: [],
    sortFilter: [],
    discountFilter: [],
  },
  productCountAttributes: {},
  priceAttributesCounts: {},
  discountAttributesCounts: {},
};

export const useSearchStore = create(() => ({
  ...INTIAL_STATE,
}));

export const useSearchData = () => {
  return useSearchStore((s) => ({
    searchedItems: s.searchedItems,
    loading: s.loading,
    error: s.error,
  }));
};

export const useSearchGetData = () => {
  return useSearchStore((s) => ({
    searchResultData: s.searchResultData,
    categoryList: s.categoryList,
    productList: s.productList,
    loading: s.loading,
    error: s.error,
  }));
};

export const useCurrentPage = () => {
  return useSearchStore((s) => s.currentPage);
};
export const useProductSearchFilterAttributes = () => {
  return useSearchStore((s) => s.filterAttributes);
};

export const useProductSearchCountAttributes = () => {
  return useSearchStore((s) => ({
    attributesCounts: s.productCountAttributes,
    priceAttributesCounts: s.priceAttributesCounts,
    discountAttributesCounts: s.discountAttributesCounts,
  }));
};
