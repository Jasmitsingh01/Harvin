import React from 'react';
import { priceWithCurrency } from '../../../utilities/helper';
import {
  calcuLateAssemblyCharges,
  calcuLateCGSTCharges,
  calcuLateCGSTChargesPercentage,
  calcuLateSGSTCharges,
  calcuLateSGSTChargesPercentage,
  calculateDiscount,
  calculateMainTotal,
  calculateTotal,
} from '../../../stores/cart/cart-action';
import { useRouter } from 'next/router';
import { useCoupon } from '../../../stores/coupon/coupon-store';
import { isEmpty } from 'lodash';

const PriceSummery = ({
  cartItems,
  t,
  text,
  selectedProduct,
  showGST,
}: any) => {
  const { coupon } = useCoupon();
  const router = useRouter();

  const cgst = calcuLateCGSTCharges(showGST);
  // const cgstPercentage = calcuLateCGSTChargesPercentage(showGST);
  const sgst = calcuLateSGSTCharges(showGST);
  // const sgstPercentage = calcuLateSGSTChargesPercentage(showGST);

  const selectedProductCGST = selectedProduct?.gst_detail?.Total_CGST;
  const selectedProductSGST = selectedProduct?.gst_detail?.Total_SGST;
  // const selectedProductCGSTPercentage = selectedProduct?.gst_detail?.Average_CGST;
  // const selectedProductSGSTPercentage = selectedProduct?.gst_detail?.Average_SGST;

  return (
    <>
      {router.pathname.includes('/cart') ? (
        <div>
          <div className="cart-summary-wrap">
            <h4 className="cart-summary-text text-20 weight-500">
              {t(text)} ({cartItems?.length} {t('items')})
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
              {!isEmpty(coupon) && (
                <li>
                  <span className="weight-500">
                    {t('coupon')} ({coupon.code})
                  </span>
                  <span className="discount weight-500">
                    - {priceWithCurrency(coupon.discount_amount)}
                  </span>
                </li>
              )}
              <li>
                <span className="weight-500">{t('assemblyCharges')}</span>
                <span className="amount weight-500">
                  {priceWithCurrency(calcuLateAssemblyCharges())}
                </span>
              </li>

              {showGST && (
                <>
                  {cgst > 0 && (
                    <li>
                      <span className="weight-500">{t('CGST')}</span>
                      <span className="amount weight-500">
                        {priceWithCurrency(calcuLateCGSTCharges(showGST))} (
                        {calcuLateCGSTChargesPercentage(showGST)}%)
                      </span>
                    </li>
                  )}
                  {sgst > 0 && (
                    <li>
                      <span className="weight-500">{t('SGST')}</span>
                      <span className="amount weight-500">
                        {priceWithCurrency(calcuLateSGSTCharges(showGST))} (
                        {calcuLateSGSTChargesPercentage(showGST)}%)
                      </span>
                    </li>
                  )}
                </>
              )}
            </ul>

            <div className="pay-amount-wrap">
              <h3 className="pay-text text-24 weight-600 ">{t('youPay')}</h3>
              <h3 className="pay-amount-num text-24 weight-600 ">
                {priceWithCurrency(
                  calculateMainTotal(cartItems, coupon, showGST)
                )}
              </h3>
            </div>
            <p className="tax-line">{t('inclusiveOfAllTaxes')}</p>
            <p className="save-amount-text weight-500">
              Congratulation! You just saved
              <span>
                {' '}
                {priceWithCurrency(
                  calculateDiscount(cartItems) + (coupon?.discount_amount || 0)
                )}
              </span>{' '}
              on your order.
            </p>
          </div>
        </div>
      ) : (
        <div className="cart-summary-wrap">
          <h4 className="cart-summary-text text-20 weight-500">
            {t(text)} (1 {t('items')})
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
                {priceWithCurrency(
                  (selectedProduct?.price -
                    selectedProduct?.discounted_price?.discounted_price) *
                    (selectedProduct?.selectQuantity ||
                      selectedProduct?.minimum_quantity ||
                      1)
                )}
              </span>
            </li>

            {!isEmpty(coupon) && (
              <li>
                <span className="weight-500">
                  {t('coupon')} ({coupon.code})
                </span>
                <span className="discount weight-500">
                  - {priceWithCurrency(coupon.discount_amount)}
                </span>
              </li>
            )}
            <li>
              <span className="weight-500">{t('assemblyCharges')}</span>
              <span className="amount weight-500">
                {selectedProduct?.assembly_charges
                  ? priceWithCurrency(selectedProduct?.assembly_charges)
                  : priceWithCurrency(0)}
              </span>
            </li>

            {showGST && selectedProductCGST > 0 && (
              <li>
                <span className="weight-500">{t('CGST')}</span>
                <span className="amount weight-500">
                  {priceWithCurrency(
                    selectedProduct?.gst_detail?.Total_CGST *
                      (selectedProduct?.selectQuantity ||
                        selectedProduct?.minimum_quantity ||
                        1)
                  )}
                  ({selectedProduct?.gst_detail?.Average_CGST}%)
                </span>
              </li>
            )}

            {showGST && selectedProductSGST > 0 && (
              <li>
                <span className="weight-500">{t('SGST')}</span>
                <span className="amount weight-500">
                  {priceWithCurrency(
                    selectedProduct?.gst_detail?.Total_CGST *
                      (selectedProduct?.selectQuantity ||
                        selectedProduct?.minimum_quantity ||
                        1)
                  )}{' '}
                  ({selectedProduct?.gst_detail?.Average_SGST}%)
                </span>
              </li>
            )}
          </ul>

          <div className="pay-amount-wrap">
            <h3 className="pay-text text-24 weight-600 ">{t('youPay')}</h3>
            <h3 className="pay-amount-num text-24 weight-600 ">
              {/* {priceWithCurrency(
                selectedProduct?.price *
                  (selectedProduct?.selectQuantity ||
                    selectedProduct?.minimum_quantity ||
                    1) -
                  (selectedProduct?.discounted_price?.discounted_price
                    ? (selectedProduct?.price -
                        selectedProduct?.discounted_price?.discounted_price) *
                      (selectedProduct?.selectQuantity ||
                        selectedProduct?.minimum_quantity ||
                        1)
                    : 0) +
                  (selectedProduct?.assembly_charges
                    ? selectedProduct?.assembly_charges
                    : 0) -
                  (coupon?.discount_amount || 0)
              )} */}
              {priceWithCurrency(
                selectedProduct?.price *
                  (selectedProduct?.selectQuantity ||
                    selectedProduct?.minimum_quantity ||
                    1) -
                  (selectedProduct?.discounted_price?.discounted_price
                    ? (selectedProduct?.price -
                        selectedProduct?.discounted_price?.discounted_price) *
                      (selectedProduct?.selectQuantity ||
                        selectedProduct?.minimum_quantity ||
                        1)
                    : 0) +
                  (selectedProduct?.assembly_charges
                    ? selectedProduct?.assembly_charges
                    : 0) -
                  (coupon?.discount_amount || 0) +
                  (showGST
                    ? (selectedProduct?.gst_detail?.Total_CGST *
                        (selectedProduct?.selectQuantity ||
                          selectedProduct?.minimum_quantity ||
                          1) || 0) +
                      (selectedProduct?.gst_detail?.Total_SGST *
                        (selectedProduct?.selectQuantity ||
                          selectedProduct?.minimum_quantity ||
                          1) || 0)
                    : 0)
              )}
            </h3>
          </div>
          <p className="tax-line">{t('inclusiveOfAllTaxes')}</p>
          {selectedProduct?.discounted_price ? (
            <p className="save-amount-text weight-500">
              Congratulation! You just saved
              {priceWithCurrency(
                (selectedProduct?.price -
                  (selectedProduct?.discounted_price?.discounted_price || 0)) *
                  (selectedProduct?.selectQuantity ||
                    selectedProduct?.minimum_quantity ||
                    1) +
                  (coupon?.discount_amount || 0)
              )}
              on your order.
            </p>
          ) : (
            <p className="save-amount-text weight-500">
              Congratulation! You just saved
              {priceWithCurrency(coupon?.discount_amount || 0)}
              on your order.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default PriceSummery;
