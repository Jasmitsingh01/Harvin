import React from 'react';
import { priceWithCurrency } from '../../utilities/helper';

const CardPrices = ({ prices }: any) => {
  //   new price price = prices?.price - prices?.discounted_price.discounted_price
  // prices?.price - prices?.discounted_price.discounted_price

  return (
    <div className="product-price-wrap d-flex">
      {prices && prices?.price !== '' ? (
        <span className="new-price">
          {priceWithCurrency(
            prices?.discounted_price
              ? prices?.discounted_price?.discounted_price
              : prices?.price
          )}
        </span>
      ) : (
        ''
      )}
      {prices?.discounted_price &&
      prices?.discounted_price?.discounted_price !== null ? (
        <>
          {prices?.price !== null ? (
            <span className="old-price">₹ {prices?.price}</span>
          ) : null}
          {prices?.discounted_price?.reduction !== null ? (
            <span className="discount">
              {prices?.discounted_price?.reduction_type === 'dollar'
                ? `${priceWithCurrency(
                    prices?.discounted_price?.reduction
                  )} OFF`
                : `${prices?.discounted_price?.reduction}% OFF`}
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default CardPrices;
