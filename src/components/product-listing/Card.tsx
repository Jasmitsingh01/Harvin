import React, { useEffect, useMemo, useState } from 'react';
import ProgressiveImage from '../../shared/progressive-image';
import { ProductType } from '../../interface/common';
import { Rating } from '@mui/material';
import { useRouter } from 'next/router';
import CardPrices from '../../shared/cards/CardPrices';
// import { ProductListingStyledCard } from './cardStyled';
import { get } from 'lodash';
import { isUserLoggedIn } from '../../utilities/helper';
import { addToWishList } from '../../stores/wishlist/wishlist-action';
import { loginModalOpen } from '../../stores/user/user-action';
import { useWishListProductIds } from '../../stores/wishlist/wishlist-store';
import { addToCart } from '../../stores/cart/cart-action';
import Image from 'next/image';

const Card = ({ product, key }: ProductType | any) => {
  const router = useRouter();
  const [index, setIndex] = React.useState(0);

  const handleMouseEnter = () => {
    if (
      get(product, 'gallery.length', 0) > 0 &&
      get(product, 'gallery[1].original')
    ) {
      setIndex(1);
    }
  };
  const handleMouseLeave = () => {
    setIndex(0);
  };

  const wishlistProductIds = useWishListProductIds();
  const [colorAttribute, setColorAttribute] = useState<any>({});
  const wishlistIcon = useMemo(() => {
    const isActive =
      colorAttribute &&
      wishlistProductIds.find(
        (elem) =>
          elem?.product_attribute_id === colorAttribute?.id &&
          elem?.product_id === colorAttribute?.product_id
      );

    return (
      <i
        className={`fa-sharp fa-heart ${
          isActive ? 'fa text-danger' : 'fa-regular'
        }`}
      ></i>
    );
  }, [wishlistProductIds.length, colorAttribute]);

  const setWishlistIntoLogin = (product_id, product_attribute_id) => {
    localStorage.setItem(
      'wishlistAttr',
      JSON.stringify({ product_id, product_attribute_id })
    );
    loginModalOpen(true);
  };
  const filterProductsByAttribute = (products, attributeValueId) => {
    const filteredProducts = products.find((product) =>
      product.attribute_combinations.some(
        (combo) => combo.attribute_value_id === attributeValueId
      )
    );
    const obj = {
      ...filteredProducts,
      colorID: attributeValueId,
      name: product?.name,
      image: product?.gallery[0]?.original,
    };
    setColorAttribute(obj);
    return filteredProducts;
  };
  useEffect(() => {
    const firstIndex =
      product?.product_color_combination?.length > 0
        ? product?.product_color_combination[0]?.id
        : product?.product_combination_short[0]?.combinations[0]
            ?.attribute_value?.id;
    const filteredProducts = product?.attribute_combinations.find((product) =>
      product.attribute_combinations.some(
        (combo) => combo.attribute_value_id === firstIndex
      )
    );
    const obj = {
      ...filteredProducts,
      colorID: firstIndex,
      name: product?.name,
      image: product?.gallery[0]?.original,
      slug: product?.slug,
    };
    setColorAttribute(obj);
  }, []);

  console.log(colorAttribute, 'sdhdsfjkhfds');

  return (
    <div
      className="product-item"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/product/${product?.id}-${product?.slug}`);
      }}
      key={key}
    >
      <div
        className="product-img"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ProgressiveImage
          src={
            product?.gallery[index]?.original ||
            colorAttribute?.images?.[0]?.original ||
            'default_image_url'
          }
          alt=""
          className="w-100"
        />
        <div
          className="add-to-cart-btn-wrap"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(colorAttribute);
          }}
        >
          <span className="add-to-cart-btn">Add To Cart</span>
        </div>
        <span
          className="wishlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            isUserLoggedIn()
              ? addToWishList(colorAttribute?.product_id, colorAttribute?.id)
              : setWishlistIntoLogin(
                  colorAttribute?.product_id,
                  colorAttribute?.id
                );
          }}
        >
          {/* <i className="fa-sharp fa-regular fa-heart"></i> */}
          {wishlistIcon}
        </span>
      </div>
      <div className="product-detail">
        <span className="product-name">{product?.name}</span>
        {product?.product_combination_short && (
          <CardPrices prices={product?.product_combination_short[0]} />
        )}
        {/* <div className="product-price-wrap d-flex">
          <span className="new-price">₹ {product?.product_combination_short[0]?.price}</span>
          <span className="old-price">₹ 25,000</span>
          <span className="discount">  40% OFF</span>
        </div> */}

        <div className="rating-wrap d-flex align-items-center">
          <div className="rating-star d-flex align-items-center">
            <Rating
              readOnly
              value={product?.ratings}
              style={{ color: 'black', fontSize: '15px' }}
            />
          </div>
          <span className="rating-num">({product?.total_reviews})</span>
        </div>
        <div className="product-color-wrap d-flex align-items-center">
          {product?.product_color_combination?.map(
            (color: any, index: number) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  filterProductsByAttribute(
                    product?.attribute_combinations,
                    color?.id
                  );
                }}
                className={`product-color  ${
                  color?.id === colorAttribute?.colorID ? 'active' : ''
                }  `}
                style={{ paddingBottom: '15px' }}
                key={index}
              >
                <span
                  style={{
                    marginRight: '10px',
                  }}
                >
                  <>
                    {color?.cover_image && (
                      <Image
                        alt="Not Found"
                        style={{ borderRadius: '50%' }}
                        src={color?.cover_image?.original}
                        height={30}
                        width={30}
                      />
                    )}
                  </>
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
