import React from 'react';
import { useTranslation } from 'react-i18next';
// import img from '../../../assets/images/order-detail-img.jpg';
// import ProgressiveImage from '../../../shared/progressive-image';
import { useCartItmes, useCartStore } from '../../../stores/cart/cart-store';
import { useRouter } from 'next/router';
import Image from 'next/image';
const OrderDetail = () => {
  const { t } = useTranslation();
  const { cartItems, loading } = useCartItmes();
  const { selectedProduct } = useCartStore();
  const router = useRouter();
  return (
    <div className="order-detail-wrap">
      {router.pathname.includes('/cart') ? (
        <>
          <h4 className="cart-summary-text text-20 weight-500">
            {t('orderDetails')} ({cartItems?.length} {t('items')})
          </h4>
          <div className="order-detail-item-listing">
            {!loading &&
              cartItems?.map((elem, index) => {
                const gallerySrc = elem?.gallery?.[0]?.original || elem?.image;
                return (
                  <div className="order-detail-item" key={index}>
                    <div className="order-detail-img">
                      <Image src={gallerySrc} alt="" height={100} width={100} />
                    </div>
                    <div className="order-detail-info">
                      <h4 className="text-16 weight-500">{elem?.name}</h4>
                      <p>{elem?.all_combination}</p>
                      <p>
                        {t('quantity')}: {elem?.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <>
          <div className="order-detail-wrap">
            <h4 className="cart-summary-text text-20 weight-500">
              {t('orderDetails')} (1 {t('items')})
            </h4>
            <div className="order-detail-item-listing">
              <div className="order-detail-item">
                <div className="order-detail-img">
                  {
                    <Image
                      src={selectedProduct?.image || selectedProduct?.images}
                      alt=""
                      height={100}
                      width={100}
                    />
                  }
                </div>
                <div className="order-detail-info">
                  <h4 className="text-16 weight-500">
                    {selectedProduct?.name}
                  </h4>
                  <p>{selectedProduct?.all_combination}</p>
                  <p>
                    {t('quantity')}:{' '}
                    {selectedProduct?.selectQuantity
                      ? selectedProduct?.selectQuantity
                      : selectedProduct?.minimum_quantity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
