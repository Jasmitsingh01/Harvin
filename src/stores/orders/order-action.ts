import { useOrderStore } from './order-store';
import api from '../../services/api';
import ROUTES from '../../utilities/api-routes';
import LZString from 'lz-string';
import { toast } from 'react-toastify';

const { setState } = useOrderStore;

export const postOrder = async (productSearch, callBack) => {
  try {
    const { data: result } = await api.post(ROUTES.postOrder(), productSearch);
    toast.error(result.message);
    setState({ placedItems: result });
    const compressedData = LZString.compressToEncodedURIComponent(
      result.id.toString()
    );
    const encodedData = encodeURIComponent(compressedData);

    callBack && callBack(result, encodedData);
  } catch (error) {
    setState({ loading: false, error });
  }
};

export const orderPayment = async (response, data) => {
  try {
    const { data: result } = await api.post(ROUTES.orderPayment(), {
      tracking_number: data.tracking_number,
    });
    // eslint-disable-next-line no-empty
    if (result.succuss) {
    }

    if (response.error) {
      toast.error(response.error.description);
    }

    // router.push(`/thankyou?p=${encodedData}`);
  } catch (error) {
    setState({ loading: false, error });
  }
};

export const downloadInvoice = async (orderId) => {
  setState({ loading: true });

  try {
    const response = await api.postPlainText(ROUTES.downloadInvoie(), orderId);
    if (response) {
      setState({ loading: false });

      // Parse response as JSON if it's valid
      const pdfLink = await response.data;

      // Create a link element to download the PDF
      const link = document.createElement('a');
      link.href = pdfLink;
      link.rel = 'noopener noreferrer';
      link.download = 'document.pdf';

      // Programmatically trigger the download
      link.click();
    } else {
      setState({ loading: false });
    }
  } catch (error) {
    setState({ loading: false, error });
  }
};

export const getAllOrderDetails = async (id: any) => {
  setState({
    loading: true,
  });

  try {
    const { data: result } = await api.get(ROUTES.getOrderDetails(id));

    if (result) {
      return setState({
        orderItems: result,
        loading: false,
      });
    }
  } catch (e: any) {
    return setState({
      loading: false,
      error: e.messages,
    });
  }
};

// export const orderCancel = async (id,reason) => {
//   debugger
//   try {
//     const { data: result } = await api.post(ROUTES.cancelOrder(id), {
//       cancel_reason: reason,
//     });
//     debugger
//     // eslint-disable-next-line no-empty
//     if (result) {
//       toast.success(result.message);

//       // Refresh the page
//       // setTimeout(() => {
//       //   window.location.reload();
//       // },1000)
//     }

//     // router.push(`/thankyou?p=${encodedData}`);
//   } catch (error) {
//     setState({ loading: false, error });
//   }
// };

// order-action.js
export const orderCancel = async (id, reason) => {
  try {
    const { data: result } = await api.post(ROUTES.cancelOrder(id), {
      cancel_reason: reason,
    });
    if (result) {
      toast.success(result.message);
      return true; // Indicate successful cancellation
    }
    return false; // Indicate unsuccessful cancellation
  } catch (error) {
    setState({ loading: false, error });
    return false; // Indicate unsuccessful cancellation
  }
};
