import React, { useEffect, useState } from 'react';
import img1 from '../../../assets/images/thank-you-cart.png';
import Image from 'next/image';
// import { useOrderData } from '../../stores/orders/order-store';

import { useRouter } from 'next/router';
import LZString from 'lz-string';
import api from '../../../services/api';
import ROUTES from '../../../utilities/api-routes';
import { priceWithCurrency } from '../../../utilities/helper';
import Loading from '../../../shared/Loading';
import { CouponRemoveData } from '../../../stores/coupon/coupon-action';

const ThankYouPage = () => {
  // const { placedItems } = useOrderData();

  const router = useRouter();

  const urlId: any = router.query.p;
  const compressedData = urlId ? decodeURIComponent(urlId) : '';
  const productId = compressedData
    ? LZString.decompressFromEncodedURIComponent(compressedData)
    : '';
  // const { id } = router.query;
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    CouponRemoveData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/home');
    }
    const fetchOrderDetails = async () => {
      if (productId) {
        try {
          const response = await api.get(ROUTES.getOrderDetails(productId));
          console.log;
          setOrderDetails(response.data);
        } catch (error) {
          return error;
        }
      }
    };

    if (productId) {
      // Check if productId is defined before fetching order details
      fetchOrderDetails();
    }
  }, [productId]);

  const continueShopping = () => {
    router.push('/home');
  };

  const trackOrder = () => {
    router.push(`${orderDetails?.shipping_tracking_url}`);
  };

  return (
    <>
      {orderDetails ? (
        <main className="thank-you-page">
          <section className="thank-you-section">
            <div className="container">
              <div className="thank-you-wrap text-center">
                <div className="thank-you-cart-img">
                  <Image src={img1} alt="thankyou" />
                </div>
                <h2 className="weight-800">
                  Thank you for placing an order with us!
                </h2>
                <p className="text-18">
                  We&apos;re delighted to share that your order has been
                  successfully placed. For further details about your order,
                  please review the information below. Your order will be
                  processed within 24 hours. We will notify you once your oder
                  has been shipped.
                </p>
              </div>
            </div>
          </section>
          <section className="thank-you-product-prize-detail">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="order-detail-wrap">
                    <h4 className="cart-summary-text text-20 weight-500">
                      Order Details ({orderDetails.products.length} items)
                    </h4>
                    <div className="order-detail-item-listing-wrap">
                      {orderDetails.products.map((product) => (
                        <div
                          className="order-detail-item-listing"
                          key={product.id}
                        >
                          <div className="order-detail-item">
                            <div className="order-detail-img">
                              <img src={product?.image} alt={product.name} />
                            </div>
                            <div className="order-detail-info">
                              <h4 className="text-16 weight-500">
                                {product.name}
                              </h4>
                              <p>{product?.pivot?.all_combination}</p>
                              <p>Quantity: {product?.pivot?.order_quantity}</p>
                            </div>
                          </div>
                          <div className="order-amount-wrap">
                            <h4 className="order-amount text-16 weight-500 mb-0">
                              {priceWithCurrency(product?.pivot?.subtotal)}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="cart-summary-wrap">
                    <h4 className="cart-summary-text text-20 weight-500">
                      Prize Summary
                    </h4>
                    <ul>
                      <li>
                        <span className="weight-500">MRP</span>
                        <span className="amount weight-500">
                          {' '}
                          {priceWithCurrency(orderDetails?.total)}
                        </span>
                      </li>
                      <li>
                        <span className="weight-500">Discount</span>
                        <span className="discount weight-500">
                          -{' '}
                          {priceWithCurrency(
                            orderDetails.product_discount !== null
                              ? orderDetails.product_discount
                              : 0
                          )}
                        </span>
                      </li>
                      {orderDetails.coupon_id !== null && (
                        <li>
                          <span className="weight-500">
                            Coupon ({orderDetails?.coupon?.code})
                          </span>
                          <span className="discount weight-500">
                            {' '}
                            -{' '}
                            {priceWithCurrency(
                              orderDetails.coupon_id !== null
                                ? orderDetails.discount
                                : 0
                            )}
                          </span>
                        </li>
                      )}
                      <li>
                        <span className="weight-500">Assembly Charges</span>
                        <span className="amount weight-500">
                          {priceWithCurrency(
                            orderDetails.assembly_charges !== null
                              ? orderDetails.assembly_charges
                              : 0
                          )}
                        </span>
                      </li>

                      {orderDetails.total_cgst > 0 && (
                        <li>
                          <span className="weight-500">CGST</span>
                          <span className="amount weight-500">
                            {priceWithCurrency(
                              orderDetails.total_cgst !== null
                                ? orderDetails.total_cgst
                                : 0
                            )}{' '}
                            (
                            {orderDetails.average_cgst_rate !== null
                              ? `${orderDetails.average_cgst_rate}%`
                              : null}
                            )
                          </span>
                        </li>
                      )}
                      {orderDetails.total_sgst > 0 && (
                        <li>
                          <span className="weight-500">SGST</span>
                          <span className="amount weight-500">
                            {priceWithCurrency(
                              orderDetails.total_sgst !== null
                                ? orderDetails.total_sgst
                                : 0
                            )}{' '}
                            (
                            {orderDetails.average_sgst_rate !== null
                              ? `${orderDetails.average_sgst_rate}%`
                              : null}
                            )
                          </span>
                        </li>
                      )}
                    </ul>
                    <div className="pay-amount-wrap">
                      <h3 className="pay-text text-24 weight-600 ">
                        Order Total{' '}
                      </h3>
                      <h3 className="pay-amount-num text-24 weight-600 ">
                        {priceWithCurrency(
                          orderDetails.paid_total !== null
                            ? orderDetails.paid_total
                            : 0
                        )}
                      </h3>
                    </div>
                    <p className="tax-line">Inclusive Of All Taxes</p>
                    <p className="save-amount-text weight-500">
                      Congratulation! You just saved{' '}
                      {priceWithCurrency(
                        orderDetails.product_discount !== null
                          ? orderDetails.product_discount
                          : 0
                      )}{' '}
                      on your order.
                    </p>
                  </div>
                </div>
                <div className="thank-you-page-btn">
                  {orderDetails?.shipping_tracking_url !== null && (
                    <button
                      className="btn btn-theme track-btn"
                      onClick={trackOrder}
                    >
                      <i className="fa-solid fa-location-crosshairs me-2"></i>
                      Track Order
                    </button>
                  )}
                  <button
                    className="btn btn-theme continue-shopping-btn"
                    onClick={continueShopping}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <div className="container">
          <p>
            <Loading />
          </p>
        </div>
      )}
    </>
  );
};

export default ThankYouPage;
