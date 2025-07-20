import moment from 'moment-timezone';
import getSymbolFromCurrency from 'currency-symbol-map';
import LZString from 'lz-string';
import _, { compact, flatten, isEmpty, map } from 'lodash';

// export const currentTime = (currentTiming) => {
//     //const zone = "America/Mexico_city"  // set Mexico timezone
//     const zone = "Asia/Calcutta"          // set India timezone
//     let currentTime = moment().tz(zone).format('HH:mm')
//     currentTime = moment(currentTime,'HH:mm')
// }

export const convertUtcToIst = (
  utcDateTime: any,
  format = 'YYYY-MM-DD HH:mm:ss'
) => {
  return moment.utc(utcDateTime).utcOffset('+05:30').format(format);
};

// Function to convert IST to UTC
export const convertIstToUtc = (
  istDateTime: any,
  format = 'YYYY-MM-DD HH:mm:ss'
) => {
  return moment(istDateTime).utc().format(format);
};
export const formatIndianPrice = (price: string | number) => {
  if (price) {
    const formattedPrice = price.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    });

    const priceWithoutSymbol = formattedPrice.replace(/₹/g, '');
    return priceWithoutSymbol;
  }
  return 0;
};
export const priceWithCurrency = (
  price: any,
  symbol = 'INR',
  prefix = true
) => {
  return prefix
    ? `${getSymbolFromCurrency(symbol)}${formatIndianPrice(price)}`
    : `${formatIndianPrice(price)}${getSymbolFromCurrency(symbol)}`;
};

export const getSelectedProductCombination = (
  selectedCombination: ArrayLike<unknown> | { [s: string]: unknown },
  productCombinations: any[]
) => {
  return productCombinations?.find((combination: any) => {
    return Object.entries(selectedCombination).every(
      ([attribute, value]: any) => {
        const val = typeof value === 'object' ? value.id : value;
        return combination.combinations.some(
          (combo: any) =>
            parseInt(combo.attribute?.id) === parseInt(attribute) &&
            parseInt(combo.attribute_value?.id) === parseInt(val)
        );
      }
    );
  });
};

export const decryptUrl = (resolveUrl: string, productCombinations: any) => {
  const searchQuery = resolveUrl.split('?')[1];
  const jsonObject: any = {};
  if (searchQuery) {
    const urlEncodedString =
      searchQuery &&
      LZString.decompressFromBase64(decodeURIComponent(searchQuery));

    const urlSearchParams = new URLSearchParams(
      decodeURIComponent(urlEncodedString)
    );

    Array.from(urlSearchParams.entries()).forEach(([key, value]) => {
      jsonObject[key] = parseInt(value);
    });
    return jsonObject;
  }
  const combinations = productCombinations[0]?.combinations || [];
  combinations.forEach((item: any) => {
    if (item.attribute_value?.id) {
      jsonObject[item.attribute.id] = item.attribute_value?.id;
    }
  });
  return jsonObject;
};

export const generateEncryptUrl = (selectedCombination: any) => {
  const newObj = { ...selectedCombination };
  const currentUrl = new URL(window.location.href);
  const searchUrl = currentUrl.search.replace('?', '');
  const search = searchUrl && LZString.decompressFromBase64(searchUrl);
  if (search == null) {
    return;
  }

  const queryParams: any = new URLSearchParams(search);

  Object.keys(newObj).forEach((key) => {
    const val = newObj[key];
    queryParams.set(key, parseInt(val));
  });
  const encryptString = decodeURIComponent(queryParams);
  const compressed = encryptString && LZString.compressToBase64(encryptString);

  const isSearch = currentUrl.pathname.match('search');
  !isSearch &&
    window.history.replaceState({}, '', `${currentUrl.pathname}?${compressed}`);
};

export const mergeObjects = (a, b) => {
  const result = {};

  for (const key in a) {
    if (a[key] !== null) {
      result[key] = a[key];
    }
  }

  for (const key in b) {
    if (b[key] !== null) {
      result[key] = b[key];
    }
  }

  return result;
};

export const filterCartsData = (
  cartsItems: any[],
  products: any[],
  isSuccess: boolean
) => {
  if (isEmpty(products)) {
    return [];
  }

  if (isEmpty(cartsItems)) {
    return products.map((itemA) => ({
      ...mergeObjects(itemA.product, itemA),
      images: itemA.product_image || itemA?.images,
      isError: Boolean(itemA.message),
      errorMessage: itemA?.message,
    }));
  }

  const data = cartsItems.map(
    (itemA: { product_id: any; product_attribute_id: any; id: any }) => {
      const matchingItemB = products.find(
        (itemB: { product_id: any; product_attribute_id: any }) =>
          itemA.product_id === itemB.product_id &&
          (itemA.product_attribute_id || itemA.id) ===
            itemB.product_attribute_id
      );

      if (isEmpty(matchingItemB)) {
        return null;
      }
      const value = matchingItemB && {
        ...matchingItemB,
        images: matchingItemB?.product_image || matchingItemB?.images,
      };

      const obj = isSuccess
        ? { ...itemA, isError: false, errorMessage: null }
        : { ...itemA, isError: true, errorMessage: value?.message };
      return value ? obj : itemA;
    }
  );
  return compact(data);
};

