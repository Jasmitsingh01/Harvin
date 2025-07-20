// // order-store.js

// import { create } from 'zustand';

// export const ORDER_INITIAL_STATE = {
//   orderItems: [],
//   status: null,
//   amount: null,
//   paidTotal: null,
//   total: null,
//   customerContact: null,
//   paymentGateway: null,
//   billingAddress: null,
//   shippingAddress: null,
//   cartId: null,
//   couponId: null,
//   loading: true,
//   error: null,
//   placedItems:{}
// };

// export const useOrderStore = create(() => ({
//   ...ORDER_INITIAL_STATE,
// }));

// export const useOrderData = () => {
//   return useOrderStore((s) => ({
//     orderItems: s.orderItems,
//     loading: s.loading,
//     error: s.error,
//     placedItems:s.placedItems
//   }));
// };

// order-store.ts

import { create } from 'zustand';

interface OrderState {
  orderItems: any[];
  status: string | null;
  amount: number | null;
  paidTotal: number | null;
  total: number | null;
  customerContact: string | null;
  paymentGateway: string | null;
  billingAddress: string | null;
  shippingAddress: string | null;
  cartId: string | null;
  couponId: string | null;
  loading: boolean;
  error: string | null;
  placedItems: {
    id?: any;
  };
}

export const ORDER_INITIAL_STATE: OrderState = {
  orderItems: [],
  status: null,
  amount: null,
  paidTotal: null,
  total: null,
  customerContact: null,
  paymentGateway: null,
  billingAddress: null,
  shippingAddress: null,
  cartId: null,
  couponId: null,
  loading: null,
  error: null,
  placedItems: {},
};

export const useOrderStore = create<OrderState>(() => ({
  ...ORDER_INITIAL_STATE,
}));

export const useOrderData = () => {
  return useOrderStore((s) => ({
    orderItems: s.orderItems,
    loading: s.loading,
    error: s.error,
    placedItems: s.placedItems,
  }));
};

export const useGetOrderData = () => {
  return useOrderStore((s) => ({
    orderItems: s.orderItems,
    loading: s.loading,
    error: s.error,
    placedItems: s.placedItems,
  }));
};
