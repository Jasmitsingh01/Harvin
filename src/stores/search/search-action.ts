// import { pull } from 'lodash';
import api from '../../services/api';
import ROUTES from '../../utilities/api-routes';
import { useSearchStore } from './search-store';
import { generateEncryptUrlForFilter } from '../../utilities/helper';

const { getState, setState } = useSearchStore;

export const getSearchProductItems = async (id: any) => {
  try {
    const { data: result } = await api.get(ROUTES.getSearchProductList(id));
    setState((state) => ({
      ...state,
      searchResultData: result,
      categoryList: result.category_list,
      productList: result.productList,
      loading: false,
    }));
  } catch (e) {
    setState({ loading: false });
  }
};

// export const updateSearchFilter = (
//   isChecked?: any,
//   dataId?: any,
//   type?: any
// ) => {
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

export const updateSearchFilter = (isChecked, dataId, type) => {
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

export const updateCurrentPage = (page: number) => {
  const { filterAttributes } = getState();
  setState({
    currentPage: page,
  });

  generateEncryptUrlForFilter({ ...filterAttributes, page: page });
};

export const searchProductsPost = async (product_search) => {
  try {
    if (product_search && product_search.length >= 3) {
      setState({ loading: true });
      const response = await api.post(ROUTES.search(), { product_search });
      const searchData = response.data;

      setState((state) => ({
        ...state,
        searchedItems: searchData,
        loading: false,
      }));
    } else {
      setState((state) => ({
        ...state,
        searchedItems: [],
        loading: false,
      }));
    }
  } catch (error) {
    setState({ loading: false });
  }
};