export const combineArray = (cartsItems: any, products: any) => {
  const mergedArray = products.map((itemA) => {
    const value: any = {
      ...mergeObjects(itemA, itemA.product),
      images: itemA.product_image,
    };
    const matchingItemB = cartsItems.find(
      (itemB) =>
        itemA.product_id === itemB.product_id &&
        itemA.product_attribute_id === itemB.id
    );
    return matchingItemB
      ? {
          ...value,
          ...matchingItemB,
          isError: Boolean(value.message),
          errorMessage: value?.message,
        }
      : value;
  });
  return isEmpty(mergedArray) ? cartsItems : mergedArray;
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return token;
  } else {
    return null;
  }
};

export const currentUser = () => {
  if (typeof window !== 'undefined') {
    return (localStorage.user && JSON.parse(localStorage.user)) || {};
  }
  return null;
};
export const isUserLoggedIn = () => {
  return !isEmpty(currentUser());
};

export const bannerRouting = (elem) => {
  const url = elem?.link_url;
  if (url === '') {
    return;
  }
  if (elem?.link_open === '_self') {
    window.open(url, '_self');
  } else {
    window.open(url, '_blank');
  }
};

export const getIdFromParams = (slug) => {
  const numericPart = slug.split('-')[0];
  return parseInt(numericPart, 10);
};

export const categoryRouting = (elem, router) => {
  if (elem) {
    if (elem?.parent === null || elem?.parent !== 0) {
      router.push(`/categories/${elem?.id}-${elem?.slug}`);
    } else {
      router.push(`/categories/${elem?.id}-${elem?.slug}/products`);
    }
  }
};

export const normalizeBreadCrumb = (categories) => {
  return _.map(categories, (category) => {
    let urlArr = _.takeWhile(categories, (item) => item !== category);
    urlArr = _.uniq(_.concat(urlArr, category));
    return {
      name: _.startCase(category.replace(/^\d+[-]/, '')),
      url: urlArr.join('/'),
    };
  });
};

export const newPrice = (product: any) => {
  if (product) {
    const discountPriceObj =
      product.discounted_price || product?.product_attribute?.discounted_price;
    return discountPriceObj
      ? priceWithCurrency(discountPriceObj.discounted_price)
      : priceWithCurrency(product?.base_price || product?.price);
  }
  return null;
};

export const newWishlistPrice = (item: any) => {
  if (item) {
    const discountPriceObj = item?.combination_details?.discounted_price;
    return discountPriceObj
      ? priceWithCurrency(discountPriceObj.discounted_price)
      : priceWithCurrency(
          item?.combination_details?.price ||
            item?.combination_details?.base_price
        );
  }
  return null;
};
export const getReductionType = (reductionType: string) => {
  switch (reductionType) {
    case 'percentage':
      return '%';
    case 'dollar':
      return '₹';
    default:
      return '';
  }
};

export const getReductionPrefix = (reductionType) => {
  switch (reductionType) {
    case 'percentage':
      return false;
    case 'dollar':
      return true;
    default:
      return false;
  }
};

export const oldPrice = (product: any) => {
  if (product) {
    const discountPriceObj =
      product.discounted_price || product?.product_attribute?.discounted_price;

    return {
      price: priceWithCurrency(product.base_price || product.unit_price),
      discount: discountPriceObj?.reduction,
      reductionType: getReductionType(discountPriceObj?.reduction_type),
      prefix: getReductionPrefix(discountPriceObj?.reduction_type),
    };
  }
  return {
    price: 0,
    discount: 0,
    reductionType: '',
  };
};

export const oldWishlistPrice = (item: any) => {
  if (item) {
    const discountPriceObj = item?.combination_details?.discounted_price;
    return {
      price: priceWithCurrency(item?.combination_details?.price),
      discount: discountPriceObj?.reduction,
      reductionType: getReductionType(discountPriceObj?.reduction_type),
      prefix: getReductionPrefix(discountPriceObj?.reduction_type),
    };
  }
  return {
    price: 0,
    discount: 0,
    reductionType: '',
  };
};

export const discountDifference = (product: any) => {
  const discountedObj =
    product?.product_attribute?.discounted_price || product?.discounted_price;
  const quantity = product.selectQuantity || product.select_quantity;
  const reductionType = discountedObj?.reduction_type;
  if (reductionType === 'percentage') {
    const basePrice = (product.base_price || product.unit_price) * quantity;
    return basePrice - discountedObj?.discounted_price * quantity || 0;
  }
  return discountedObj?.reduction * quantity || 0;
};

