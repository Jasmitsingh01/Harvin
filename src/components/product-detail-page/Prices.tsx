import React from 'react';
import ProgressiveImage from '../../shared/progressive-image';

import { priceWithCurrency } from '../../utilities/helper';
import { usePincodeBasedPrice } from '../../stores/product-detail/product-store';
// import { useSelectedProductCombination } from '../../stores/product-detail/product-store';

const Prices = ({ selectedProduct, result }: any) => {
  // const selectedProductCombination = useSelectedProductCombination()
  // const { selectQuantity, minimum_quantity } = selectedProductCombination;
  // const quantity = selectQuantity || minimum_quantity;
  const { discounted_price } = selectedProduct;
  const { pincodeBasedPrice, pincodeBasedSku, isPincodePriceAvailable } =
    usePincodeBasedPrice();

  // console.log('selectedProduct', result, selectedProduct);
  // console.log('Pincode price data:', { pincodeBasedPrice, pincodeBasedSku, isPincodePriceAvailable });
  // console.log('Product reference_code:', selectedProduct?.reference_code);
  // console.log('Product price:', selectedProduct?.price);

  // Determine the price to display
  const displayPrice =
    isPincodePriceAvailable && pincodeBasedPrice
      ? pincodeBasedPrice
      : discounted_price?.discounted_price || selectedProduct?.price;

  // Determine if we should show the original price as strikethrough
  const shouldShowOriginalPrice =
    discounted_price?.discounted_price !== null ||
    (isPincodePriceAvailable &&
      pincodeBasedPrice &&
      pincodeBasedPrice !== selectedProduct?.price);

  return (
    <div className="product-prize-wrap">
      <div className="product-prize">
        {shouldShowOriginalPrice && (
          <h4 className="product-old-prize text-16 weight-500 mb-0">
            {priceWithCurrency(selectedProduct?.price)}
          </h4>
        )}
        <h3 className="product-new-prize text-26 weight-600 mb-0">
          {priceWithCurrency(displayPrice)}
          {isPincodePriceAvailable && pincodeBasedPrice && (
            <span
              style={{
                fontSize: '14px',
                color: '#28a745',
                marginLeft: '8px',
                fontWeight: '500',
              }}
            >
              • Local Price
            </span>
          )}
        </h3>
        {discounted_price && discounted_price?.reduction !== null && (
          <p className="product-off mb-0">
            {discounted_price?.reduction_type === 'dollar'
              ? `${priceWithCurrency(discounted_price?.reduction)} OFF`
              : `${discounted_price?.reduction}% OFF`}
          </p>
        )}
        {isPincodePriceAvailable && pincodeBasedPrice && pincodeBasedSku && (
          <p
            className="product-pincode-info mb-0"
            style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}
          >
            Pincode Price • SKU: {pincodeBasedSku}
          </p>
        )}
      </div>
      {/* {result?.coupon !== null && result?.coupon?.image_url !== null && (
        <div className="discount-coupon-img">
          <ProgressiveImage
            height={60}
            src={result?.coupon?.image_url?.url}
            alt=""
            className="w-100"
          />
        </div>
      )} */}
      {result?.coupon !== null && result?.coupon?.image_url !== null && (
        <div className="discount-coupon-img">
          <ProgressiveImage
            height={60}
            src={result?.coupon?.image_url?.url}
            alt=""
            className="w-100"
          />
        </div>
      )}
    </div>
  );
};

export default Prices;
