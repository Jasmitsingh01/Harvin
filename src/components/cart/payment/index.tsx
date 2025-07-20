/* eslint-disable no-undef */
import React, { useCallback, useState } from 'react';
// import { PaymentStyled } from './style'
import cartimg from '../../../assets/images/card-icon.png';
import ProgressiveImage from '../../../shared/progressive-image';
import cardoption from '../../../assets/images/card-options.jpg';
// import PrizeSummry from '../../../shared/cart/PrizeSummry';
import Sidebar from '../cart/Sidebar';
import { loginModalOpen } from '../../../stores/user/user-action';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import couponImg from '../../../assets/images/apply-coupon-img.png';
import PriceSummery from '../cart/PriceSummery';
import {
  useCartStore,
  useCartPincodeBasedPrice,
} from '../../../stores/cart/cart-store';
// import { Button } from 'react-bootstrap';
// import { useOrderData } from '../../../stores/orders/order-store';
import { orderPayment, postOrder } from '../../../stores/orders/order-action';
import { useRouter } from 'next/router';
// import { getCartItems } from '../../../stores/cart/cart-action';
import useRazorpay from 'react-razorpay';
import { RazorPayMethodEnum } from '../../../enums';
import { currentUser } from '../../../utilities/helper';
import { useCoupon } from '../../../stores/coupon/coupon-store';
import { toast } from 'react-toastify';

