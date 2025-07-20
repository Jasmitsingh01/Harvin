import { create } from 'zustand';

export const INTIAL_STATE = {
  wishlist: [],
  wishListProductIds: [],
  wishlistCount: 0,
  wishListLoading: false,
  loading: false,
};

export const useWishListStore = create(() => ({
  ...INTIAL_STATE,
}));

export const useAllWishlist = () => {
  return useWishListStore((s) => s.wishlist);
};
export const useAllWishlistCount = () => {
  return useWishListStore((s) => s.wishlistCount);
};
export const useWishListProductIds = () => {
  return useWishListStore((s) => s.wishListProductIds);
};

export const useWishlistLoading = () => {
  return useWishListStore((s) => ({
    wishListLoading: s.wishListLoading,
  }));
};

export const useLoading = () => {
  return useWishListStore((s) => s.loading);
};
