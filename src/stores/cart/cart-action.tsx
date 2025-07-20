import { isEmpty, map, sumBy } from 'lodash';
import api from '../../services/api';
import ROUTES from '../../utilities/api-routes';
import { useCartStore, useSetSelectedProduct } from './cart-store';
import { NextRouter } from 'next/router';
import { UserDetailType } from '../../interface/common';
import MESSAGES from '../../constants';
import LZString from 'lz-string';
import {
  combineArray,
  discountDifference,
  filterCartsData,
  isUserLoggedIn,
} from '../../utilities/helper';
import { toast } from 'react-toastify';

const { setState, getState } = useCartStore;

export const getCartItems = async () => {
  const { cartItems } = getState();
  if (localStorage.token) {
    setState({
      loading: true,
    });

    try {
      const { data: result } = await api.get(ROUTES.getCartItems());
      if (!isEmpty(result)) {
        return setState({
          cartItems: [...combineArray([], result.cart_products)],
          loading: false,
          totalItemPrice: result.total,
        });
      } else {
        return setState({
          cartItems: [],
          loading: false,
        });
      }
    } catch (e: any) {
      const cart_products = e.cart_products || [];
      return setState({
        cartItems: isEmpty(cartItems)
          ? [...cart_products]
          : [...combineArray(cartItems, cart_products)],
        loading: false,
        error: e.messages,
      });
    }
  }
};

export const createCart = async (data: any) => {
  const { cartItems } = getState();

  const products = map(data, (item) => ({
    product_id: item.product_id,
    product_attribute_id: item.product_attribute_id || item.id,
    quantity: item.selectQuantity || item.quantity || 1,
    unit_price: item.unit_price || item.price,
  }));

  const payload = {
    total: products.length,
    products: products,
    totalUniqueItems: products.length,
  };

  try {
    const { data: result } = await api.post(
      ROUTES.postCartItems(),
      payload,
      false
    );

    const products = result.cart_products || result.products || result;

    console.log(products, 'products');

    const productsData = isUserLoggedIn()
      ? [...filterCartsData(cartItems, products, true)]
      : combineArray(data, products);

    await setState({
      cartItems: productsData,
      addtocartLoading: false,
    });
  } catch (error) {
    if (error.message === MESSAGES.ValidationError) {
      const products = error.products || error.cart_products;

      const productsData = isUserLoggedIn()
        ? [...filterCartsData(cartItems, products, false)]
        : combineArray(data, products);
      await setState({
        cartItems: productsData,
        addtocartLoading: false,
      });
    }
  }
};

export const createCartAddress = async (data: any, selectedAddress: any) => {
  const { cartItems } = getState();

  const products = map(data, (item) => ({
    product_id: item.product_id,
    product_attribute_id: item.product_attribute_id || item.id,
    quantity: item.selectQuantity || item.quantity || 1,
    unit_price: item.unit_price || item.price,
  }));

  const payload = {
    total: products.length,
    products: products,
    totalUniqueItems: products.length,
    delivery_address_id: selectedAddress?.id,
  };

  try {
    const { data: result } = await api.post(
      ROUTES.postCartItems(),
      payload,
      false
    );

    const products = result.cart_products || result.products || result;

    console.log(products, 'products');

    const productsData = isUserLoggedIn()
      ? [...filterCartsData(cartItems, products, true)]
      : combineArray(data, products);

    await setState({
      cartItems: productsData,
      addtocartLoading: false,
    });

    // If successful response, proceed to tab 2
    setState({
      tab: 2,
    });
  } catch (error) {
    if (error.message === MESSAGES.ValidationError) {
      const products = error.products || error.cart_products;

      const productsData = isUserLoggedIn()
        ? [...filterCartsData(cartItems, products, false)]
        : combineArray(data, products);
      await setState({
        cartItems: productsData,
        addtocartLoading: false,
      });

      // Show toast message for validation error
      toast.error(error.message);
    } else {
      // Show toast message for other errors
      toast.error(error.message);
    }
  }
};

