import { create } from 'zustand';

export const INTIAL_STATE = {
  products: [],
  product: {},
  loading: false,
  error: null,
};

export const useHomeStore = create(() => ({
  ...INTIAL_STATE,
}));

export const useAllProducts = () => {
  return useHomeStore((s) => ({
    loading: s.loading,
    products: s.products,
    error: s.error,
  }));
};

export const useProduct = () => {
  return useHomeStore((s) => ({
    loading: s.loading,
    product: s.product,
    error: s.error,
  }));
};
