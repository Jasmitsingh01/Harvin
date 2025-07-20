import { toast } from 'react-toastify';
import api from '../../services/api';
import ROUTES from '../../utilities/api-routes';
import { useUserStore } from './user-store';
import {
  afterLoginAddToCart,
  getCartItems,
  removeCartItmes,
} from '../cart/cart-action';
import {
  LoginInput,
  LoginUsingOtpInput,
  RegisterInputs,
  SocialAuth,
} from '../../interface/common';
import { useCartStore } from '../cart/cart-store';
import {
  addToWishList,
  getAllWishList,
  removeWishlistedItmes,
} from '../wishlist/wishlist-action';
import { ModalTypeEnum } from '../../enums';
import { currentUser } from '../../utilities/helper';

const { setState } = useUserStore;
const { setState: setCartState } = useCartStore;

export const setProductToWishList = () => {
  const attr: any = localStorage.getItem('wishlistAttr');
  if (attr) {
    const data = JSON.parse(attr);
    const { product_id, product_attribute_id } = data;
    addToWishList(product_id, product_attribute_id);
    localStorage.removeItem('wishlistAttr');
  }
};

export const verifyOtpAction = async (data: { otp: string; email: any }) => {
  setState({ loadingVerify: true });

  try {
    const { data: result } = await api.post(ROUTES.verifyOtp(), data);
    setState({ loadingVerify: false });

    if (result.token) {
      loginModalOpen(false);
      const { userDetail } = result;
      localStorage.setItem('token', result?.token);
      localStorage.setItem('user', JSON.stringify(userDetail));
      toast.success(result?.messages);
      await afterLoginAddToCart(userDetail, true);
      setState({ modal: false, userDetail: userDetail, loading: false });
      setProductToWishList();
      //    inCartView && setCartState({ tab: 1 });
      return null;
    } else {
      return toast.error(result?.messages);
    }

    // return { result: result, error: null };
  } catch (e: any) {
    setState({ loadingVerify: false });
    return { userDetail: {}, error: e.messages };
  }
};

export const verifyOtpActionRegister = async (data: {
  otp: string;
  email: any;
}) => {
  setState({ loadingVerify: true });

  try {
    const { data: result } = await api.post(ROUTES.verifyOtpRegister(), data);
    setState({ loadingVerify: false });

    if (result.token) {
      loginModalOpen(false);
      const { userDetail } = result;
      localStorage.setItem('token', result?.token);
      localStorage.setItem('user', JSON.stringify(userDetail));
      toast.success(result?.messages);
      await afterLoginAddToCart(userDetail, true);
      setState({ modal: false, userDetail: userDetail, loading: false });
      setProductToWishList();
      //    inCartView && setCartState({ tab: 1 });
      return null;
    } else {
      return toast.error(result?.messages);
    }

    // return { result: result, error: null };
  } catch (e: any) {
    setState({ loadingVerify: false });
    return { userDetail: {}, error: e.messages };
  }
};

export const loginUsingOtpAction = async (
  data: LoginUsingOtpInput,

  loginCallback: any
) => {
  setState({ loading: true });

  try {
    const { data: result } = await api.post(ROUTES.logingUsingOTP(), data);
    setState({ loading: false });
    setState({ email: data?.email });

    if (result.status) {
      if (loginCallback) {
        loginCallback(3);
        // return null;
      }
      setModalType(ModalTypeEnum.verifyotp);
      return toast.success(result?.messages);
    } else {
      return toast.error(result?.messages);
    }

    // return { result: result, error: null };
  } catch (e: any) {
    setState({ loading: false });
    return { error: e.messages };
  }
};

export const loginUsingOtpActionRegister = async (
  data: any,

  loginCallback: any
) => {
  setState({ loading: true });

  try {
    const { data: result } = await api.post(ROUTES.logingUSingOTPregister(), {
      email: data?.email?.email,
    });
    setState({ loading: false });
    setState({ dataRegister: data });

    if (result.status == true) {
      if (loginCallback) {
        loginCallback(5);
        // return null;
      }
      setModalType(ModalTypeEnum.verifyotpregister);
      return toast.success(result?.messages);
    } else {
      return toast.error(result?.messages);
    }

    // return { result: result, error: null };
  } catch (e: any) {
    setState({ loading: false });
    return { error: e.messages };
  }
};

export const ResetPasswordAction = async (data, router: any) => {
  setState({ loading: true });
  const reqData = { ...data };
  try {
    const { data: result } = await api.post(ROUTES.resetPassword(), reqData);

    if (result.success) {
      toast.success(result?.messages);
      router?.replace('/home');
    } else {
      toast.error(result?.messages);
    }
    setState({ loading: false });

    return null;
    // return { result: result, error: null };
  } catch (e: any) {
    setState({ loading: false });
    return { error: e.messages };
  }
};
export const verifyTokenAction = async (data: any) => {
  const reqData = { ...data };
  try {
    const { data: result } = await api.post(ROUTES.verifyToken(), reqData);
    if (result.success) {
      setState({ email: result?.email });
      return toast.success(result?.messages);
    } else {
      return toast.error(result?.messages);
    }
  } catch (e: any) {
    return { error: e.messages };
  }
};
export const forgotPasswordAction = async (data: LoginUsingOtpInput) => {
  setState({ loading: true });
  const reqData = { ...data };
  try {
    const { data: result } = await api.post(ROUTES.forgotPassword(), reqData);

    if (result?.success) {
      setModalType(ModalTypeEnum.gotit);
      setState({
        email: data?.email,
        isForgotView: result?.success,
        loading: false,
      });
      toast.success(result?.messages);
    } else {
      setState({ loading: false });
      toast.error(result?.messages);
    }
  } catch (e: any) {
    setState({ loading: false });
  }
};

