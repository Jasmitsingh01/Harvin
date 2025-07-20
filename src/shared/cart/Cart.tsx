import React from 'react';
// import { CartStyled } from './styled'
// import Image from 'next/image'

import { useTranslation } from 'react-i18next';
import {
  decrement,
  incrementCartData,
  removeFromCart,
} from '../../stores/cart/cart-action';
// import { useCartStore } from '../../stores/cart/cart-store';
import Input from '../fields/Input';
import {
  useCartStore,
  useValidateProductLoading,
} from '../../stores/cart/cart-store';
import { isUserLoggedIn, newPrice, oldPrice } from '../../utilities/helper';
import { addToWishList } from '../../stores/wishlist/wishlist-action';
import { loginModalOpen, setModalType } from '../../stores/user/user-action';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import {  useCartItms } from '../../stores/cart/cart-store';

const CartProduct = ({ product, key }: any) => {
  const { t } = useTranslation();
  const { loading } = useCartStore();
  // const validateLoading = useValidateProductLoading(product.id);
  const validateLoading = useValidateProductLoading(
    `${product.id}_${product.product_attribute_id}`
  );

  const router = useRouter();
  const handleIncrement = (id: number) => {
    incrementCartData(id, product);
  };
  const handleDecrement = (id: number) => {
    decrement(id, product);
  };
  const handleDelete = (id: any) => {
    removeFromCart(id);
  };

  const productDetail = () => {
    if (product.isError || product.message) {
      return (
        <p className="product-error">
          {product.errorMessage || product.message}
        </p>
      );
    }

    const discountedPrice =
      product.discounted_price || product?.product_attribute?.discounted_price;
    const { price, discount, reductionType, prefix } = oldPrice(product);
    return (
      <div className="quantity-price d-flex align-items-center">
        <div className="quantity-wrap d-flex align-items-center">
          <span className="">{t('quantity')}</span>
          <div className="quantity">
            <button
              disabled={validateLoading || loading}
              onClick={() => handleDecrement(product?.id)}
            >
              -
            </button>
            <Input
              type="text"
              className="quantity-num"
              disabled={validateLoading || loading}
              value={product?.selectQuantity || product.select_quantity}
            />
            <button
              disabled={validateLoading || loading}
              onClick={() => handleIncrement(product?.id)}
            >
              +
            </button>
            {/* <div className={`quantityloader ${validateLoading && 'show'}`} /> */}
            <div className={`quantityloader ${validateLoading && 'show'}`} />
          </div>
        </div>
        <div className="product-price-wrap d-flex align-items-center">
          <span className="new-price">{newPrice(product)}</span>
          {discountedPrice && <span className="old-price">{price}</span>}
          {discountedPrice && (
            <span className="discount">
              {!prefix
                ? `${discount} ${reductionType}`
                : `${reductionType} ${discount}`}{' '}
              OFF
            </span>
          )}
        </div>
      </div>
    );
  };

  const getImage = () => {
    const imageObject =
      (product?.images && product?.images[0]) ||
      (product?.product_attribute?.images &&
        product?.product_attribute?.images[0]);
    return imageObject?.original;
  };

  return (
    <div className="cart-product-item d-flex" key={key}>
      <div
        className="cart-product-img"
        style={{ cursor: 'pointer' }}
        onClick={() =>
          router.push(`/product/${product?.product_id}-${product?.slug}`)
        }
      >
        <Image
          src={getImage() || product?.image}
          width={100}
          height={100}
          alt=""
        />
      </div>
      <div className="cart-product-detail">
        <h3
          className="product-name text-18 weight-500"
          style={{ cursor: 'pointer' }}
          onClick={() =>
            router.push(`/product/${product?.product_id}-${product?.slug}`)
          }
        >
          {product?.name}
        </h3>
        <p className="product-material">
          {product?.material || product?.all_combination}
        </p>
        <p className="product-charges">
          Assembly Charges: ₹ {product?.assembly_charges}
        </p>
        {productDetail()}
        <div className="product-wishlist-remove d-flex align-items-center">
          <a className="wishlist-wrap d-flex align-items-center">
            <i
              className={`fa-sharp ${
                product.in_wishlist ? 'fa' : 'fa-regular'
              } fa-heart`}
              onClick={() => {
                if (isUserLoggedIn()) {
                  addToWishList(product?.id, product.product_attribute_id);

                  handleDelete(product?.product_attribute_id);
                } else {
                  setModalType('login');
                  loginModalOpen(true);
                }
              }}
            ></i>
            <span
              className="wishlist-text text-14 weight-500"
              onClick={() => {
                if (isUserLoggedIn()) {
                  addToWishList(product?.id, product.product_attribute_id);

                  handleDelete(product?.product_attribute_id);
                } else {
                  setModalType('login');
                  loginModalOpen(true);
                }
              }}
            >
              {t('moveToWishList')}
            </span>
          </a>
          <p className="remove-wrap d-flex align-items-center">
            <i className="fa-regular fa-trash-can"></i>
            <span
              className="remove-text text-14 weight-500"
              onClick={() => handleDelete(product?.product_attribute_id)}
            >
              {t('removeProduct')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
