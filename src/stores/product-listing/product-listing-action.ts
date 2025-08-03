import { isEmpty } from 'lodash';
import { useProductListingStore } from './product-listing-store';
import {
  evaluateConditionOperator,
  generateEncryptUrlForFilter,
} from '../../utilities/helper';
import {
  discountDatum,
  discountFilterData,
  priceRangeDatum,
  priceRangeView,
  // sortFilterDatum,
} from '../../shared/fields/field-data';
import { useSearchStore } from '../search/search-store';
const { setState, getState } = useProductListingStore;
const { setState: setSearchData } = useSearchStore;

export const getListData = (data) => {
  setState({ productList: data });
};

const productCountOnAttributes = (products, attributes, searchFlag = false) => {
  const obj = {};

  const priceObj = {};
  const discountObj = {};

  priceRangeView.map((item) => {
    priceObj[item.id] =
      products.filter((p) => {
        const price =
          p.product_combination_short[0]?.discounted_price?.discounted_price ||
          p.product_combination_short[0]?.price;
        return item.min <= price && item.max >= price;
      }).length || 0;
  });
  (attributes || [])?.map((item) => {
    obj[item.id] = item.values.map((val) => ({
      id: val.id,
      attribute_id: val.attribute_id,
      count:
        products.filter((product) =>
          product.combinations.find(
            (combination) => combination.attribute_value_id === val.id
          )
        )?.length || 0,
    }));

    discountFilterData.map((item) => {
      discountObj[item.id] = products.filter((p) => {
        const discountObj = p.product_combination_short[0]?.discounted_price;
        if (discountObj?.reduction_type === 'percentage') {
          return evaluateConditionOperator(item.val, discountObj?.reduction);
        }
        return false;
      })?.length;
    });
  });
  if (searchFlag) {
    setSearchData({
      productCountAttributes: obj,
      priceAttributesCounts: priceObj,
      discountAttributesCounts: discountObj,
    });
  }

  setState({
    productCountAttributes: obj,
    priceAttributesCounts: priceObj,
    discountAttributesCounts: discountObj,
  });
};

// export const filterProductsData = (
//   obj: any,
//   mainData = [],
//   searchFlag = false,
//   attributesData = []
// ) => {
//   const {
//     attributes = [],
//     priceRange = [],
//     sortFilter = [],
//     discountFilter = [],
//   } = obj;
//   let updatedProductList = mainData;

//   if (!isEmpty(sortFilter)) {
//     updatedProductList = updatedProductList.sort((a, b) => {
//       const Aprice =
//         a.product_combination_short[0]?.discounted_price?.discounted_price ||
//         a.product_combination_short[0]?.price ||
//         0;
//       const Bprice =
//         b.product_combination_short[0]?.discounted_price?.discounted_price ||
//         b.product_combination_short[0]?.price ||
//         0;
//       return sortFilterDatum[sortFilter[0]]?.val === 'low'
//         ? Bprice - Aprice
//         : Aprice - Bprice;
//     });
//   }
//   if (!isEmpty(attributes)) {
//     updatedProductList = updatedProductList.filter((item) => {
//       return item.combinations.find(
//         (combination) => attributes?.includes(combination.attribute_value_id)
//       );
//     });
//   }
//   if (!isEmpty(priceRange)) {
//     updatedProductList = updatedProductList.filter((item) => {
//       const price =
//         item.product_combination_short[0]?.discounted_price?.discounted_price ||
//         item.product_combination_short[0]?.price;
//       return priceRange.find((priceR) => {
//         return (
//           priceRangeDatum[priceR].min <= price &&
//           priceRangeDatum[priceR].max >= price
//         );
//       });
//     });
//   }

//   if (!isEmpty(discountFilter)) {
//     updatedProductList = updatedProductList.filter((item) => {
//       const discountObj = item.product_combination_short[0]?.discounted_price;
//       if (discountObj?.reduction_type === 'percentage') {
//         return discountFilter.find((priceR) => {
//           return evaluateConditionOperator(
//             discountDatum[priceR].val,
//             discountObj?.reduction
//           );
//         });
//       }
//       return false;
//     });
//   }

