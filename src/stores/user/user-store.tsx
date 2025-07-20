import { isEmpty } from 'lodash';
import { create } from 'zustand';
import { currentUser } from '../../utilities/helper';
export const INTIAL_STATE = {
  modal: false,
  loading: false,
  loadingVerify: false,
  userDetail: {},
  modalType: '',
  error: null,
  email: null,
  isForgotView: false,
  addressLoading: false,
  addressModalPopup: false,
  dataRegister: null,
};

export const useUserStore = create(() => ({
  ...INTIAL_STATE,
}));

export const useLoading = () => {
  return useUserStore((s) => ({
    loading: s.loading,
    loadingVerify: s.loadingVerify,
  }));
};
export const userDetail = () => {
  return useUserStore((s) => ({
    result: isEmpty(s.userDetail) ? currentUser() : s.userDetail,
    loading: s.loading,
  }));
};
export const useModalData = () => {
  return useUserStore((s) => ({
    modalType: s.modalType,
    modal: s.modal,
  }));
};

export const getEmail = () => {
  return useUserStore((s) => ({
    email: s.email,
  }));
};

export const getDataRegister = () => {
  return useUserStore((s) => ({
    dataRegister: s.dataRegister,
  }));
};

export const forgotScreen = () => {
  return useUserStore((s) => ({
    isForgotView: s.isForgotView,
  }));
};
export const useAddressLoading = () => {
  return useUserStore((s) => ({
    addressLoading: s.addressLoading,
    addressModalPopup: s.addressModalPopup,
  }));
};

// export const userRegisterData = () => {
//   return useUserStore((s) => ({
//     loading: s.loading,
//     result: s.result,
//     login: s.login
//   }));
// };
