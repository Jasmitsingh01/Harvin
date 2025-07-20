import React from 'react';
import Button from '../../shared/common/Button';
import { useTranslation } from 'react-i18next';
import { useAddToCartLoading } from '../../stores/cart/cart-store';

const AddToCartAndBuy = ({ handleBuy, handleCart, loading, error }: any) => {
  const { t } = useTranslation();
  const loadingCart = useAddToCartLoading();
  return (
    <div className="add-buy-btn-wrap">
      <Button
        className={'btn add-to-cart-btn'}
        onClick={() => handleCart()}
        showIcon={true}
        disabled={loadingCart || loading || !!error}
        loading={loadingCart}
        icon={() => <i className="fa-solid fa-plus"></i>}
        text={t('addToCart')}
      />

      {/* <button className="btn buy-now-btn">
                <i className="fa-solid fa-bolt"></i>Buy Now
            </button> */}

      <Button
        className={
          loading || !!error ? 'tn buy-now-btn-disabled' : 'tn buy-now-btn'
        }
        onClick={() => handleBuy()}
        showIcon={true}
        disabled={loading || !!error}
        icon={() => (
          <i
            className="fa-solid fa-bolt"
            style={{ color: loading || !!error ? 'black' : '' }}
          ></i>
        )}
        text={t('buyNow')}
      />
    </div>
  );
};

export default AddToCartAndBuy;
