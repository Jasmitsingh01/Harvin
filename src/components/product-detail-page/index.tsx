import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import BottomProductList from '../product-detail-page/BottomProductList';
import BreadCrumbs from '../../shared/breadcrumbs';
import { ProductDetail } from './styled';
import Prices from './Prices';
import PinCode from './PinCode';
import AddToCartAndBuy from './Buttons';
import { useTranslation } from 'react-i18next';
import { addToCart, buyNow } from '../../stores/cart/cart-action';
import {
  getProductCombination,
  getRatingAndReviews,
  getValidateProductDetail,
} from '../../stores/product-detail/product-action';
import CombinationList from './CombinationList';
import {
  useProductDetailValidate,
  useSelectedProductCombination,
  usePincodeBasedPrice,
} from '../../stores/product-detail/product-store';
import QuantityButton from './quantity-button';
import { useRouter } from 'next/router';
import { isEmpty, map } from 'lodash';
import ProductRating from './ProductRating';
import MESSAGES from '../../constants';
import { addToWishList } from '../../stores/wishlist/wishlist-action';
import { useWishListProductIds } from '../../stores/wishlist/wishlist-store';
import { isUserLoggedIn, priceWithCurrency } from '../../utilities/helper';
import { loginModalOpen, setModalType } from '../../stores/user/user-action';

import { addLastViewedItem } from '../../stores/last-viewed/last-action';
import { CouponRemoveData } from '../../stores/coupon/coupon-action';
import Offers from './Offers';
// import { useLastViewedItmes } from '../../stores/last-viewed/last-store';

const ToggelSideBarNav = dynamic(() => import('./sidebar-dropdown'), {
  ssr: false,
});

const LeftSideImageGallery = dynamic(
  () => import('../product-detail-page/LeftSideImageGallery'),
  { ssr: false }
);
const ShareProduct = dynamic(() => import('./ShareProduct'), { ssr: false });