export const createSelectedCartAddress = async (
  data: any,
  selectedAddress: any
) => {
  const { cartItems } = getState();

  const product = {
    product_id: data.product_id, // Assuming data.id is the product ID
    product_attribute_id: data.product_attribute_id || data.id,
    quantity: data.minimum_quantity || data.quantity || 1,
    unit_price: data.unit_price || data.price,
  };

  const payload = {
    total: 1,
    products: [product],
    totalUniqueItems: 1,
    delivery_address_id: selectedAddress?.id,
  };

  try {
    const { data: result } = await api.post(
      ROUTES.postCartItems(),
      payload,
      false
    );

    const products = result.cart_products || result.products || result;

    console.log(products, 'products');

    const productsData = isUserLoggedIn()
      ? [...filterCartsData(cartItems, products, true)]
      : combineArray(data, products);

    await setState({
      cartItems: productsData,
      addtocartLoading: false,
    });

    // If successful response, proceed to tab 2
    setState({
      tab: 2,
    });
  } catch (error) {
    if (error.message === MESSAGES.ValidationError) {
      const products = error.products || error.cart_products;

      const productsData = isUserLoggedIn()
        ? [...filterCartsData(cartItems, products, false)]
        : combineArray(data, products);
      await setState({
        cartItems: productsData,
        addtocartLoading: false,
      });

      // Show toast message for validation error
      toast.error(error.message);
    } else {
      // Show toast message for other errors
      toast.error(error.message);
    }
  }
};

const getCartsData = async () => {
  const { cartItems } = getState();
  try {
    const { data: result } = await api.get(ROUTES.getCartItems());
    return [...combineArray(cartItems, result.cart_products)];
  } catch (e) {
    const cart_products = e.cart_products || [];
    return isEmpty(cartItems)
      ? [...cart_products]
      : [...combineArray(cartItems, cart_products)];
  }
};
export const updateCart = async (data, userDetail, defaultLogin) => {
  let { cartItems } = getState();
  if (defaultLogin) {
    cartItems = await getCartsData();
  }
  const products = map(data, (item) => ({
    product_id: item.product_id,
    product_attribute_id: item.product_attribute_id || item.id,
    quantity: item.selectQuantity || item.quantity,
    unit_price: item.unit_price || item.price,
  }));

  const payload = {
    total: 5,
    products: products,
    totalUniqueItems: 5,
  };

  try {
    const { data: result } = await api.put(
      ROUTES.updateCartItem(userDetail.is_cart),
      payload
    );
    await setState({
      cartItems: [...filterCartsData(cartItems, result, true)],
    });
  } catch (error) {
    if (error.message === MESSAGES.ValidationError) {
      const cart_products = error.products || error.cart_products;
      await setState({
        cartItems: [...filterCartsData(cartItems, cart_products, false)],
      });
    }
  }
};

export const afterLoginAddToCart = async (
  userDetail: UserDetailType | object,
  defaultLogin = true
) => {
  const { cartItems } = getState();
  const { is_cart } = userDetail as UserDetailType;
  if (!is_cart) {
    await createCart(cartItems);
  } else {
    await updateCart(cartItems, userDetail, defaultLogin);
  }
};

export const proceedToAddAddress = async () => {
  const { cartItems } = getState();
  setState({
    stepLoading: true,
  });
  await createCart(cartItems);
  setState({
    tab: 1,
    stepLoading: false,
  });
};

export const calculateTotal = (items: any[]) => {
  const data = items.filter((item) => !item.errorMessage);
  return sumBy(
    data,
    (item) =>
      (item?.base_price || item?.unit_price) *
        (item?.selectQuantity || item?.select_quantity) || 0
  );
};

export const calculateDiscount = (items: any[]) => {
  const data = items.filter((item) => !item.errorMessage);
  return sumBy(data, (item) => discountDifference(item));
};

// export const calculateMainTotalLogin = (items: any[], coupon: any) => {
//   const data = items.filter((item) => !item.errorMessage);

//   const discountedPrice = sumBy(data, (item) => discountDifference(item));

