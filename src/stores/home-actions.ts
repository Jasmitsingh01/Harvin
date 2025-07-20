import ROUTES from '../utilities/api-routes';
import api from '../services/api';
import { useHomeStore } from './home-store';
// import { useProductDetailStore } from './product-detail/product-store';
const { setState } = useHomeStore;

// const {setState:productState} = useProductDetailStore
export const getAllProducts = async () => {
  setState({
    loading: true,
  });

  try {
    const { data: result } = await api.get(ROUTES.getAllProducts());

    if (result) {
      return setState({
        products: result?.data,
        loading: false,
      });
    }
  } catch (e: any) {
    return setState({
      products: [],
      loading: false,
      error: e.messages,
    });
  }
};

export const getProductDetail = async (slug: string | any) => {
  try {
    const { data: result } = await api.get(ROUTES.getProduct(slug));
    return { result: result, error: null };
  } catch (e: any) {
    return { result: null, error: e.message };
  }
};

// export const getProduct = a sync (slug: string) => {
//   setState({
//     loading: true,
//   });
//   try {
//     const { data: result } = await api.get(ROUTES.getProduct(slug));
//     if (result) {
//       return productState({
//         product: result,
//         loading: false,
//       });
//     }
//   } catch (e: any) {
//     return productState({
//       product: null,
//       loading: false,
//       error: e.messages,
//     });
//   }
// };
