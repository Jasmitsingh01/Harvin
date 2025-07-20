import React, { useEffect, useMemo } from 'react';
import { CartStyled } from './styled';
import CartHeader from './header/CartHeader';
import CartBlock from './cart';
import { useCartStore } from '../../stores/cart/cart-store';
import { isEmpty } from 'lodash';
// import { useRouter } from 'next/router';
import { getCartItems } from '../../stores/cart/cart-action';
import { useLoading, useUserStore } from '../../stores/user/user-store';
import { isUserLoggedIn } from '../../utilities/helper';
import dynamic from 'next/dynamic';
import ProgressiveImage from '../../shared/progressive-image';
import img from '../../assets/images/empty-cart-img.png';
const AddressBlock = dynamic(() => import('./address'), { ssr: false });
const LoginBlock = dynamic(() => import('./loginBlock'), { ssr: false });
const PaymentBlock = dynamic(() => import('./payment'), { ssr: false });

const CartPage = () => {
  const { tab, cartItems } = useCartStore();
  const { userDetail } = useUserStore();
  const { loading } = useLoading();
  //   const router = useRouter();
  useEffect(() => {
    !loading && getCartItems();
  }, [!isEmpty(userDetail), loading]);

  const tabsContainer = useMemo(() => {
    if (!isUserLoggedIn()) {
      return (
        <>
          {tab === 1 && <LoginBlock />}
          {tab === 2 && <AddressBlock />}
          {tab === 3 && <PaymentBlock />}
        </>
      );
    }

    return (
      <>
        {tab === 1 && <AddressBlock />}
        {tab === 2 && <PaymentBlock />}
      </>
    );
  }, [tab, isUserLoggedIn()]);

  return (
    <>
      <CartStyled className="cart-page">
        {!isEmpty(cartItems) ? (
          <div>
            <CartHeader />
            <div className="container">
              {tab === 0 && <CartBlock />}
              {tabsContainer}
            </div>
          </div>
        ) : (
          <div className="container">
            <section className="no-result-section">
              <div className="container">
                <div className="no-result text-center">
                  <ProgressiveImage
                    src={img}
                    alt=""
                    height={114}
                    width={129}
                    layout="intrisinic"
                  />
                  <h4 className="text-24 weight-600 mt-md-5">
                    Your Cart is Feeling Light!
                  </h4>
                  <p className="weight-500">
                    Looks like your cart is empty at the moment. Start adding
                    items to fill it up with fantastic finds!
                  </p>
                  <a href="/home" className="btn btn-theme">
                    Continue Shopping
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}
      </CartStyled>
    </>
  );
};

export default CartPage;
