import { isEmpty } from 'lodash';
import api from '../../services/api';
import ROUTES from '../../utilities/api-routes';
import { useLastViewedStore } from './last-store';

import { combineArray } from '../../utilities/helper';

const { setState, getState } = useLastViewedStore;

export const getLastViewedItems = async () => {
  const { lastViewedItems } = getState();
  if (localStorage.token) {
    setState({
      loading: true,
    });

    try {
      const { data: result } = await api.get(ROUTES.lastViewdProduct());

      return setState({
        lastViewedItems: isEmpty(lastViewedItems)
          ? [...result.data.product]
          : [...combineArray(lastViewedItems, result.data)],
        current_page: result.current_page,
        loading: false,
      });
    } catch (e: any) {
      const data = e.data || [];

      return setState((state) => ({
        lastViewedItems: isEmpty(state.lastViewedItems)
          ? [...data]
          : [...combineArray(state.lastViewedItems, data)],
        current_page: 1,
        loading: false,
        error: e.messages,
      }));
    }
  }
};

export const addLastViewedProductsPost = async (products) => {
  // const { lastViewedItems } = getState();

  try {
    const productIds = products.map((product) => product.id);

    const response = await api.post(ROUTES.addlastViewdProduct(), productIds);

    if (response?.data?.status === true) {
      getLastViewedItems();
    }
    setState({
      postLoading: false,
    });
    // setState({
    //   lastViewedItems: combineArray(lastViewedItems, response.data),
    // });
  } catch (e) {
    setState({
      postLoading: false,
    });
  }
};

export const addLastViewedItem = (product) => {
  const { lastViewedItems } = getState();
  const existingIndex = lastViewedItems.findIndex(
    (item) => item.id === product.id
  );

  if (existingIndex !== -1) {
    const updatedLastViewedItems = [
      product,
      ...lastViewedItems.slice(0, existingIndex),
      ...lastViewedItems.slice(existingIndex + 1),
    ];

    setState({
      lastViewedItems: updatedLastViewedItems,
    });
    if (localStorage.token) {
      addLastViewedProductsPost(updatedLastViewedItems);
    }
  } else {
    setState({
      lastViewedItems: [product, ...lastViewedItems],
    });
    if (localStorage.token) {
      addLastViewedProductsPost([product, ...lastViewedItems]);
    }
  }
};
