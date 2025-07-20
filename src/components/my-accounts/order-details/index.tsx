// import Image from 'next/image';
import React, { useState } from 'react';
import ROUTES from '../../../utilities/api-routes';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcherSWR } from '../../../services/api';
import { format } from 'date-fns';
import { priceWithCurrency } from '../../../utilities/helper';
import ProgressiveImage from '../../../shared/progressive-image';
import img from '../../../assets/images/order.png';
import Loading from '../../../shared/Loading';
import PageNotFound from '../../../shared/page-not-found';
import { isEmpty } from 'lodash';
import {
  downloadInvoice,
  orderCancel,
} from '../../../stores/orders/order-action';
import { useOrderData } from '../../../stores/orders/order-store';
// import Modal from 'react-modal';
import { Modal, Button } from 'react-bootstrap';
import CancelReasonModal from '../../../shared/CancelReasonModal';
import moment from 'moment';

const OrderDetails = () => {
  const router = useRouter();
  const { loading } = useOrderData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReasonModalOpen, setCancelReasonModalOpen] = useState(false);
  const [reason, setReason] = useState('');

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEnquireNowButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCancelOrder = () => {
    setCancelReasonModalOpen(true);
  };

  // const handleSubmitCancelReason = (reason) => {
  //   console.log('Cancellation reason:', reason);
  //   setCancelReasonModalOpen(false);
  //   setIsModalOpen(false);
  // };

  const { id } = router.query;
  const swrConfig = {
    revalidateIfStale: true,
    refreshInterval: 0,
    revalidateOnFocus: false,
  };

  const apiUrl = ROUTES.getOrderDetails(id);

  const {
    data: orderDetails,
    error,
    mutate,
  } = useSWR(apiUrl, fetcherSWR, swrConfig);
  if (!orderDetails) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  //   const handleSubmitCancelReason = (reason) => {
  //     setCancelReasonModalOpen(false);
  //  setIsModalOpen(false);
  //  orderCancel(router?.query?.id, reason);

  // };

  const handleSubmitCancelReason = async (reason) => {
    setCancelReasonModalOpen(false);
    setIsModalOpen(false);
    const success: any = await orderCancel(router?.query?.id, reason);
    if (success) {
      setReason('');
      mutate(apiUrl);
      // Trigger a re-fetch of data after cancelling the order
    }
  };

  console.log(orderDetails, 'orderDetails');
  if (error || !isEmpty(orderDetails.errors)) {
    return <PageNotFound />;
  }

  const formatDate = (dateString) => {
    return dateString && format(new Date(dateString), "do MMMM',' yyyy");
  };
  const handleDownloadInvoice = (id) => {
    const data = { order_id: id };
    downloadInvoice(data);
  };

  const handleTrackOrder = () => {
    if (orderDetails?.shipping_tracking_url) {
      window.open(orderDetails.shipping_tracking_url, '_blank');
    }
  };

  return (
    <div className="my-account-page">
      <main className="">
        <div className="container">
          <div className="back-to-btn-wrap d-flex align-items-center">
            <span className="text-18 weight-500" onClick={() => router.back()}>
              <i className="fa-regular fa-arrow-left-long"></i>Back to Orders
            </span>
          </div>
          <div className="my-account-wrap">
            <div className="row">
              <div className="col-md-4 col-lg-4 order-detail-left-wrap">
                <div className="order-detail-left">
                  <div className="order-num-wrap">
                    <h4 className="text-20 weight-600">
                      Order #{orderDetails?.tracking_number}
                    </h4>

                    <div className="order-payment-detail">
                      <p className="mb-0">
                        Order Placed on {formatDate(orderDetails?.created_at)}
                      </p>
                      <div className="d-flex align-items-center mt-3">
                        {/* <Image src="assets/images/gpay-logo.png" alt="" width={100} height={100}/> */}
                        <p className="mb-0">
                          Paid by {orderDetails?.payment_gateway}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="cart-summary-wrap">
                    <h4 className="cart-summary-text text-20 weight-500">
                      Order Payment Details
                    </h4>
                    <ul>
                      <li>
                        <span className="weight-500">MRP</span>
                        <span className="amount weight-500">
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
                  <div className="delivery-to-wrap">
                    <h4 className="cart-summary-text text-20 weight-500">
                      Delivered To
                    </h4>
                    <div className="delivery-to-detail">
                      <p>
                        {orderDetails?.customer_name}
                        <br />
                        {orderDetails?.order_shipping_address?.society},{' '}
                        {orderDetails?.order_shipping_address?.landmark}{' '}
                        {orderDetails?.order_shipping_address?.area}
                        <br />
                        {/* Wagle Estate, Thane (west)<br /> */}
                        {orderDetails?.order_shipping_address?.city} -{' '}
                        {orderDetails?.order_shipping_address?.postal_code}
                        <br />
                        {orderDetails?.order_shipping_address?.state}
                      </p>
                      <p className="mt-2">
                        Phone:{' '}
                        {orderDetails?.order_shipping_address?.mobile_number}
                      </p>
                      {orderDetails?.order_shipping_address
                        ?.alternate_mobile_number && (
                        <p className="mt-2">
                          Alternate Phone:{' '}
                          {
                            orderDetails?.order_shipping_address
                              ?.alternate_mobile_number
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-lg-8 order-detail-right-wrap">
                <div className="my-account-order-detail-right">
                  <div className="delivery-order-wrap">
                    <div className="delivery-order-title-wrap">
                      <div className="delivery-order-title d-flex">
                        <ProgressiveImage src={img} alt="order" />
                        <h3 className="text-20 weight-600 mb-0 margin-left-8 ms-3">
                          {orderDetails?.order_status}

                          {orderDetails?.order_status === 'Order Shipped' && (
                            <p
                              className="order-detail-info font-weight-normal text-16 mt-2"
                              style={{ color: '#7f7f7f' }}
                            >
                              Delivery Expected By{' '}
                              {moment(orderDetails?.expected_date).format(
                                'DD MMMM YYYY'
                              )}
                            </p>
                          )}
                        </h3>

                        <span className="">
                          {/* Shipment 4/4 -  */}(
                          {orderDetails?.products?.length} items)
                        </span>

                        {orderDetails?.can_cancel_order && (
                          <button
                            className="btn btn-theme-cancel ms-auto"
                            onClick={handleEnquireNowButtonClick}
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>

                      <div className="delivery-date-wrap">
                        {orderDetails?.order_status !== 'Order Pending' &&
                        orderDetails?.order_status !== 'Order Cancelled' &&
                        orderDetails?.order_status !== 'Order Failed' ? (
                          <span
                            onClick={
                              loading
                                ? null
                                : () => handleDownloadInvoice(orderDetails?.id)
                            }
                            className={`text-theme weight-500 cursor-pointer ${
                              loading ? 'Downloading' : ''
                            }`}
                          >
                            {loading ? (
                              'Downloading...'
                            ) : (
                              <>
                                <i className="fa-regular fa-arrow-down-to-bracket"></i>{' '}
                                Download Invoice
                              </>
                            )}
                          </span>
                        ) : null}

                        {orderDetails?.shipping_tracking_url && (
                          <span
                            onClick={handleTrackOrder}
                            className="text-theme weight-500"
                          >
                            <i className="fa-solid fa-location-crosshairs"></i>{' '}
                            Track Order
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="delivery-order-listing-wrap myaccount-order-detail">
                      {orderDetails?.products?.map((product, index) => (
                        <div className="order-detail-item-listing" key={index}>
                          <div className="order-detail-item">
                            <div className="order-detail-Image">
                              <ProgressiveImage
                                layout={'intrinsic'}
                                src={
                                  product?.pivot?.product_attribute_combination
                                    ?.images
                                    ? product.pivot
                                        .product_attribute_combination.images[0]
                                        ?.original
                                    : product?.image
                                }
                                // width={60}
                                style={{
                                  maxWidth: 'auto !important',
                                  height: '100%',

                                  width: '148.8px',
                                  //  height: '153.6px',
                                  borderRadius: '7.2px',
                                  justifyContent: 'space-between',
                                  //  maxWidth: 'auto', // Not using !important as it's not recommended unless necessary
                                }}
                                // height={60}
                                alt={product.name}
                              />
                            </div>
                            <div className="order-detail-info">
                              <h4 className="text-18 weight-500">
                                {product.name}
                              </h4>
                              <p>{product?.pivot?.all_combination}</p>
                              <p>Quantity: {product.pivot.order_quantity}</p>
                            </div>
                          </div>
                          <div className="order-amount-wrap">
                            <h4 className="order-amount text-18 weight-500 mb-0">
                              {priceWithCurrency(product.pivot.subtotal)}
                            </h4>
                          </div>
                        </div>
                      ))}
                      <Modal
                        show={isModalOpen}
                        onHide={handleModalToggle}
                        centered
                      >
                        <Modal.Body>
                          <div className="text-center">
                            <span className="icon bg-light-theme mt-5 mx-auto text-theme">
                              <i className="fa-light fa-trash-can fa-3x"></i>
                            </span>
                            <h3 className="text-24 weight-600 mt-4 pt-3">
                              Are you sure you want to cancel this order?
                            </h3>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            className="btn btn-theme cursor-pointer d-inline-block w-auto px-4 border-none"
                            onClick={() => {
                              handleCancelOrder();
                              handleModalToggle();
                            }}
                          >
                            Yes, Cancel My Order
                          </Button>
                          <Button
                            className="btn btn-theme-outline ms-2 px-4"
                            onClick={handleModalToggle}
                          >
                            Cancel
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      <CancelReasonModal
                        isOpen={cancelReasonModalOpen}
                        onClose={() => setCancelReasonModalOpen(false)}
                        onSubmit={handleSubmitCancelReason}
                        reason={reason}
                        setReason={setReason}
                      />
                    </div>
                  </div>

                  {/* <div className="delivery-order-wrap">
                    <div className="delivery-order-title-wrap">
                      <div className="delivery-order-title d-flex align-items-center">

                        <h3 className="text-20 weight-600 mb-0">In Transit</h3>
                        <span className="">Shipment 4/2 - 2 items</span>
                      </div>
                      <div className="delivery-date-wrap">
                        <span className="">
                          Delivery Expected by 03 - 05 October 2023
                        </span>
                        <a href="" className="text-theme weight-500">
                          <i className="fa-solid fa-location-crosshairs"></i>{' '}
                          Track Order
                        </a>
                      </div>
                    </div>
                    <div className="delivery-order-listing-wrap">
                      <div className="order-detail-item-listing">
                        <div className="order-detail-item">
                          <div className="order-detail-Image">

                          </div>
                          <div className="order-detail-info">
                            <h4 className="text-18 weight-500">
                              Ferguson Leather Sofa
                            </h4>
                            <p>Leather, Black, 3 seater</p>
                            <p>Assembly Charges: ₹ 600</p>
                            <p>Quantity: 1</p>
                          </div>
                        </div>
                        <div className="order-amount-wrap">
                          <h4 className="order-amount text-18 weight-500 mb-0">
                            ₹ 2,550
                          </h4>
                        </div>
                      </div>
                      <div className="order-detail-item-listing">
                        <div className="order-detail-item">
                          <div className="order-detail-Image">

                          </div>
                          <div className="order-detail-info">
                            <h4 className="text-18 weight-500">
                              SANDARED Pouffe
                            </h4>
                            <p>Crochet, Navy Blue</p>
                            <p>Quantity: 1</p>
                          </div>
                        </div>
                        <div className="order-amount-wrap">
                          <h4 className="order-amount text-18 weight-500 mb-0">
                            ₹ 3,550
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="delivery-order-wrap">
                    {/* <div className="delivery-order-title-wrap">
                      <div className="delivery-order-title d-flex align-items-center">

                        <h3 className="text-20 weight-600 mb-0">Processing</h3>
                        <span className="">Shipment 4/4 - 2 items</span>
                      </div>
                      <div className="delivery-date-wrap">
                        <span className="">
                          Delivery Expected by 08 - 09 October 2023
                        </span>
                      </div>
                    </div> */}
                    {/* <div className="delivery-order-listing-wrap">
                      <div className="order-detail-item-listing">
                        <div className="order-detail-item">
                          <div className="order-detail-Image">

                          </div>
                          <div className="order-detail-info">
                            <h4 className="text-18 weight-500">
                              Sheesham Wooden L-Shaped Sofa
                            </h4>
                            <p>Fabric, Maroon, Sheesham</p>
                            <p>Assembly Charges: ₹ 600</p>
                            <p>Quantity: 1</p>
                          </div>
                        </div>
                        <div className="order-amount-wrap">
                          <h4 className="order-amount text-18 weight-500 mb-0">
                            ₹ 12,550
                          </h4>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  {/* <div className="delivery-order-wrap">
                    <div className="delivery-order-title-wrap">
                      <div className="delivery-order-title d-flex align-items-center">

                        <h3 className="delivered-text text-20 weight-600 mb-0">
                          Delivered
                        </h3>
                        <span className="">Shipment 1/4 - 2 items</span>
                      </div>
                      <div className="delivery-date-wrap">
                        <span className="">
                          Delivery Expected by 28 October 2023
                        </span>
                        <a href="" className="text-theme weight-500">
                          <i className="fa-regular fa-arrow-down-to-bracket"></i>{' '}
                          Download Invoice
                        </a>
                      </div>
                    </div>
                    <div className="delivery-order-listing-wrap">
                      <div className="order-detail-item-listing">
                        <div className="order-detail-item">
                          <div className="order-detail-Image">

                          </div>
                          <div className="order-detail-info">
                            <h4 className="text-18 weight-500">
                              Ferguson Leather Sofa
                            </h4>
                            <p>Leather, Black, 3 seater</p>
                            <p>Assembly Charges: ₹ 600</p>
                            <p>Quantity: 1</p>
                          </div>
                        </div>
                        <div className="order-amount-wrap">
                          <h4 className="order-amount text-18 weight-500 mb-0">
                            ₹ 2,550
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetails;
