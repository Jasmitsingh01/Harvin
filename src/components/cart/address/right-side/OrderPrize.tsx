import React from 'react';
import OrderDetail from '../OrderDetail';
// import PrizeSummry from '../../../../shared/cart/PrizeSummry';
import { useAddressLoading } from '../../../../stores/user/user-store';
import {
  useCartStore,
  useUpdateUserAddressDetail,
} from '../../../../stores/cart/cart-store';
import { useTranslation } from 'react-i18next';
import PriceSummery from '../../cart/PriceSummery';

const OrderPrize = ({ subbmitAddress, handleSubmit }: any) => {
  const { addressLoading } = useAddressLoading();
  const { t } = useTranslation();
  const { addressListView, deleteAddressLoading } = useCartStore();
  const { cartItems, selectedProduct } = useCartStore();
  const { updateAddress } = useUpdateUserAddressDetail();

  // const handleSave = async () => {

  //   try {
  //     await createCartAddress(cartItems,selectedAddress);
  //     if (addressListView) {
  //       subbmitAddress();
  //     } else {
  //       handleSubmit(subbmitAddress);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 400) {
  //       toast.error('Error: Bad Request');
  //     } else {
  //       // Handle other errors if needed
  //     }
  //   } finally {

  //   }
  // };

  return (
    <div className="col-lg-4 cart-address-right">
      <div className="total-amount-wrap">
        <OrderDetail />
        {/* <PrizeSummry /> */}
        <PriceSummery
          cartItems={cartItems}
          selectedProduct={selectedProduct}
          t={t}
          text={'priceSummary'}
          showGST={false}
        />

        {updateAddress ? (
          <button
            disabled={addressLoading || deleteAddressLoading}
            onClick={
              addressListView ? subbmitAddress : handleSubmit(subbmitAddress)
            }
            className="btn btn-theme proceed-btn"
          >
            {'Update Address'}
            {addressLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                style={{ marginLeft: '8px' }}
                aria-hidden="true"
              ></span>
            ) : (
              <i className="fa-sharp fa-regular fa-arrow-right-long"></i>
            )}
          </button>
        ) : (
          <button
            disabled={addressLoading || deleteAddressLoading}
            onClick={
              addressListView ? subbmitAddress : handleSubmit(subbmitAddress)
            }
            // onClick={handleSave}
            className="btn btn-theme proceed-btn"
          >
            {t('saveAndContinue')}
            {addressLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                style={{ marginLeft: '8px' }}
                aria-hidden="true"
              ></span>
            ) : (
              <i className="fa-sharp fa-regular fa-arrow-right-long"></i>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
export default OrderPrize;
