import { create } from 'zustand';
// import { postProduct } from '../home-actions';

export const INTIAL_STATE: any = {
  product: null,
  combinationLoading: true,
  productCombinations: [],
  selectedCombination: {},
  combinationData: [],
  combinations: [],
  loading: false,
  error: null,
  attributes: {},
  validateLoading: false,
  validateDetailLoading: false,
  productDetailError: null,
  productRating: null,
  productReview: null,
  discountedPrice: null,
  sidebarTab: '',
  codeCheckLoading: false,
  pincodeError: '',
  pincodeSuccess: '',
  pincodeEntered: false,
};

export const useProductDetailStore = create(() => ({
  ...INTIAL_STATE,
}));

export const useCombinationData = () => {
  return useProductDetailStore((s) => ({
    data: s.combinationData,
    loading: s.combinationLoading,
    selectedCombination: s.selectedCombination,
  }));
};

export const useSelectedProductCombination = () => {
  return useProductDetailStore((s) => s.selectedProductCombination || {});
};

export const useProductDetailData = () => {
  return useProductDetailStore((s) => ({
    loading: s.loading,
    product: s.product,
    error: s.error,
    combinations: s.combinations,
    attributes: s.attributes,
    productRating: s.productRating,
    productReview: s.productReview,
    discountedPrice: s.discountedPrice,
    sidebarTab: s.sidebarTab,
  }));
};

export const useProduct = () => {
  return useProductDetailStore((s) => s.product);
};

export const useValidationLoading = () => {
  return useProductDetailStore((s) => s.validateLoading);
};

export const useProductDetailValidate = () => {
  return useProductDetailStore((s) => ({
    validateDetailLoading: s.validateDetailLoading,
    productDetailError: s.productDetailError,
    codeCheckLoading: s.codeCheckLoading,
    pincodeError: s.pincodeError,
    pincodeSuccess: s.pincodeSuccess,
    codeCheckLoadingCart: s.codeCheckLoadingCart,
    pincodeErrorCart: s.pincodeErrorCart,
    pincodeSuccessCart: s.pincodeSuccessCart,
  }));
};

export const useIsPincodeEntered = () => {
  return useProductDetailStore((s) => s.pincodeEntered);
};
