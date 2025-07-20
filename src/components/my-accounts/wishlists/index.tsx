import React from 'react';
import useSWR from 'swr';
import { fetcherSWR } from '../../../services/api';
import ROUTES from '../../../utilities/api-routes';
import {
  newWishlistPrice,
  oldWishlistPrice,
  parseUrlParams,
} from '../../../utilities/helper';
import { useRouter } from 'next/router';

import {
  getAllWishList,
  removeFromWishList,
  setLoading,
  updateWishlistCount,
} from '../../../stores/wishlist/wishlist-action';
import { isEmpty } from 'lodash';
import Loading from '../../../shared/Loading';
import { addToCart } from '../../../stores/cart/cart-action';
import { useLoading } from '../../../stores/wishlist/wishlist-store';
import AccountPagination from '../pagination';
import { useAddToCartLoading } from '../../../stores/cart/cart-store';
import ProgressiveImage from '../../../shared/progressive-image';
// import NoDataAvailable from '../../../shared/common/NoDataAvailable';

const Wishlist = () => {
  const router = useRouter();
  const swrConfig = {
    revalidateIfStale: true,
    refreshInterval: 0,
    revalidateOnFocus: false,
  };
  const addToCartLoading = useAddToCartLoading();
  const loader = useLoading();
  const queryParams: any = parseUrlParams(router.asPath);
  const {
    isLoading,
    data: result,
    mutate,
    error,
  } = useSWR(ROUTES.getWishList(), fetcherSWR, swrConfig);

  const { data = [] } = result || {};
  const handlePageChange = (pageNumber: number | string) => {
    const updatedUrl = `/my-accounts#/wishlist?page=${pageNumber}`;
    const apiUrl = ROUTES.getWishList(pageNumber);
    mutate(apiUrl, false);
    window.history.replaceState({}, '', updatedUrl);
  };
  const handleCallback = () => {
    updateWishlistCount();
  };
  const handleDelete = async (id: number | string) => {
    await removeFromWishList(id, handleCallback);
    await mutate();
    await setLoading(false);
  };
  const loading = isEmpty(result) && !error;
  if (loading || loader || isLoading) {
    return <Loading />;
  }
  if (isEmpty(data) && !loader) {
    return (
      <section className="no-result-section">
        <div className="container">
          <div className="no-result text-center">
            <p className="text-20 weight-500">
              Your Wishlist section is empty!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="right-side-wrap wishlist-left">
        <h3 className="my-account-title text-24 weight-600 mb-0">
          Wishlist ({data?.length || 0})
        </h3>

        {loader && <Loading innerDiv={true} />}
        {data.length === 0 ? (
          <p>No Wishlist Data Available.</p>
        ) : (
          data.map((item, index) => {
            const { product, product_image = [] } = item;
            const discountedPrice = item?.combination_details?.discounted_price;
            const { price, discount, reductionType, prefix } =
              oldWishlistPrice(item);
            return (
              <>
                <div className="wishlist-listing d-flex justify-content-between align-items-center">
                  <div
                    key={index}
                    className="wishlist-item d-flex align-items-center"
                    style={{ paddingTop: 13 }}
                  >
                    <div
                      className="wishlist-img"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        router.push(`/product/${product?.id}-${product?.slug}`)
                      }
                    >
                      <ProgressiveImage
                        src={product_image[0]?.original}
                        alt=""
                        layout="intrisinic"
                        width={99}
                        height={102}
                      />
                    </div>
                    <div className="wishlist-info">
                      <h3
                        className="text-18 weight-600"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          router.push(
                            `/product/${product?.id}-${product?.slug}`
                          )
                        }
                      >
                        {product?.name}
                      </h3>
                      <div className="product-price-wrap d-flex align-items-center">
                        <span className="new-price">
                          {newWishlistPrice(item)}
                        </span>
                        {discountedPrice && (
                          <span className="old-price">{price}</span>
                        )}
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
                  </div>
                  <div className="wishlist-button d-flex">
                    <button
                      disabled={addToCartLoading}
                      className="btn btn-theme move-to-cart-btn"
                      onClick={() => {
                        setLoading(true);
                        const combination =
                          (item?.product?.product_combinations &&
                            item?.product?.product_combinations[0]) ||
                          {};
                        const obj = {
                          ...item.product,
                          product_id: item.product_id,
                          product_attribute_id: combination?.id,
                          quantity: combination.quantity,
                          price: combination.price,
                        };

                        addToCart(obj);
                        handleDelete(item.id);
                        getAllWishList();
                        setLoading(false);
                        // window.location.href='/cart'
                      }}
                    >
                      <i className="fa-light fa-cart-shopping fa-flip-horizontal"></i>
                      Move to Cart
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="fa-regular fa-trash-can text-18"></i>
                    </button>
                  </div>
                </div>
              </>
            );
          })
        )}

        <AccountPagination
          currentPage={parseInt(queryParams.page) || 1} // Ensure currentPage is a number
          itemsPerPage={20}
          listLength={data?.length}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Wishlist;
