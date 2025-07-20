import React from 'react';
import ProgressiveImage from '../../shared/progressive-image';

import { priceWithCurrency } from '../../utilities/helper';
// import { useSelectedProductCombination } from '../../stores/product-detail/product-store';

const Prices = ({ selectedProduct, result }: any) => {
  // const selectedProductCombination = useSelectedProductCombination()
  // const { selectQuantity, minimum_quantity } = selectedProductCombination;
  // const quantity = selectQuantity || minimum_quantity;
  const { discounted_price } = selectedProduct;
  console.log('selectedProduct', result, selectedProduct);
  return (
    <div className="product-prize-wrap">
      <div className="product-prize">
        {discounted_price && discounted_price?.discounted_price !== null && (
          <h4 className="product-old-prize text-16 weight-500 mb-0">
            {priceWithCurrency(selectedProduct?.price)}
          </h4>
        )}
        <h3 className="product-new-prize text-26 weight-600 mb-0">
          {priceWithCurrency(
            discounted_price?.discounted_price
              ? discounted_price?.discounted_price
              : selectedProduct?.price
          )}
        </h3>
        {discounted_price && discounted_price?.reduction !== null && (
          <p className="product-off mb-0">
            {discounted_price?.reduction_type === 'dollar'
              ? `${priceWithCurrency(discounted_price?.reduction)} OFF`
              : `${discounted_price?.reduction}% OFF`}
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
