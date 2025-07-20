import React, { useState } from 'react';
import { useCartStore } from '../../stores/cart/cart-store';
import { useTranslation } from 'react-i18next';
import Login from '../auth/Login';
import { priceWithCurrency } from '../../utilities/helper';
import {
  calcuLateAssemblyCharges,
  calculateDiscount,
  calculateMainTotal,
  calculateTotal,
} from '../../stores/cart/cart-action';
import Register from '../auth/Register';
import LoginUsingOTP from '../auth/LoginUsingOTP';
import VerifyOtp from '../auth/VerifyOtp';
import ForgotPassword from '../auth/ForgotPassword';
import { useRouter } from 'next/router';
import { useCoupon } from '../../stores/coupon/coupon-store';
import VerifyOtpRegister from '../auth/VerifyOtpRegister';

const LoginBlock = () => {
  const { t } = useTranslation();
  const { cartItems, selectedProduct } = useCartStore();
  const [loginState, setLoginState] = useState(0);
  const { coupon } = useCoupon();

  const callback = (value: number) => {
    setLoginState(value);
  };

  // const { codeCheckLoadingCart, pincodeErrorCart, pincodeSuccessCart } =
  //   useProductDetailValidate();

  // const productIds = cartItems.map((item) => item.product_id).join(',');

  // const success = useMemo(() => {
  //   return pincodeSuccessCart;
  // }, [pincodeSuccessCart]);

  // const error = useMemo(() => {
  //   return pincodeErrorCart;
  // }, [pincodeErrorCart]);

  const router = useRouter();

  return (
    <div className="cart-wrap">
      <div className="row">
        <div className="col-md-7 cart-left">
          {loginState === 0 && (
            <Login inCartView={true} registerCallback={callback} />
          )}
          {loginState === 1 && (
            <Register inCartView={true} loginCallback={callback} />
          )}
          {loginState === 2 && (
            <LoginUsingOTP inCartView={true} loginCallback={callback} />
          )}
          {loginState === 3 && (
            <VerifyOtp inCartView={true} loginCallback={callback} />
          )}
          {loginState === 4 && (
            <ForgotPassword inCartView={true} loginCallback={callback} />
          )}
          {loginState === 5 && (
            <VerifyOtpRegister inCartView={true} loginCallback={callback} />
          )}
        </div>
        <div className="col-md-5 cart-right">
          <div className="total-amount-wrap">
            {/* <div className="delivery-pincode">
              
              <PinCode product_id={productIds} loading={codeCheckLoadingCart} />
              {error && <p className="product-error">{error}</p>}
              {success && <p className="product-success">{success}</p>}
            </div> */}

            {router.pathname.includes('/cart') ? (
              <div className="cart-summary-wrap">
                <h4 className="cart-summary-text text-20 weight-500">
                  {t('cartSummary')} ({cartItems?.length} {t('items')})
                </h4>
                <ul>
                  <li>
                    <span className="weight-500">{t('MRP')}</span>
                    <span className="amount weight-500">
                      {priceWithCurrency(calculateTotal(cartItems))}
                    </span>
                  </li>
                  <li>
                    <span className="weight-500">{t('discount')}</span>
                    <span className="discount weight-500">
                      - {priceWithCurrency(calculateDiscount(cartItems))}
                    </span>
                  </li>
                  <li>
                    <span className="weight-500">{t('assemblyCharges')}</span>
                    <span className="amount weight-500">
                      {priceWithCurrency(calcuLateAssemblyCharges())}
                    </span>
                  </li>
                </ul>

                <div className="pay-amount-wrap">
                  <h3 className="pay-text text-24 weight-600 ">
                    {t('youPay')}
                  </h3>
                  <h3 className="pay-amount-num text-24 weight-600 ">
                    {priceWithCurrency(
                      calculateMainTotal(cartItems, coupon, false)
                    )}
                  </h3>
                </div>
                <p className="tax-line">{t('inclusiveOfAllTaxes')}</p>
                <p className="save-amount-text weight-500">
                  Congratulation! You just saved{' '}
                  {priceWithCurrency(calculateDiscount(cartItems))} on your
                  order.
                </p>
              </div>
            ) : (
              <div className="cart-summary-wrap">
                <h4 className="cart-summary-text text-20 weight-500">
                  {t('cartSummary')} (1 {t('items')})
                </h4>
                <ul>
                  <li>
                    <span className="weight-500">{t('MRP')}</span>
                    <span className="amount weight-500">
                      {priceWithCurrency(
                        selectedProduct?.price *
                          (selectedProduct?.selectQuantity ||
                            selectedProduct?.minimum_quantity ||
                            1)
                      )}
                    </span>
                  </li>
                  <li>
                    <span className="weight-500">{t('discount')}</span>
                    <span className="discount weight-500">
                      -{' '}
                      {selectedProduct?.discounted_price
                        ? priceWithCurrency(
                            (selectedProduct?.price -
                              selectedProduct?.discounted_price
                                ?.discounted_price) *
                              (selectedProduct?.selectQuantity ||
                                selectedProduct?.minimum_quantity ||
                                1)
                          )
                        : priceWithCurrency(0)}
                    </span>
                  </li>
                  <li>
                    <span className="weight-500">{t('assemblyCharges')}</span>
                    <span className="amount weight-500">
                      {selectedProduct?.assembly_charges
                        ? priceWithCurrency(selectedProduct?.assembly_charges)
                        : priceWithCurrency(0)}
                    </span>
                  </li>
                </ul>

                <div className="pay-amount-wrap">
                  <h3 className="pay-text text-24 weight-600 ">
                    {t('youPay')}
                  </h3>
                  <h3 className="pay-amount-num text-24 weight-600 ">
                    {priceWithCurrency(
                      selectedProduct?.price *
                        (selectedProduct?.selectQuantity ||
                          selectedProduct?.minimum_quantity ||
                          1) -
                        (selectedProduct?.discounted_price?.discounted_price
                          ? (selectedProduct?.price -
                              selectedProduct?.discounted_price
                                ?.discounted_price) *
                            (selectedProduct?.selectQuantity ||
                              selectedProduct?.minimum_quantity ||
                              1)
                          : 0) +
                        (selectedProduct?.assembly_charges
                          ? selectedProduct?.assembly_charges
                          : 0)
                    )}
                  </h3>
                </div>
                <p className="tax-line">{t('inclusiveOfAllTaxes')}</p>
                <p className="save-amount-text weight-500">
                  Congratulation! You just saved
                  {selectedProduct?.discounted_price
                    ? priceWithCurrency(
                        (selectedProduct?.price -
                          selectedProduct?.discounted_price?.discounted_price) *
                          (selectedProduct?.selectQuantity ||
                            selectedProduct?.minimum_quantity ||
                            1)
                      )
                    : priceWithCurrency(0)}{' '}
                  on your order.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBlock;
