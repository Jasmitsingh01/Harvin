import { useCouponStore } from './coupon-store';
import api from '../../services/api';
import ROUTES from '../../utilities/api-routes';
import { map } from 'lodash';
import { calculateTotal } from '../cart/cart-action';

const { setState } = useCouponStore;

// const getData = (items: any, code: string,price:any) => {
//   const productIds = map(items, (item) => item?.product_id);
//   const categoryIds = map(items, (item) => item?.product?.default_category);
//   const amount = calculateTotal(items);

//   return {
//     product_id: productIds.join(','),
//     category_id: categoryIds.join(','),
//     code: code,
//     amount: amount,
//   };
// };

const getData = (items: any, code: string, price: any) => {
  const productIds = map(items, (item) => item?.product_id);
  let categoryIds = map(items, (item) => item?.product?.default_category);
  const amount =
    !isNaN(price) && price !== null ? price : calculateTotal(items);

  // Use the provided price or calculate it

  // If price is not null, update categoryIds with item.default_category
  if (price !== null) {
    categoryIds = items[0].default_category;
  }

  return {
    product_id: productIds.join(','),
    category_id:
      price !== null ? items[0].default_category : categoryIds.join(','),
    code: code,
    amount: amount,
  };
};

export const removeCoupon = () => {
  setState({ coupon: null });
};

export const couponValid = async (coupon) => {
  try {
    const response = await api.post(ROUTES.verifyCoupon(), {
      code: coupon.code,
    });
    if (response?.data?.is_valid) {
      setState({ loading: false, loadingId: null, error: null, errorId: null });
    } else {
      throw new Error('Invalid coupon');
    }
  } catch (error) {
    throw new Error('Invalid coupon');
  }
};

// export const applyCoupon = async (items: any, coupon: any) => {
//   const data = getData(items, coupon.code);
//   setState({ loading: true, loadingId: coupon.id, error: null, errorId: null });

//   try {
//     await couponValid(coupon);
//     const response = await api.post(ROUTES.applyCoupon(), data);
//     if (response?.data?.is_valid) {
//       setState({
//         loading: false,
//         loadingId: null,
//         coupon: { ...response.data.coupon, ...coupon },
//       });
//     } else {
//       setState({
//         loading: false,
//         loadingId: null,
//       });
//     }
//   } catch (error) {
//     setState({
//       loading: false,
//       errorId: coupon.id,
//       loadingId: null,
//       error: error.message || 'Issue in applying coupon',
//     });
//   }
// };

export const applyCoupon = async (
  items: any,
  coupon: any,
  price: any = null
) => {
  const data = getData(items, coupon.code, price); // Pass the price to getData
  setState({ loading: true, loadingId: coupon.id, error: null, errorId: null });

  try {
    await couponValid(coupon);
    const response = await api.post(ROUTES.applyCoupon(), data);
    if (response?.data?.is_valid) {
      setState({
        loading: false,
        loadingId: null,
        coupon: { ...response.data.coupon, ...coupon },
      });
    } else {
      setState({
        loading: false,
        loadingId: null,
      });
    }
  } catch (error) {
    setState({
      loading: false,
      errorId: coupon.id,
      loadingId: null,
      error: error.message || 'Invalid Coupon',
    });
  }
};

export const CouponRemoveData = () => {
  setState({
    coupon: null,
  });
};