//   productCountOnAttributes(mainData, attributesData, searchFlag);
//   if (searchFlag) {
//     setSearchData({
//       productList: updatedProductList,
//     });
//     return;
//   }
//   setState({
//     productList: updatedProductList,
//   });
// };

export const filterProductsData = (
  obj: any,
  mainData = [],
  searchFlag = false,
  attributesData = []
) => {
  const {
    attributes = [],
    priceRange = [],
    sortFilter = [],
    discountFilter = [],
  } = obj;
  let updatedProductList = mainData;

  if (!isEmpty(sortFilter)) {
    let filteredList,
      filteredListRecommendedFirst,
      filteredListRecommendedSecond;
    switch (sortFilter[0]) {
      case 1:
        filteredListRecommendedFirst = updatedProductList.filter(
          (item) => item.isFeatured === 1
        );

        filteredListRecommendedSecond = updatedProductList.filter(
          (item) => item.isFeatured === 0
        );
        updatedProductList = [
          ...filteredListRecommendedFirst,
          ...filteredListRecommendedSecond,
        ];
        break;
      case 2:
        filteredList = updatedProductList.filter((item) => item.isNew === 1);
        updatedProductList = filteredList;
        break;
      case 3:
        updatedProductList = updatedProductList.sort(
          (a, b) =>
            (a.product_combination_short[0]?.discounted_price
              ?.discounted_price || a.product_combination_short[0]?.price) -
            (b.product_combination_short[0]?.discounted_price
              ?.discounted_price || b.product_combination_short[0]?.price)
        );
        break;
      case 4:
        updatedProductList = updatedProductList.sort(
          (a, b) =>
            (b.product_combination_short[0]?.discounted_price
              ?.discounted_price || b.product_combination_short[0]?.price) -
            (a.product_combination_short[0]?.discounted_price
              ?.discounted_price || a.product_combination_short[0]?.price)
        );
        break;
      case 5:
        updatedProductList = updatedProductList.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case 6:
        updatedProductList = updatedProductList.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
      default:
        break;
    }
  }

  if (!isEmpty(attributes)) {
    updatedProductList = updatedProductList.filter((item) => {
      return item.combinations.find(
        (combination) => attributes?.includes(combination.attribute_value_id)
      );
    });
  }
  if (!isEmpty(priceRange)) {
    updatedProductList = updatedProductList.filter((item) => {
      const price =
        item.product_combination_short[0]?.discounted_price?.discounted_price ||
        item.product_combination_short[0]?.price;
      return priceRange.find((priceR) => {
        return (
          priceRangeDatum[priceR].min <= price &&
          priceRangeDatum[priceR].max >= price
        );
      });
    });
  }

  if (!isEmpty(discountFilter)) {
    updatedProductList = updatedProductList.filter((item) => {
      const discountObj = item.product_combination_short[0]?.discounted_price;
      if (discountObj?.reduction_type === 'percentage') {
        return discountFilter.find((priceR) => {
          return evaluateConditionOperator(
            discountDatum[priceR].val,
            discountObj?.reduction
          );
        });
      }
      return false;
    });
  }

  productCountOnAttributes(mainData, attributesData, searchFlag);
  if (searchFlag) {
    setSearchData({
      productList: [...updatedProductList],
    });
    return;
  }

  setState({
    productList: [...updatedProductList],
  });

  // Initialize displayed items for infinite scroll
  const { itemsPerPage } = getState();
  const initialItems = updatedProductList.slice(0, itemsPerPage);
  setState({
    displayedItems: initialItems,
    hasMoreItems: updatedProductList.length > itemsPerPage,
    isLoadingMore: false,
  });
};

export const filterData = (
  decryptObject,
  mainData,
  attributesData,
  searchFlag = false
) => {
  const obj = isEmpty(decryptObject)
    ? { attributes: [], priceRange: [] }
    : decryptObject;

  filterProductsData(obj, mainData, searchFlag, attributesData);
  if (searchFlag) {
    setSearchData({
      filterAttributes: { ...obj },
      currentPage: (decryptObject?.page && decryptObject?.page[0]) || 1,
    });
    return;
  }
  setState({
    filterAttributes: { ...obj },
    currentPage: (decryptObject?.page && decryptObject?.page[0]) || 1,
  });
};