export const loginAction = async (data: LoginInput, inCartView = false) => {
  setState({ loading: true });

  const reqData = { ...data };
  try {
    const { data: result } = await api.post(ROUTES.login(), reqData);

    if (result.token) {
      const { userDetail } = result;
      localStorage.setItem('token', result?.token);
      localStorage.setItem('user', JSON.stringify(userDetail));
      toast.success(result?.messages);
      await afterLoginAddToCart(userDetail, true);
      setState({ modal: false, userDetail: userDetail, loading: false });
      setProductToWishList();
      getCartItems();
      inCartView && setCartState({ tab: 1 });
      return null;
    }

    setState({ loading: false });
    return toast.error(result?.messages);
    // return { result: result, error: null };
  } catch (e: any) {
    setState({ loading: false });
    return { userDetail: {}, error: e.messages };
  }
};
export const loginAuthAction = async (data: SocialAuth) => {
  // setState({ loading: true });
  try {
    const { data: result } = await api.post(ROUTES.loginAuth(), data);
    if (result.token) {
      const { userDetail } = result;
      localStorage.setItem('token', result?.token);
      localStorage.setItem('user', JSON.stringify(userDetail));
      setProductToWishList();
      toast.success(result?.messages);
      await afterLoginAddToCart(userDetail, true);
      setState({ modal: false, userDetail: userDetail, loading: false });
      getAllWishList();
      getCartItems();

      return null;
    }
    setState({ loading: false });
    return toast.error(result?.messages);
    // return { result: result, error: null };
  } catch (e: any) {
    setState({ loading: false });
    return { userDetail: {}, error: e.messages };
  }
};
export const registerUserAction = async (
  data: RegisterInputs,
  inCartView = false
) => {
  setState({ loading: true });
  try {
    const { data: result } = await api.post(ROUTES.registerUser(), data);
    if (result) {
      localStorage.setItem('token', result?.token);
      localStorage.setItem('user', JSON.stringify(result.userDetail));
      await afterLoginAddToCart(result.userDetail, true);
      setState({ userDetail: result.userDetail, loading: false, modal: false });
      setProductToWishList();
      inCartView && setCartState({ tab: 1 });
    }
    setState({ loading: false });
    return toast.error(result?.messages);
    // return { result: result, error: null };
  } catch (e: any) {
    setState({ loading: false });
    return toast.error(String(e?.email));
  }
};

export const loginModalOpen = async (value: boolean) => {
  return setState({ modal: value });
};
export const setModalType = (value: string) => {
  setState({
    modalType: value,
  });
};

export const logoutUser = (router) => {
  localStorage.clear();
  removeCartItmes();
  removeWishlistedItmes();
  router.push('/home');
  // window.location.reload();
};

// --------------------------for address ---------------------------
export const addUserAddressAction = async (payload: any, callBack?: any) => {
  setState({ addressLoading: true });
  try {
    const { data: result } = await api.post(ROUTES.userAddress(), payload);
    if (result) {
      callBack && callBack();
    }
    setCartState({ addressListView: true });
    setState({ addressLoading: false });
    return result;
  } catch (e: any) {
    setState({ addressLoading: false });
    return e.message;
  }
};

export const updateUserAddressAction = async (payload: any, callBack?: any) => {
  setState({ addressLoading: true });
  try {
    const { data: result } = await api.put(
      ROUTES.updateUserAddress(payload?.id),
      payload
    );
    setCartState({ addressListView: true });
    if (result) {
      toast.success('Address Updated Successfully!');
      setCartState({ updateAddress: null, updateAddressFlag: false });
      callBack && callBack();
    }
    setState({ addressLoading: false });
    return result;
  } catch (e: any) {
    setState({ addressLoading: false });
    toast.error('Somthing went wrong');
    return e.message;
  }
};

export const updateForgotScreen = () => {
  setState({ isForgotView: false });
};

export const updateUser = async (payload: any) => {
  const user = currentUser();
  setState({ loading: true });
  try {
    const { data: result } = await api.put(ROUTES.updateUser(user.id), payload);
    if (result) {
      localStorage.setItem('user', JSON.stringify(result));
      setState({
        userDetail: result,
      });
      toast.success('Succesfully update profile');
    }
    setState({ loading: false });
    // return toast.error(result?.message);
    // return { result: result, error: null };
  } catch (e: any) {
    setState({ loading: false });
    toast.error('The email has already been taken.');
    // return { userDetail: {}, error: e.message };
  }
};

export const accountRemoval = async (payload: any) => {
  // const user = currentUser();
  setState({ loading: true });
  try {
    const { data: result } = await api.post(ROUTES.accountRemoval(), payload);
    if (result) {
      // localStorage.setItem('user', JSON.stringify(result));
      // setState({
      //   userDetail: result,
      // });
      toast.success(result?.messages);
    }
    setState({ loading: false });
    // return toast.error(result?.message);
    // return { result: result, error: null };
  } catch (e: any) {
    setState({ loading: false });
    // toast.error('The email has already been taken.');
    // return { userDetail: {}, error: e.message };
  }
};