const ProductDetailPage = (props: any) => {
  const { result, productCombination, selectedCombination } = props;

  const [isInWishlist, setIsInWishlist] = useState(false);

  const { t } = useTranslation();

  // console.log(result, 'sdbdsjb');

  // const { lastViewedItems } = useLastViewedItmes();

  const router = useRouter();
  const selectedProductCombination = useSelectedProductCombination();
  const selectedProduct = selectedProductCombination || result;
  const { selectQuantity = 1 } = selectedProduct || {};
  const { pincodeBasedPrice, isPincodePriceAvailable } = usePincodeBasedPrice();
  const {
    productDetailError,
    pincodeError,
    pincodeSuccess,
    validateDetailLoading,
    codeCheckLoading,
  } = useProductDetailValidate();
  // -------------------------------------------useEffects---------------------------------------------
  useEffect(() => {
    getProductCombination(result, selectedCombination, productCombination);
    getRatingAndReviews(result);
  }, [result]);

  useEffect(() => {
    addLastViewedItem(result);
  }, [result]);

  const wishlistProductIds = useWishListProductIds();
  useEffect(() => {
    !isEmpty(selectedProduct) && getValidateProductDetail(selectedProduct);
  }, [selectedProduct?.id]);

  const { attribute_combinations = [] } = selectedProduct || {};
  const combinationValues = map(attribute_combinations, 'attribute_value_id');
  const combinationError = useMemo(() => {
    return isEmpty(combinationValues) && MESSAGES.CombinationError;
  }, [combinationValues]);

  const wishlistIcon = useMemo(() => {
    const isActive =
      !isEmpty(wishlistProductIds) &&
      wishlistProductIds?.find(
        (elem) =>
          elem?.product_attribute_id === selectedProductCombination?.id &&
          elem?.product_id === selectedProductCombination?.product_id
      );
    const iconClassName = `fa-sharp fa-heart ${isActive ? 'fa' : 'fa-regular'}`;
    const iconStyle = isActive ? { color: '#fb551d' } : {};
    setIsInWishlist(isActive);
    return <i className={iconClassName} style={iconStyle}></i>;
  }, [selectedProductCombination?.id, wishlistProductIds.length]);

  const wishlistText = useMemo(() => {
    return (
      <span style={{ color: isInWishlist ? '#fb551d' : '' }}>
        {isInWishlist ? 'Wishlisted' : 'Add to wishlist'}
      </span>
    );
  }, [isInWishlist, selectedProductCombination?.id]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const setWishlistIntoLogin = (product_id, product_attribute_id) => {
    localStorage.setItem(
      'wishlistAttr',
      JSON.stringify({ product_id, product_attribute_id })
    );
    setModalType('login');
    loginModalOpen(true);
  };
  const success = useMemo(() => {
    return pincodeSuccess;
  }, [pincodeSuccess]);

  const error = useMemo(() => {
    return productDetailError || combinationError || pincodeError;
  }, [productDetailError, combinationError, pincodeError]);

  const selectedProductData = {
    ...selectedProduct,
    assembly_charges: result.assembly_charges,
    default_category: result.default_category,
    image: result.gallery[0]?.original,
    gallery: result.gallery,
    slug: result.slug,
    // product_url:result.product_url
  };

  // console.log(result, 'helloooooo');
  // const {reference_code} = result;
  const removeCouponAndBuyNow = async () => {
    // Remove coupon data from local storage
    await CouponRemoveData();

    // Buy now logic
    await buyNow(selectedProductData, router);
  };

  return (
    <>
      <ShareProduct
        handleClose={handleClose}
        show={show}
        product={result}
        result={result}
      />
      <BreadCrumbs discardBreadCrumbs={['Product']} />
      <ProductDetail className="product-detail-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <LeftSideImageGallery
                images={selectedProduct?.images || result?.gallery}
                video={result?.video_link}
                cover_image={result?.cover_image}
              />
            </div>

            <div className="col-md-6">
              <div className="product-detail-right">
                <h3 className="product-name text-26 weight-600">
                  {result?.name}
                </h3>
                {/* {!combinationError && ( */}
                <div className="product-rating-review-wrap d-flex align-items-center">
                  <ProductRating result={result} />
                  <button
                    onClick={() =>
                      isUserLoggedIn()
                        ? addToWishList(
                            result.id,
                            selectedProductCombination.id
                          )
                        : setWishlistIntoLogin(result.id, selectedProduct.id)
                    }
                    className="product-wishlist-share buttonAsDiv d-flex align-items-center"
                  >
                    {wishlistIcon}
                    <span className="wishlist-text text-14 weight-500 ml-2 ">
                      {wishlistText}
                    </span>
                  </button>
                  <div
                    className="product-wishlist-share d-flex align-items-center"
                    onClick={handleShow}
                  >
                    <i className="fa-sharp fa-light fa-share-nodes"></i>
                    <span className="share-text text-14 weight-500">
                      Share this Product
                    </span>
                  </div>
                </div>
                {/* )} */}
                {!combinationError && (
                  <Prices selectedProduct={selectedProduct} result={result} />
                )}
                <div>
                  <CombinationList
                    selectedProduct={selectedProduct}
                    result={result}
                  />
                </div>
                <PinCode product_id={result?.id} loading={codeCheckLoading} />
                {error && <p className="product-error">{error}</p>}
                {success && <p className="product-success">{success}</p>}

                <div className="quantity-price d-flex justify-content-between align-items-center">
                  <div className="quantity-wrap d-flex align-items-center">
                    <span className="text-16 weight-600">{t('quantity')}</span>
                    <QuantityButton error={error} />
                  </div>
                  <div className="price d-flex align-items-center">
                    <h4 className="mb-0 text-16 weight-600">
                      {t('totalPrice')}:
                    </h4>

                    <span className="price-num text-24 weight-600">
                      {(() => {
                        const effectivePrice =
                          isPincodePriceAvailable && pincodeBasedPrice
                            ? pincodeBasedPrice
                            : selectedProduct?.discounted_price
                                ?.discounted_price || selectedProduct?.price;

                        return (
                          <>
                            {priceWithCurrency(effectivePrice * selectQuantity)}
                            {isPincodePriceAvailable && pincodeBasedPrice && (
                              <span
                                style={{
                                  fontSize: '12px',
                                  color: '#28a745',
                                  marginLeft: '8px',
                                  fontWeight: '500',
                                }}
                              >
                                • Local
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </span>
                  </div>
                </div>
                <AddToCartAndBuy
                  error={error}
                  loading={validateDetailLoading}
                  handleCart={() => addToCart(selectedProductData)}
                  // handleBuy={() => buyNow(selectedProductData, router)}
                  handleBuy={removeCouponAndBuyNow}
                />

                {/* Offers Section */}
                <Offers
                  productPrice={
                    selectedProduct?.discounted_price?.discounted_price ||
                    selectedProduct?.price ||
                    0
                  }
                  productId={result?.id?.toString() || ''}
                />

                <ToggelSideBarNav />
              </div>
            </div>
          </div>
        </div>
      </ProductDetail>
      <BottomProductList />
      {/* <RecenteltViewed /> */}
    </>
  );
};

export default ProductDetailPage;