export const getColorCombinations = (colors: any) => {
  if (!(!colors || !Array.isArray(colors) || colors.length === 0)) {
    const colorCountMap = {};
    colors.forEach((product) => {
      product?.product_color_combination?.forEach((combination) => {
        const colorId = combination.id;
        const colorValue = combination.value;
        // Initialize colorCountMap entry if it doesn't exist
        if (!colorCountMap[colorId]) {
          colorCountMap[colorId] = {
            id: colorId,
            value: colorValue,
            productCount: 1,
            name: combination,
            filterdProducts: [product], // Assuming product.id is the correct identifier for product
          };
        } else {
          colorCountMap[colorId].productCount++;
          // Ensure product.id exists and is not undefined before pushing
          if (product.id) {
            colorCountMap[colorId].filterdProducts.push(product);
          }
        }
      });
    });

    const totalColor = Object.values(colorCountMap);
    setState({ colorList: totalColor });
  }
};

// This is resusable method for combination filter and to get the product count

// export const updateFilter = (isChecked?: any, dataId?: any, type?: any) => {
//   const { filterAttributes, currentPage } = getState();
//   if (isChecked) {
//     if (!filterAttributes[type]) {
//       filterAttributes[type] = [];
//     }
//     if (type === 'sortFilter') {
//       filterAttributes[type] = [];
//     }
//     filterAttributes[type].push(dataId);
//   } else {
//     pull(filterAttributes[type], dataId);
//   }

//   setState({
//     filterAttributes: { ...filterAttributes },
//   });

//   generateEncryptUrlForFilter({ ...filterAttributes, page: currentPage });
// };

export const updateFilter = (isChecked, dataId, type) => {
  const { filterAttributes, currentPage } = getState();
  let updatedFilterAttributes = { ...filterAttributes };

  if (type === 'clear') {
    updatedFilterAttributes = {
      attributes: [],
      priceRange: [],
      sortFilter: [],
      discountFilter: [],
    };
  } else {
    if (!updatedFilterAttributes[type]) {
      updatedFilterAttributes[type] = [];
    }

    if (isChecked) {
      if (type === 'sortFilter') {
        updatedFilterAttributes[type] = [dataId];
      } else {
        updatedFilterAttributes[type].push(dataId);
      }
    } else {
      updatedFilterAttributes[type] = updatedFilterAttributes[type].filter(
        (id) => id !== dataId
      );
    }
  }

  setState({
    filterAttributes: updatedFilterAttributes,
  });

  generateEncryptUrlForFilter({
    ...updatedFilterAttributes,
    page: currentPage,
  });
};

export const updateCurrentPage = (page) => {
  const { filterAttributes } = getState();
  setState({
    currentPage: page,
  });
  generateEncryptUrlForFilter({ ...filterAttributes, page: page });
};

export const openCloseSidebarModal = (value) => {
  setState({ sidebarModal: value });
};

// Infinite scroll actions
export const initializeDisplayedItems = (productList: any[]) => {
  const { itemsPerPage } = getState();
  const initialItems = productList.slice(0, itemsPerPage);
  setState({
    displayedItems: initialItems,
    hasMoreItems: productList.length > itemsPerPage,
    isLoadingMore: false,
  });
};

export const loadMoreItems = () => {
  const { productList, displayedItems, itemsPerPage, isLoadingMore } =
    getState();

  if (isLoadingMore || displayedItems.length >= productList.length) {
    return;
  }

  setState({ isLoadingMore: true });

  // Simulate loading delay for better UX
  setTimeout(() => {
    const currentLength = displayedItems.length;
    const nextItems = productList.slice(
      currentLength,
      currentLength + itemsPerPage
    );
    const newDisplayedItems = [...displayedItems, ...nextItems];

    setState({
      displayedItems: newDisplayedItems,
      hasMoreItems: newDisplayedItems.length < productList.length,
      isLoadingMore: false,
    });
  }, 500);
};

export const resetInfiniteScroll = () => {
  setState({
    displayedItems: [],
    hasMoreItems: true,
    isLoadingMore: false,
  });
};