export const generateEncryptUrlForFilter = (filterAttributes: any) => {
  const newObj = { ...filterAttributes };
  const currentUrl = new URL(window.location.href);

  let searchUrl = '';
  if (currentUrl.search.match('key')) {
    searchUrl = currentUrl.search.split('&')[1] || '';
  } else {
    searchUrl = currentUrl.search.replace('?', '');
  }

  const search = searchUrl && LZString.decompressFromBase64(searchUrl);
  if (search == null) {
    return;
  }
  const queryParams: any = new URLSearchParams(search);
  Object.keys(newObj).forEach((key) => {
    const val = newObj[key];
    if (!isEmpty(val)) {
      queryParams.set(key, val);
    } else {
      queryParams.delete(key);
    }
    if (typeof val === 'number') {
      queryParams.set(key, val);
      val === 1 && queryParams.delete(key);
    }
  });
  const encryptString = decodeURIComponent(queryParams);
  const compressed = encryptString && LZString.compressToBase64(encryptString);
  const url = compressed
    ? `${currentUrl.pathname}?${compressed}`
    : `${currentUrl.pathname}`;

  const isSearch = currentUrl.pathname.match('search');
  if (isSearch) {
    const compressedUrl = compressed.replaceAll('key', '');
    const searchUrl = currentUrl.search && currentUrl.search.split('&')[0];
    const compressResult = compressedUrl ? `&${compressedUrl}` : '';
    const updatedUrl = currentUrl.pathname + searchUrl + compressResult;
    window.history.replaceState({}, '', updatedUrl);
    return;
  }
  window.history.replaceState({}, '', url);
};

// export const decryptUrlForFilter = (resolveUrl, searchFlag = false) => {
//   let searchQuery = resolveUrl.split('?')[1];
//   if (searchFlag) {
//     searchQuery = searchQuery.split('&')[1];
//   }
//   const jsonObject: any = {};
//   if (searchQuery) {
//     const urlEncodedString =
//       searchQuery &&
//       LZString.decompressFromBase64(decodeURIComponent(searchQuery));

//     const urlSearchParams = new URLSearchParams(
//       decodeURIComponent(urlEncodedString)
//     );

//     Array.from(urlSearchParams.entries()).forEach(([key, value]) => {
//       let arr: any = value ? value.split(',') : [];
//       arr = flatten(map(arr, Number));
//       jsonObject[key] = arr;
//     });
//     return jsonObject;
//   }
//   return {};
// };

export const decryptUrlForFilter = (resolveUrl: string, searchFlag = false) => {
  let searchQuery = resolveUrl.split('?')[1];
  if (searchFlag) {
    searchQuery = searchQuery.split('&')[1];
  }
  const jsonObject: any = {};
  if (searchQuery) {
    const urlEncodedString =
      searchQuery &&
      LZString.decompressFromBase64(decodeURIComponent(searchQuery));

    const urlSearchParams = new URLSearchParams(
      decodeURIComponent(urlEncodedString)
    );

    Array.from(urlSearchParams.entries()).forEach(([key, value]) => {
      let arr: any = value ? value.split(',') : [];
      arr = flatten(map(arr, Number));
      jsonObject[key] = arr;
    });
    return jsonObject;
  }
  return {};
};
export const filterFromParamData = (idArray: number[], productList) => {
  const data = [...productList];
  const filteredData = data?.filter((product) => {
    const combinations = product?.attribute_combinations || [];
    const matchingCombinations = combinations?.filter((combination) => {
      const attributes = combination?.combinations || [];
      const matchingAttributes = attributes?.some((attribute) => {
        const attributeValueId = attribute?.attribute_value?.id;
        return (
          attributeValueId !== undefined && idArray?.includes(attributeValueId)
        );
      });
      return matchingAttributes;
    });
    return matchingCombinations.length > 0;
  });
  return filteredData;
};

export function evaluateConditionOperator(condition, targetValue) {
  const match = condition.match(/^([<>]=?)?(\d+)$/);

  if (!match) {
    return false;
  }

  const operator = match[1];
  const value = parseInt(match[2], 10);

  if (isNaN(value)) {
    return false;
  }

  switch (operator) {
    case '<':
      return targetValue < value;
    case '>':
      return targetValue > value;
    case '<=':
      return targetValue <= value;
    case '>=':
      return targetValue >= value;
    default:
      return targetValue === value;
  }
}

export function parseUrlParams(url) {
  const params = {};
  const urlParts = url.split('?');
  if (urlParts.length > 1) {
    const queryString = urlParts[1];
    const pairs = queryString.split('&');

    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      params[key] = value;
    }
  }
  return params;
}