const PaymentBlock = () => {
  const [Razorpay] = useRazorpay();
  const [activeAccordion, setActiveAccordion] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState(RazorPayMethodEnum.card);
  const [showCouponList, setShowCouponList] = useState<boolean>(false);
  const { t } = useTranslation();
  const { coupon } = useCoupon();
  const router = useRouter();

  // const { placedItems } = useOrderData();

  // const { cartItems } = useCartStore();

  const { cartItems, selectedProduct, selectedAddress } = useCartStore();
  const { pincodeBasedPrices } = useCartPincodeBasedPrice();

  const handleCouponList = () => {
    if (localStorage.token) {
      setShowCouponList(!showCouponList);
    } else {
      loginModalOpen(true);
    }
  };
  const handleAccordionClick = (tab: any) => {
    setActiveAccordion(activeAccordion === tab ? null : tab);
    setPaymentMethod(tab);
  };

  const handleRediect = (url) => {
    router.push(`/thankyou?p=${url}`);
  };

  const handlePayment = useCallback(
    (data: any, encodeUrl: any) => {
      const { payment_id, amount, currency } =
        data?.payment_intent?.payment_intent_info || {};
      const user = currentUser();

      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
        amount: data.paid_total || amount,
        currency: currency,
        name: t('appName'),
        description: t('appDesciption'),
        image:
          'https://harvin-app-8eef8ed6fa4d.herokuapp.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fharvin-chairs-logo.96345865.png&w=1920&q=75',
        order_id: payment_id,
        handler: (response) => {
          orderPayment(response, data);
          handleRediect(encodeUrl);
        },
        prefill: {
          name: data.customer_name,
          email: user.email,
          contact: user.phone,
          method: paymentMethod,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
        // modal: {
        //   ondismiss: function () {},
        // },
        ondismiss: function () {
          // Display a toast notification to the user
          toast.error('Payment cancelled by user');
          // You can also trigger any necessary cleanup or actions here
        },
      };
      const rzpay = new Razorpay(options);

      rzpay.open();
      rzpay.on('payment.failed', function (response) {
        orderPayment(response, data);
      });
    },
    [Razorpay, paymentMethod]
  );

  const handleProceedToPayment = () => {
    let dataToPost;

    const subtotalSum = cartItems?.reduce((sum, item) => {
      const itemPrice = pincodeBasedPrices[item.id] || item.unit_price;
      return sum + itemPrice * item.quantity;
    }, 0);

    if (router.pathname.includes('cart')) {
      dataToPost = {
        products: cartItems?.map((item: any) => ({
          order_quantity: item?.quantity,
          product_id: item?.id,
          unit_price: pincodeBasedPrices[item.id] || item?.unit_price,
          product_attribute_id: item?.product_attribute_id,
          subtotal:
            (pincodeBasedPrices[item.id] || item.unit_price) * item?.quantity,
        })),
        status: 1,
        amount: subtotalSum,
        paid_total: subtotalSum,
        total: 1239,
        customer_contact: selectedAddress?.mobile_number,
        payment_gateway: 'RAZORPAY',
        billing_address: selectedAddress?.id,
        shipping_address: selectedAddress?.id,
        cart_id: cartItems[0]?.cart_id,
        coupon_id: coupon?.coupon_id,
      };
    } else {
      dataToPost = {
        products: [
          {
            order_quantity: selectedProduct?.selectQuantity
              ? selectedProduct?.selectQuantity
              : selectedProduct?.minimum_quantity || 1,
            product_id: selectedProduct?.product_id,
            product_attribute_id:
              selectedProduct?.combinations[0]?.product_attribute_id,
            unit_price:
              pincodeBasedPrices['selectedProduct'] ||
              (selectedProduct?.discounted_price !== null
                ? selectedProduct?.discounted_price.discounted_price
                : selectedProduct.price),
            subtotal:
              (pincodeBasedPrices['selectedProduct'] ||
                (selectedProduct?.discounted_price !== null
                  ? selectedProduct?.discounted_price.discounted_price
                  : selectedProduct.price)) *
              (selectedProduct?.selectQuantity
                ? selectedProduct?.selectQuantity
                : selectedProduct?.minimum_quantity || 1),
          },
        ],
        status: 1,
        amount:
          pincodeBasedPrices['selectedProduct'] ||
          (selectedProduct?.discounted_price !== null
            ? selectedProduct?.discounted_price.discounted_price
            : selectedProduct.price),
        paid_total:
          pincodeBasedPrices['selectedProduct'] ||
          (selectedProduct?.discounted_price !== null
            ? selectedProduct?.discounted_price.discounted_price
            : selectedProduct.price),
        total:
          pincodeBasedPrices['selectedProduct'] ||
          (selectedProduct?.discounted_price !== null
            ? selectedProduct?.discounted_price.discounted_price
            : selectedProduct.price),
        customer_contact: selectedAddress?.mobile_number,
        payment_gateway: 'RAZORPAY',
        billing_address: selectedAddress?.id,
        shipping_address: selectedAddress?.id,
        cart_id: null,
        coupon_id: coupon?.coupon_id,
      };
    }

    // handlePayment(dataToPost);
    postOrder(dataToPost, handlePayment);
  };
  return (
    <section className="cart-payment-wrap">
      {showCouponList && (
        <div
          onClick={() => setShowCouponList(false)}
          className={`offcanvas-backdrop fade show`}
        ></div>
      )}
      <div className="row">
        <div className="col-lg-7 cart-payment-left">
          <div className="payment-method-wrap">
            <div className="cart-heading">
              <h2 className="text-26 weight-600">Payment Methods</h2>
            </div>
            <div className="payment-method">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      onClick={() =>
                        handleAccordionClick(RazorPayMethodEnum.card)
                      }
                      className={`accordion-button ${
                        activeAccordion === RazorPayMethodEnum.card
                          ? ''
                          : 'collapsed'
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#card-option"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <div className="payment-name-option-wrap">
                        <div className="payment-name">
                          <input
                            type="radio"
                            checked={paymentMethod === RazorPayMethodEnum.card}
                          />
                          <ProgressiveImage src={cartimg} alt="" />
                          <h5>Card</h5>
                        </div>
                        <div className="payment-option-icon">
                          <ProgressiveImage src={cardoption} alt="" />
                        </div>
                      </div>
                    </button>
                  </h2>
                  {/* <Card activeAccordion={activeAccordion} cartcsv={cartcsv} /> */}
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      onClick={() =>
                        handleAccordionClick(RazorPayMethodEnum.netbanking)
                      }
                      className={`accordion-button ${
                        activeAccordion === RazorPayMethodEnum.netbanking
                          ? ''
                          : 'collapsed'
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#netbanking-option"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <div className="payment-name-option-wrap">
                        <div className="payment-name">
                          <input
                            type="radio"
                            checked={
                              paymentMethod === RazorPayMethodEnum.netbanking
                            }
                          />
                          <img src="assets/images/card-icon.png" alt="" />
                          <h5>Netbanking</h5>
                        </div>
                        <div className="payment-option-icon">
                          <img
                            src="assets/images/netbanking-options.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                    </button>
                  </h2>
                  {/* <NetBanking activeAccordion={activeAccordion} /> */}
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      onClick={() =>
                        handleAccordionClick(RazorPayMethodEnum.upi)
                      }
                      className={`accordion-button ${
                        activeAccordion === RazorPayMethodEnum.upi
                          ? ''
                          : 'collapsed'
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#upi-option"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <div className="payment-name-option-wrap">
                        <div className="payment-name">
                          <input
                            type="radio"
                            checked={paymentMethod === RazorPayMethodEnum.upi}
                          />
                          <img src="assets/images/upi-icon.png" alt="" />
                          <h5>UPI</h5>
                        </div>
                        <div className="payment-option-icon">
                          <img src="assets/images/upi-qr-options.jpg" alt="" />
                        </div>
                      </div>
                    </button>
                  </h2>
                  {/* <div
                    id="upi-option"
                    className={`accordion-collapse  ${
                      activeAccordion === 'UPI' ? '' : 'collapse'
                    }`}
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div className="upi-open">
                        <div className="qr-scan-wrap">
                          <div className="qr-code-img">
                            <img src="assets/images/qr-code.jpg" alt="" />
                          </div>
                          <div className="qr-code-detail">
                            <p className="qr-code-text mb-0">
                              Scan the QR using any UPI app on your phone.
                            </p>
                            <div className="upi-paymeny-icon">
                              <img src="assets/images/gpay-logo.png" alt="" />
                              <img
                                src="assets/images/phonepay-logo.png"
                                alt=""
                              />
                              <img src="assets/images/paytm-logo.png" alt="" />
                              <img src="assets/images/upi-logo.png" alt="" />
                            </div>
                            <p className="qr-code-time mb-0">
                              QR Code is Valid for{' '}
                              <span className="text-theme">11:50</span> minutes
                            </p>
                          </div>
                        </div>
                        <h3 className="text-18 weight-500 payment-open-heading">
                          Pay With UPI ID or Mobile Number
                        </h3>
                        <div className="upi-id-num-wrap">
                          <div className="upi-id-num">
                            <img src="assets/images/upi-icon.png" alt="" />
                            <h5 className="weight-400 mb-0">
                              UPI ID or Mobile Number
                            </h5>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            name=""
                            id=""
                            placeholder="Enter UPI ID or Mobile Number"
                          />
                        </div>
                        <button className="btn btn-theme pay-now-btn">
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      onClick={() =>
                        handleAccordionClick(RazorPayMethodEnum.wallet)
                      }
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#wallet-option"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <div className="payment-name-option-wrap">
                        <div className="payment-name">
                          <input
                            type="radio"
                            checked={
                              paymentMethod === RazorPayMethodEnum.wallet
                            }
                          />
                          <img src="assets/images/wallet-icon.png" alt="" />
                          <h5>Wallet</h5>
                        </div>
                        <div className="payment-option-icon">
                          <img src="assets/images/wallet-options.jpg" alt="" />
                        </div>
                      </div>
                    </button>
                  </h2>
                  {/* <div
                    id="wallet-option"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div className="wallet-open">
                        <div className="upi-pay-option-wrap">
                          <div className="upi-pay-option">
                            <input type="radio" />
                            <div className="upi-pay-name">
                              <img
                                src="assets/images/phonepay-logo.png"
                                alt=""
                              />
                              <h5 className="text-18 weight-400 mb-0">
                                PhonePe
                              </h5>
                            </div>
                          </div>
                          <div className="upi-pay-option">
                            <input type="radio" />
                            <div className="upi-pay-name">
                              <img src="assets/images/paytm-logo.png" alt="" />
                              <h5 className="text-18 weight-400 mb-0">Paytm</h5>
                            </div>
                          </div>
                          <div className="upi-pay-option">
                            <input type="radio" />
                            <div className="upi-pay-name">
                              <img
                                src="assets/images/amazon-pay-icon.png"
                                alt=""
                              />
                              <h5 className="text-18 weight-400 mb-0">
                                Amazon Pay
                              </h5>
                            </div>
                          </div>
                          <div className="upi-pay-option">
                            <input type="radio" />
                            <div className="upi-pay-name">
                              <img src="assets/images/mobikwik.png" alt="" />
                              <h5 className="text-18 weight-400 mb-0">
                                Mobikwik
                              </h5>
                            </div>
                          </div>
                          <div className="upi-pay-option">
                            <input type="radio" />
                            <div className="upi-pay-name">
                              <img
                                src="assets/images/freecharge-icon.png"
                                alt=""
                              />
                              <h5 className="text-18 weight-400 mb-0">
                                Freecharge
                              </h5>
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-theme pay-now-btn">
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#emi-option"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                      onClick={() =>
                        handleAccordionClick(RazorPayMethodEnum.emi)
                      }
                    >
                      <div className="payment-name-option-wrap">
                        <div className="payment-name">
                          <input
                            type="radio"
                            checked={paymentMethod === RazorPayMethodEnum.emi}
                          />
                          <img src="assets/images/emi-icon.png" alt="" />
                          <h5>EMI</h5>
                        </div>
                        <div className="payment-option-icon">
                          <img src="assets/images/emi-options.jpg" alt="" />
                        </div>
                      </div>
                    </button>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5 cart-payment-right">
          <div className="apply-coupon-wrap pb-3">
            <button
              className="btn side-menu-btn apply-coupon-btn "
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#apply-coupon"
              aria-controls="offcanvasRight"
              onClick={handleCouponList}
            >
              <Image src={couponImg} alt="" /> {t('applyCoupon')}
            </button>
            <Sidebar
              showCouponList={showCouponList}
              setShowCouponList={setShowCouponList}
              cartItems={cartItems}
              selectedProduct={selectedProduct}
            />
          </div>
          <div className="total-amount-wrap">
            <PriceSummery
              cartItems={cartItems}
              selectedProduct={selectedProduct}
              t={t}
              text={'priceSummary'}
              showGST={true}
            />
            {/* <PrizeSummry /> */}

            <button
              // disabled={loading}
              onClick={handleProceedToPayment}
              className="btn btn-theme proceed-btn"
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentBlock;
