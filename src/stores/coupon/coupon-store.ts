import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CouponState {
  loading: boolean;
  error: string | null;
  errorId: string | null;
  loadingId: string | null;
  coupon: any;
}

export const COUPON_INITIAL_STATE: CouponState = {
  loading: false,
  error: null,
  loadingId: null,
  errorId: null,
  coupon: {},
};

export const useCouponStore = create(
  persist(
    () => ({
      ...COUPON_INITIAL_STATE,
    }),
    {
      name: 'coupon-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useCouponData = () => {
  return useCouponStore((s) => ({
    loading: s.loading,
    loadingId: s.loadingId,
    errorId: s.errorId,
    error: s.error,
    coupon: s.coupon,
  }));
};
export const useCoupon = () => {
  return useCouponStore((s) => ({
    coupon: s.coupon,
  }));
};

export const useCouponRemoveData = () => {
  return useCouponStore(() => ({
    coupon: null,
  }));
};
