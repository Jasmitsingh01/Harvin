import { create } from 'zustand';
// import { postProduct } from '../home-actions';
import { persist, createJSONStorage } from 'zustand/middleware';
export const INTIAL_STATE: any = {
  lastViewedItems: [],

  loading: false,
  error: null,
};
export const useLastViewedStore = create(
  persist(
    () => ({
      ...INTIAL_STATE,
    }),
    {
      name: 'last-review-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useLastViewedItmes = () => {
  return useLastViewedStore((s) => ({
    loading: s.loading,
    lastViewedItems: s.lastViewedItems,
    total: [],
    error: s.error,
  }));
};
