import { isEmpty, uniq } from 'lodash';
import api from '../../services/api';
import ROUTES from '../../utilities/api-routes';
import { useWishListStore } from './wishlist-store';

const { getState, setState } = useWishListStore;
export const getAllWishList = async () => {
  setState({ wishListLoading: true });
  try {
    const { data: result } = await api.get(ROUTES.getWishList());
    if (result.data) {
      const mappedWishList = result.data.map((item) => ({
        product_id: item.product_id,
        product_attribute_id: item.product_attribute_id,
      }));
      setState({
        wishlist: result.data,
        wishListProductIds: mappedWishList,
        wishlistCount: result.data.length,
        wishListLoading: false,
      });
    }
  } catch (e) {
    setState({
      wishlist: [],
      wishListProductIds: [],
      wishlistCount: 0,
      wishListLoading: false,
    });
  }
};

export const addToWishList = async (productId, productAttributeId) => {
  const { wishListProductIds, wishlistCount, wishListLoading } = getState();
  if (wishListLoading) {
    return;
  }
  setState({ wishListLoading: true });
  try {
    const { data: result } = await api.post(ROUTES.addToWishList(), {
      product_id: productId,
      product_attribute_id: productAttributeId,
    });
    if (!isEmpty(result)) {
      const isNotInWishList = wishListProductIds.find(
        (elem) =>
          elem?.product_id === result?.product_id &&
          elem?.product_attribute_id === result?.product_attribute_id
      );
      if (!isNotInWishList) {
        wishListProductIds.push({
          product_attribute_id: result?.product_attribute_id,
          product_id: result?.product_id,
        });
        setState({
          wishListProductIds: uniq(wishListProductIds),
          wishlistCount: wishlistCount + 1,
        });
      }
    } else {
      const arr = wishListProductIds.filter(
        (item) =>
          item?.product_id !== productId ||
          (item?.product_id === productId &&
            item?.product_attribute_id !== productAttributeId)
      );
      setState({
        wishListProductIds: uniq(arr),
        wishlistCount: wishlistCount > 0 ? wishlistCount - 1 : 0,
      });
      localStorage.removeItem('product_wishlist_id');
    }
    setState({
      wishListLoading: false,
    });
  } catch (e) {
    localStorage.removeItem('product_wishlist_id');
    setState({
      wishListLoading: false,
    });
  }
};

export const setLoading = (val) => {
  setState({
    loading: val,
  });
};

export const removeFromWishList = async (id: any, callback: any) => {
  setState({ loading: true });
  try {
    const { data: result } = await api.delete(ROUTES.removeFromWishList(id));
    if (result) {
      setState({ loading: false });
      callback && callback();
      getAllWishList();
      // setProductQuantity(value);
    }

    // eslint-disable-next-line no-empty
  } catch (e) {
    setState({ loading: false });
  }
};

export const updateWishlistCount = () => {
  const { wishlistCount } = getState();
  setState({ wishlistCount: Math.max(0, wishlistCount - 1) });
};

export const removeWishlistedItmes = () => {
  setState({
    wishlistCount: 0,
  });
};
