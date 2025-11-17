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
import { useCartPincodeBasedPrice } from '../../../stores/cart/cart-store';
import { isEmpty } from 'lodash';

const PriceSummery = ({
  cartItems,
  t,
  text,
  selectedProduct,
  showGST,
}: any) => {
  const { coupon } = useCoupon();
  const { pincodeBasedPrices, isPincodePriceAvailable } =
    useCartPincodeBasedPrice();
  const router = useRouter();

  const cgst = calcuLateCGSTCharges(showGST);
  // const cgstPercentage = calcuLateCGSTChargesPercentage(showGST);
  const sgst = calcuLateSGSTCharges(showGST);
  // const sgstPercentage = calcuLateSGSTChargesPercentage(showGST);

  const selectedProductCGST = selectedProduct?.gst_detail?.Total_CGST;
  const selectedProductSGST = selectedProduct?.gst_detail?.Total_SGST;
  // const selectedProductCGSTPercentage = selectedProduct?.gst_detail?.Average_CGST;
  // const selectedProductSGSTPercentage = selectedProduct?.gst_detail?.Average_SGST;

  // Calculate pincode-based discount for selected product (when pincode price < actual price)
  const pincodePrice = pincodeBasedPrices['selectedProduct'];
  const originalPrice = selectedProduct?.price;
  const quantity =
    selectedProduct?.selectQuantity || selectedProduct?.minimum_quantity || 1;
  const pincodeDiscount =
    pincodePrice && originalPrice && pincodePrice < originalPrice
      ? (originalPrice - pincodePrice) * quantity
      : 0;

  // Calculate additional assembly charges for selected product (when pincode price > actual price)
  const selectedProductPincodeAssemblyCharges =
    pincodePrice && originalPrice && pincodePrice > originalPrice
      ? (pincodePrice - originalPrice) * quantity
      : 0;

  // Calculate pincode-based discount for cart items (when pincode price < actual price)
  const cartPincodeDiscount =
    cartItems?.reduce((total, item: any) => {
      if (!item.errorMessage && pincodeBasedPrices[item.id]) {
        const itemOriginalPrice = item?.base_price || item?.unit_price || 0;
        const itemPincodePrice = pincodeBasedPrices[item.id];
        const itemQuantity = item?.selectQuantity || item?.select_quantity || 1;

        if (itemPincodePrice < itemOriginalPrice) {
          return total + (itemOriginalPrice - itemPincodePrice) * itemQuantity;
        }
      }
      return total;
    }, 0) || 0;

  // Calculate additional assembly charges when pincode price > actual price
  const cartPincodeAssemblyCharges =
    cartItems?.reduce((total, item: any) => {
      if (!item.errorMessage && pincodeBasedPrices[item.id]) {
        const itemOriginalPrice = item?.base_price || item?.unit_price || 0;
        const itemPincodePrice = pincodeBasedPrices[item.id];
        const itemQuantity = item?.selectQuantity || item?.select_quantity || 1;

        if (itemPincodePrice > itemOriginalPrice) {
          return total + (itemPincodePrice - itemOriginalPrice) * itemQuantity;
        }
      }
      return total;
    }, 0) || 0;

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
                  {isPincodePriceAvailable && (
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#28a745',
                        marginLeft: '8px',
                      }}
                    >
                      • Local Pricing
                    </span>
                  )}
                </span>
              </li>
              <li>
                <span className="weight-500">{t('discount')}</span>
                <span className="discount weight-500">
                  - {priceWithCurrency(calculateDiscount(cartItems))}
                </span>
              </li>
              {cartPincodeDiscount > 0 && (
                <li>
                  <span className="weight-500">
                    {t('discount')} (Local Pricing)
                  </span>
                  <span className="discount weight-500">
                    - {priceWithCurrency(cartPincodeDiscount)}
                  </span>
                </li>
              )}
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
                  {priceWithCurrency(
                    calcuLateAssemblyCharges() + cartPincodeAssemblyCharges
                  )}
                  {cartPincodeAssemblyCharges > 0 && (
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#ff6b6b',
                        marginLeft: '8px',
                      }}
                    >
                      (Includes Local Pricing)
                    </span>
                  )}
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
                  calculateMainTotal(
                    cartItems,
                    coupon,
                    showGST,
                    pincodeBasedPrices,
                    cartPincodeAssemblyCharges
                  )
                )}
              </h3>
            </div>
            <p className="tax-line">{t('inclusiveOfAllTaxes')}</p>
            <p className="save-amount-text weight-500">
              Congratulation! You just saved
              <span>
                {' '}
                {priceWithCurrency(
                  calculateDiscount(cartItems) +
                    (coupon?.discount_amount || 0) +
                    cartPincodeDiscount
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
                {isPincodePriceAvailable && (
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#28a745',
                      marginLeft: '8px',
                    }}
                  >
                    • Local Pricing
                  </span>
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

            {pincodeDiscount > 0 && (
              <li>
                <span className="weight-500">
                  {t('discount')} (Local Pricing)
                </span>
                <span className="discount weight-500">
                  - {priceWithCurrency(pincodeDiscount)}
                </span>
              </li>
            )}

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
                {priceWithCurrency(
                  (selectedProduct?.assembly_charges || 0) +
                    selectedProductPincodeAssemblyCharges
                )}
                {selectedProductPincodeAssemblyCharges > 0 && (
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#ff6b6b',
                      marginLeft: '8px',
                    }}
                  >
                    (Includes Local Pricing)
                  </span>
                )}
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
                    : 0) -
                  pincodeDiscount +
                  ((selectedProduct?.assembly_charges || 0) +
                    selectedProductPincodeAssemblyCharges) -
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
              {isPincodePriceAvailable &&
                pincodeBasedPrices['selectedProduct'] && (
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#28a745',
                      marginLeft: '8px',
                    }}
                  >
                    • Local Pricing
                  </span>
                )}
            </h3>
          </div>
          <p className="tax-line">{t('inclusiveOfAllTaxes')}</p>
          {selectedProduct?.discounted_price || pincodeDiscount > 0 ? (
            <p className="save-amount-text weight-500">
              Congratulation! You just saved
              {priceWithCurrency(
                (selectedProduct?.price -
                  (selectedProduct?.discounted_price?.discounted_price || 0)) *
                  (selectedProduct?.selectQuantity ||
                    selectedProduct?.minimum_quantity ||
                    1) +
                  (coupon?.discount_amount || 0) +
                  pincodeDiscount
              )}
              on your order.
            </p>
          ) : (
            <p className="save-amount-text weight-500">
              Congratulation! You just saved
              {priceWithCurrency(
                (coupon?.discount_amount || 0) + pincodeDiscount
              )}
              on your order.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default PriceSummery;
