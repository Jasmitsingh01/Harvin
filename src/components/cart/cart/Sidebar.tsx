import React from 'react';

interface SidebarProp {
  showCouponList: boolean;
  setShowCouponList: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: any;
  selectedProduct: any;
}
import { useTranslation } from 'react-i18next';
import Input from '../../../shared/fields/Input';
import useSWR from 'swr';
import ROUTES from '../../../utilities/api-routes';
import { fetcherSWR } from '../../../services/api';
import {
  applyCoupon,
  removeCoupon,
} from '../../../stores/coupon/coupon-action';
import { useCouponData } from '../../../stores/coupon/coupon-store';
import { useRouter } from 'next/router';
const Sidebar = ({
  showCouponList,
  setShowCouponList,
  cartItems,
  selectedProduct,
}: SidebarProp) => {
  const { t } = useTranslation();
  const swrConfig = {
    revalidateIfStale: true,
    refreshInterval: 0,
    revalidateOnFocus: false,
  };
  const { data: coupons } = useSWR(ROUTES.couponList(), fetcherSWR, swrConfig);
  const { loading, error, loadingId, errorId, coupon } = useCouponData();

  const router = useRouter();

  const handleClick = (coupon) => {
    let productsToSend;

    // Check the router path to determine which items to send
    if (router.pathname.includes('cart')) {
      productsToSend = cartItems; // Assuming cartItem is available in your component scope
    } else {
      // Check if selectedProduct is not an array, then convert it to an array
      const products = Array.isArray(selectedProduct)
        ? selectedProduct
        : [selectedProduct];
      productsToSend = products;
      console.log(productsToSend[0].price, 'sdbjdbsjh');
    }

    // Apply coupon to the productsToSend array
    applyCoupon(
      productsToSend,
      coupon,
      productsToSend[0].selectQuantity
        ? productsToSend[0].price * productsToSend[0].selectQuantity
        : productsToSend[0].price * 1
    );
  };

  const handleRemove = () => {
    removeCoupon();
  };
  return (
    <>
      <div
        className={`offcanvas offcanvas-end apply-coupon-side ${
          showCouponList ? 'show' : ''
        } `}
        id="apply-coupon"
        aria-modal="true"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title text-18 weight-600"
            id="offcanvasRightLabel"
          >
            {t('applyCoupon')}
          </h5>
          <button
            onClick={() => setShowCouponList(!showCouponList)}
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body special-offer-side">
          <div className="apply-coupon-code-wrap">
            <Input
              type="text"
              className="coupon-num"
              placeholder={t('enterCouponCode')}
            />
            <button className="btn apply-btn text-theme">{t('change')}</button>
          </div>
          {coupons?.data.map((elem) => {
            return (
              <div className="offer-coupon-wrap" key={elem?.coupon_title}>
                <div className="code-wrap">
                  <h4>{elem?.code}</h4>
                  {coupon?.id === elem.id ? (
                    <>
                      <a href="#">Applied </a>
                      <a href="#" onClick={handleRemove}>
                        X
                      </a>
                    </>
                  ) : (
                    <a href="#" onClick={() => handleClick(elem)}>
                      {loadingId == elem.id && loading
                        ? t('applying')
                        : t('apply')}
                    </a>
                  )}
                </div>
                <div className="offer-detail">
                  <p>{elem?.coupon_title}</p>
                  <p>{elem?.description}</p>
                  <p>Get Upto 10% Off On Your Purchase</p>
                  {errorId == elem.id && (
                    <p style={{ color: 'red' }}>{error}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