//   const assemblyCharges =
//     sumBy(data, (item: any) => item?.assembly_charges) || 0;
//   const total =
//     sumBy(
//       data,
//       (item) =>
//         (item?.base_price || item?.unit_price) *
//         (item?.selectQuantity || item?.select_quantity)
//     ) || 0;
//   if (!isEmpty(coupon)) {
//     return assemblyCharges + total - discountedPrice - coupon.discount_amount;
//   }
//   return assemblyCharges + total - discountedPrice;
// };

export const calculateMainTotal = (
  items: any[],
  coupon: any,
  showGST: boolean = true
) => {
  const data = items.filter((item) => !item.errorMessage);

  // Calculate total price of all items
  const total =
    sumBy(
      data,
      (item) =>
        (item?.base_price || item?.unit_price) *
        (item?.selectQuantity || item?.select_quantity)
    ) || 0;

  // Calculate total discount
  const discountedPrice = sumBy(data, (item) => discountDifference(item));

  // Calculate assembly charges
  const assemblyCharges =
    sumBy(data, (item: any) => item?.assembly_charges) || 0;

  // Calculate total SGST charges if showGST is true, otherwise set it to 0
  const totalSGSTCharges = calcuLateSGSTCharges(showGST);

  // Calculate total CGST charges if showGST is true, otherwise set it to 0
  const totalCGSTCharges = calcuLateCGSTCharges(showGST);

  // Calculate main total
  let mainTotal = assemblyCharges + total - discountedPrice;

  // If there's a coupon, subtract its discount amount
  if (!isEmpty(coupon)) {
    mainTotal -= coupon.discount_amount;
  }

  // Add SGST and CGST charges to the main total if showGST is true
  if (showGST) {
    mainTotal += totalSGSTCharges + totalCGSTCharges;
  }

  return mainTotal;
};

// export const calculateMainTotal = (items: any[], coupon: any) => {
//   const data = items.filter((item) => !item.errorMessage);

//   // Calculate total price of all items
//   const total = sumBy(
//     data,
//     (item) =>
//       (item?.base_price || item?.unit_price) *
//       (item?.selectQuantity || item?.select_quantity)
//   ) || 0;

//   // Calculate total discount
//   const discountedPrice = sumBy(data, (item) => discountDifference(item));

//   // Calculate assembly charges
//   const assemblyCharges = sumBy(data, (item: any) => item?.assembly_charges) || 0;

//   // Calculate total SGST charges
//   const totalSGSTCharges = calcuLateSGSTCharges();

//   // Calculate total CGST charges
//   const totalCGSTCharges = calcuLateCGSTCharges();

//   // Calculate main total
//   let mainTotal = assemblyCharges + total - discountedPrice;

//   // If there's a coupon, subtract its discount amount
//   if (!isEmpty(coupon)) {
//     mainTotal -= coupon.discount_amount;
//   }

//   // Add SGST and CGST charges to the main total
//   mainTotal += totalSGSTCharges + totalCGSTCharges;

//   return mainTotal;
// };

export const calcuLateAssemblyCharges = () => {
  const { cartItems } = getState();
  const data = cartItems.filter((item) => !item.errorMessage);
  return sumBy(data, (item: any) => item?.assembly_charges);
};

export const calcuLateCGSTCharges = (showGST) => {
  if (!showGST) {
    return 0;
  }
  const { cartItems } = getState();
  const data = cartItems.filter((item) => !item.errorMessage);
  return sumBy(
    data,
    (item: any) =>
      item?.gst_calculation?.Total_CGST *
      (item?.selectQuantity || item?.select_quantity || 0)
  );
};

export const calcuLateCGSTChargesPercentage = (showGST) => {
  if (!showGST) {
    return 0;
  }
  const { cartItems } = getState();
  const data = cartItems.filter((item) => !item.errorMessage);
  return sumBy(
    data,
    (item: any) => item?.gst_calculation?.Average_CGST / cartItems.length
  );
};

export const calcuLateSGSTCharges = (showGST) => {
  if (!showGST) {
    return 0;
  }
  const { cartItems } = getState();
  const data = cartItems.filter((item) => !item.errorMessage);
  return sumBy(
    data,
    (item: any) =>
      (item?.gst_calculation?.Total_SGST || 0) *
      (item?.selectQuantity || item?.select_quantity || 0)
  );
};

