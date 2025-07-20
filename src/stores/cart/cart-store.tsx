import { create } from 'zustand';
// import { postProduct } from '../home-actions';
import { persist, createJSONStorage } from 'zustand/middleware';
export const INTIAL_STATE: any = {
  cartItems: [],
  total: null,
  totalItemPrice: 0,
  totalDiscountPrice: 0,
  loading: false,
  error: null,
  itemPerPice: 50,
  tab: 0,
  stepLoading: false,
  addtocartLoading: false,
  validateLoading: {},
  selectedProduct: {},
  addressTab: true,
  addressListView: true,
  meLoading: false,
  meData: {},
  selectedAddress: {},
  deleteAddressId: null,
  deleteAddressLoading: false,
  updateAddress: null,
  updateAddressFlag: false,
  stateloading: false,
  states: [],
  selectedGST: {},
};

export const useCartStore = create(
  persist(
    () => ({
      ...INTIAL_STATE,
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
export const useCartCount = () => {
  return useCartStore((s) => s.cartItems.length);
};

export const useAddToCartLoading = () => {
  return useCartStore((s) => s.addtocartLoading);
};

export const useValidateProductLoading = (product_id: number | string) => {
  return useCartStore((s) => s.validateLoading[product_id]);
};

export const useCartItmes = () => {
  return useCartStore((s) => ({
    loading: s.loading,
    cartItems: s.cartItems,
    total: [],
    error: s.error,
  }));
};

export const useStepLoading = () => {
  useCartStore((s) => s.stepLoading);
};

export const useSetSelectedProduct = (product: any) => {
  return useCartStore.setState({
    selectedProduct: product,
  });
};

export const useMeData = () => {
  return useCartStore((s) => ({
    meLoading: s.loading,
    meData: s.meData,
  }));
};

export const useSelectedAddress = () => {
  return useCartStore((s) => ({
    selectedAddress: s.selectedAddress,
    deleteAddressLoading: s.deleteAddressLoading,
  }));
};

export const useSelectedGST = () => {
  return useCartStore((s) => ({
    selectedGST: s.selectedGST,
    // deleteAddressLoading: s.deleteAddressLoading,
  }));
};

export const getAddressId = () => {
  return useCartStore((s) => ({
    deleteAddressId: s.deleteAddressId,
    deleteAddressLoading: s.deleteAddressLoading,
  }));
};

export const useAddressListView = () => {
  return useCartStore((s) => ({
    addressListView: s.addressListView,
  }));
};

export const useUpdateUserAddressDetail = () => {
  return useCartStore((s) => ({
    updateAddress: s.updateAddress,
    updateAddressFlag: s.updateAddressFlag,
  }));
};

export const useGetAllStates = () => {
  return useCartStore((s) => ({
    loading: s.stateloading,
    states: s.states,
  }));
};
