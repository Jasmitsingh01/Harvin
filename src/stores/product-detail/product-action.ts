import { find } from 'lodash';
import api from '../../services/api';
import ROUTES from '../../utilities/api-routes';
import { useProductDetailStore } from './product-store';
import {
  generateEncryptUrl,
  getSelectedProductCombination,
} from '../../utilities/helper';

const { setState, getState } = useProductDetailStore;

export const selectProductCombination = (selectedProductCombination: any) => {
  setState({
    selectProductCombination: selectedProductCombination,
  });
};

export const setProductQuantity = (value: number) => {
  const { selectedProductCombination } = getState();
  setState({
    selectedProductCombination: {
      ...selectedProductCombination,
      selectQuantity: value,
    },
  });
};

export const changePinCode = () => {
  localStorage.removeItem('pincode');
  setState({
    codeCheckLoading: false,
    pincodeError: '',
    pincodeSuccess: '',
    pincodeEntered: false,
    codeCheckLoadingCart: false,
    pincodeErrorCart: '',
    pincodeSuccessCart: '',
  });
};
export const checkPincodeApi = async (payload: any) => {
  try {
    setState({
      codeCheckLoading: true,
      pincodeError: '',
      pincodeSuccess: '',
      pincodeEntered: false,
    });
    const { data: result } = await api.post(ROUTES.checkpostcode(), payload);
    if (result.status) {
      // Store pincode data in local storage
      localStorage.setItem('pincode', payload.postcode);
    }
    setState({
      codeCheckLoading: false,
      pincodeError: !result.status ? result.message : null,
      pincodeSuccess: result.status ? result.message : null,
      codeCheckLoadingCart: false,
    });
  } catch (error) {
    localStorage.removeItem('pincode');
    setState({
      codeCheckLoading: false,
      pincodeError: '',
      pincodeSuccess: '',
      pincodeEntered: false,
    });
  }
};

export const checkPincodeApiCart = async (payload: any) => {
  try {
    setState({
      pincodeEntered: false,
      codeCheckLoadingCart: true,
      pincodeErrorCart: '',
      pincodeSuccessCart: '',
    });
    const { data: result } = await api.post(ROUTES.checkpostcode(), payload);
    if (result.status) {
      // Store pincode data in local storage
      localStorage.setItem('pincode', payload.postcode);
    }
    setState({
      codeCheckLoadingCart: false,
      pincodeErrorCart: !result.status ? result.message : null,
      pincodeSuccessCart: result.status ? result.message : null,
      pincodeEntered: true,
    });
  } catch (error) {
    localStorage.removeItem('pincode');
    setState({
      pincodeEntered: false,
      codeCheckLoadingCart: false,
      pincodeErrorCart: '',
      pincodeSuccessCart: '',
    });
  }
};

export const getProductCombination = (
  result: any,
  selectedCombination: any,
  productCombination: any
) => {
  setState({
    combinationLoading: true,
  });
  const {
    product_combinations,
    name: productName,
    description: productDescription,
  } = result;
  const combinationData: any = {};
  product_combinations.forEach((prod: any) => {
    prod.combinations.forEach((combination: any) => {
      const { name, id, group_type } = combination.attribute;
      const { attribute_value } = combination;
      if (!combinationData[name]) {
        combinationData[name] = {
          id: id,
          type: group_type,
          name: name,
          productComobination: prod,
          values: [attribute_value],
        };
      } else {
        const values = combinationData[name].values;
        if (
          !find(values, {
            id: attribute_value?.id,
            value: attribute_value?.value,
          })
        ) {
          combinationData[name].values.push({
            ...attribute_value,
          });
        }
      }
    });
  });

  setState({
    productCombinations: product_combinations,
    selectedCombination: selectedCombination,
    selectedProductCombination:
      {
        ...productCombination,
        name: productName,
        description: productDescription,
      } || product_combinations[0],
    combinationData: combinationData,
    combinationLoading: false,
  });
};

export const setSelectedCombination = (elem: any, object: any, result: any) => {
  const { selectedCombination, productCombinations } = getState();
  selectedCombination[object.id] = elem.id;
  const selectedProductCombination = getSelectedProductCombination(
    selectedCombination,
    productCombinations
  );
  generateEncryptUrl(selectedCombination);
  setState({
    selectedCombination: { ...selectedCombination },
    selectedProductCombination: {
      ...selectedProductCombination,
      name: result.name,
      description: result.name,
    },
  });
};

export const getProduct = async (slug: string | any) => {
  setState({
    loading: true,
  });
  try {
    const { data: result } = await api.get(ROUTES.getProduct(slug));
    return setState({
      product: result,
      loading: false,
      error: null,
      combinations: result?.product_combinations,
    });
  } catch (e: any) {
    return setState({
      product: null,
      loading: false,
      error: e.messages,
      combinations: [],
    });
  }
};

export const getAttribute = () => {
  const { combinations } = getState();
  const attributeObject: any = {};
  combinations?.forEach((combination: any) => {
    combination.combinations.forEach((combo: any) => {
      const { name, id } = combo.attribute;
      const value: string = combo.attribute_value.value;
      if (!attributeObject[name]) {
        attributeObject[name] = { id, values: [] };
      }
      attributeObject[name].values.push({
        id: combo.attribute_value_id,
        value,
      });
    });

    return setState({
      attributes: attributeObject,
    });
  });
};

export const getValidateProductDetail = async (selectedProduct: any) => {
  const { id, product_id, minimum_quantity } = selectedProduct || {};
  const payload = {
    product_id: product_id,
    product_attribute_id: id,
    quantity: minimum_quantity,
  };
  setState({
    validateDetailLoading: true,
    productDetailError: null,
  });
  try {
    const { data: result } = await api.post(
      ROUTES.validateProduct(),
      payload,
      false
    );
    if (!result.success) {
      return setState({
        validateDetailLoading: false,
        productDetailError: result.message,
      });
    }
    return setState({
      validateDetailLoading: false,
      productDetailError: null,
    });
  } catch (e) {
    setState({
      validateDetailLoading: false,
      productDetailError: e.message,
    });
  }
};

export const getValidateProduct = async (
  selectedProduct: any,
  value: number
) => {
  const { id, product_id } = selectedProduct || {};
  const payload = {
    product_id: product_id,
    product_attribute_id: id,
    quantity: value,
  };
  setState({
    validateLoading: true,
  });
  try {
    const { data: result } = await api.post(ROUTES.validateProduct(), payload);
    if (result.success) {
      setProductQuantity(value);
    }
    setState({
      validateLoading: false,
    });
  } catch (e) {
    setState({
      validateLoading: false,
    });
  }
};

export const getRatingAndReviews = (result: { ratings: any; reviews: any }) => {
  setState({
    productRating: result?.ratings,
    productReview: result.reviews,
    product: result,
  });
  // let ratings = reviews?.map((elem) => elem?.rating) || []
  // const totalRatings = ratings.length;
  // const sumOfRatings = ratings.reduce((sum, rating) => sum + rating, 0);
  // const average = totalRatings > 0 ? sumOfRatings / totalRatings : 0;
  // setState({ averageRating: average })
};

export const getDicCountedPrice = () => {
  // const { selectedProductCombination } = getState()
  // const { price } = selectedCombination;
  // const { discounted_price, reduction, reduction_type, from_quantity } =
  //   selectedCombination?.discounted_price;
  // const discount = price - discounted_price?.discounted_price;
  // const percentageDiscount = (discount / price) * 100;
  // return percentageDiscount;
};

export const sideBarTabAction = (tab: string) => {
  setState({ sidebarTab: tab });
};