export const calcuLateSGSTChargesPercentage = (showGST) => {
  if (!showGST) {
    return 0;
  }
  const { cartItems } = getState();
  const data = cartItems.filter((item) => !item.errorMessage);
  return sumBy(
    data,
    (item: any) => item?.gst_calculation?.Average_SGST / cartItems.length
  );
};

// const getItemForCart = (elem: any) => {
//   return {
//     ...elem,
//     selectQuantity: elem.selectQuantity || elem.minimum_quantity,
//   };
// };
export const addToCart = async (elem: any) => {
  const { cartItems } = getState();
  setState({
    addtocartLoading: true,
  });

  const existingItemIndex = cartItems.findIndex(
    (item) =>
      item.product_id === elem.product_id &&
      item.product_attribute_id === elem.id
  );

  if (existingItemIndex !== -1) {
    const updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems[existingItemIndex];
    existingItem.quantity += elem.selectQuantity || elem.minimum_quantity || 1;

    existingItem.selectQuantity = existingItem.quantity;
    existingItem.select_quantity = existingItem.quantity;
    updatedCartItems[existingItemIndex] = existingItem;

    await createCart(updatedCartItems);
  } else {
    const newCartItem = {
      ...elem,
      selectQuantity: elem.selectQuantity || elem.minimum_quantity || 1,
      quantity: 1,
    };

    const updatedCartItems = [newCartItem, ...cartItems];
    await createCart(updatedCartItems);
  }

  setState({
    addtocartLoading: false,
  });

  toast.success('Product Added to Cart');
  // return router.push('/cart');
};

// export const buyNow = async (elem: any, router: NextRouter) => {
//   await useSetSelectedProduct(elem);

//   const compressedData = LZString.compressToEncodedURIComponent(
//     elem.id.toString()
//   );
//   const encodedData = encodeURIComponent(compressedData);

//   return router.push(`/checkout?p=${encodedData}`);
// };

export const buyNow = async (elem: any, router: NextRouter) => {
  // Remove coupon data from localStorage
  // localStorage.removeItem('coupon-storage');

  // Set selected product
  await useSetSelectedProduct(elem);

  // Compress and encode data
  const compressedData = LZString.compressToEncodedURIComponent(
    elem.id.toString()
  );
  const encodedData = encodeURIComponent(compressedData);

  if (localStorage.token) {
    updateTab(2);
  } else {
    updateTabLogin(1);
  }

  // Navigate to checkout page with encoded data
  // await router.push(`/checkout?p=${encodedData}`);

  toast.success('Redirecting to Checkout Page');
  await router.push(`/checkout?p=${encodedData}`);

  // setTimeout(async () => {
  //   await router.push(`/checkout?p=${encodedData}`);
  // }, 4000);
  // Reload the checkout page
  // window.location.reload();
};

export const incrementCartData = async (elem: any, product: any) => {
  const payload = {
    product_id: product.product_id || product.id,
    product_attribute_id: product.product_attribute_id,
    quantity: (product.selectQuantity || product.quantity) + 1,
  };
  const { cartItems, validateLoading } = getState();
  try {
    setState({
      // validateLoading: { ...validateLoading, [product.id]: true },
      validateLoading: {
        ...validateLoading,
        [`${product.id}_${product.product_attribute_id}`]: true,
      },
    });
    const { data: result } = await api.post(ROUTES.validateProduct(), payload);
    if (result.success) {
      const data = cartItems.map((item: any) => {
        if (
          item.id === elem &&
          item.product_attribute_id === payload.product_attribute_id
        ) {
          const updatedQuantity = payload.quantity;
          const updatedPrice =
            parseFloat(item.discounted_price?.discounted_price || item.price) *
            updatedQuantity;
          return {
            ...item,
            selectQuantity: updatedQuantity,
            quantity: updatedQuantity,
            updatedPrice: parseFloat(updatedPrice.toFixed(2)),
          };
        }
        return item;
      });
      setState({
        cartItems: data,
        validateLoading: { ...validateLoading, [product.id]: false },
      });
    }
    setState({
      validateLoading: { ...validateLoading, [product.id]: false },
    });
  } catch (e) {
    setState({
      validateLoading: false,
    });
  }
};

export const decrement = async (elem: any, product: any) => {
  const { cartItems, validateLoading } = getState();
  const payload = {
    product_id: product.product_id || product.id,
    product_attribute_id: product.product_attribute_id,
    quantity: (product.selectQuantity || product.quantity) - 1,
  };
  try {
    setState({
      // validateLoading: { ...validateLoading, [product.id]: true },
      validateLoading: {
        ...validateLoading,
        [`${product.id}_${product.product_attribute_id}`]: true,
      },
    });
    const { data: result } = await api.post(ROUTES.validateProduct(), payload);
    if (result.success) {
      const data = cartItems.map((item: any) => {
        if (
          item.id === elem &&
          item.product_attribute_id === payload.product_attribute_id
        ) {
          const updatedQuantity = Math.max(payload.quantity, 1);
          const updatedPrice =
            parseFloat(item.discounted_price?.discounted_price || item.price) *
            updatedQuantity;
          return {
            ...item,
            quantity: updatedQuantity,
            selectQuantity: updatedQuantity,
            updatedPrice: parseFloat(updatedPrice.toFixed(2)),
          };
        }
        return item;
      });
      setState({
        cartItems: data,
        validateLoading: { ...validateLoading, [product.id]: false },
      });
    }
    setState({
      validateLoading: { ...validateLoading, [product.id]: false },
    });
  } catch (e) {
    setState({
      validateLoading: { ...validateLoading, [product.id]: false },
    });
  }
};

export const removeFromCart = async (itemId: number) => {
  const { cartItems } = getState();
  const arr = cartItems.filter(
    (item: any) => item.product_attribute_id !== itemId
  );
  if (isUserLoggedIn()) {
    await createCart(arr);
  } else {
    setState({
      cartItems: arr,
    });
  }
};

export const updateTab = (tab: number) => {
  setState({
    tab: tab,
  });
};

export const updateTabLogin = (tab: number) => {
  setState({
    tab: tab,
  });
};

export const removeSelectedProduct = () => {
  setState({
    selectedProduct: null,
  });
};

export const addNewAddress = (value: boolean | any) => {
  return setState({ addressTab: value });
};
export const addressListViewFlag = (flag: boolean) => {
  return setState({ addressListView: flag });
};

export const getUserDetailFromMe = async () => {
  setState({ meLoading: true });
  try {
    const { data: result } = await api.get(ROUTES.getUserDetails());
    if (result) {
      setState({ meData: result, meLoading: false });
      if (result.address.length === 0) {
        setState({ addressListView: false });
      }
    }
    // setState({ meLoading: false })
  } catch (e) {
    // const cart_products = e.cart_products || [];
    setState({ meLoading: false });
  }
};

export const setSelectedAddress = (data: any) => {
  return setState({ selectedAddress: data });
};

export const setSelectedGST = (data: any) => {
  return setState({ selectedGST: data });
};

export const deleteAddress = async (id: number) => {
  setState({ deleteAddressLoading: true });
  try {
    const { data } = await api.delete(ROUTES.deteteAddress(id));
    if (data === 1) {
      setState({ deleteAddressId: null, deleteAddressLoading: false });
    }
  } catch (e) {
    setState({ deleteAddressLoading: false });
  }
};

export const setDeleteId = (id: number) => {
  const isId = Boolean(id);
  if (isId) {
    setState({ deleteAddressId: id });
  } else {
    setState({ deleteAddressId: null });
  }
};

export const removeCartItmes = () => {
  setState({
    cartItems: [],
  });
};

export const updateAddressAction = (details: any) => {
  if (details === null) {
    return setState({ updateAddress: null, updateAddressFlag: false });
  } else {
    return setState({ updateAddress: details, updateAddressFlag: true });
  }
};

export const getAllStates = async () => {
  try {
    setState({ stateloading: true });
    const { data: result } = await api.get(ROUTES.getAllStates());
    if (result) {
      setState({ states: map(result, 'name'), stateloading: false });
    }
  } catch (e) {
    setState({ states: [], stateloading: false });
  }
};
