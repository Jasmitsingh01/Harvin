import React, { useEffect, useMemo } from 'react';
import { CartStyled } from '../cart/styled';
// import CartHeader from '../cart/header/CartHeader';
import PaymentBlock from '../cart/payment';
import AddressBlock from '../cart/address';
// import CartBlock from '../cart/cart';
import { useCartStore } from '../../stores/cart/cart-store';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { getCartItems, updateTab } from '../../stores/cart/cart-action';
import { useLoading, useUserStore } from '../../stores/user/user-store';
import LoginBlock from '../cart/loginBlock';
import { isUserLoggedIn } from '../../utilities/helper';
// import { CheckoutHeaderStyle } from './header/styled';
import CheckoutHeader from './header/CheckoutHeader';
import LZString from 'lz-string';

const CheckoutPage = () => {
  const { tab, selectedProduct } = useCartStore();
  const { userDetail } = useUserStore();
  const { loading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    !loading && getCartItems();
  }, [!isEmpty(userDetail), loading]);

  const urlId: any = router.query.p;
  const compressedData = urlId ? decodeURIComponent(urlId) : '';
  const productId = compressedData
    ? LZString.decompressFromEncodedURIComponent(compressedData)
    : '';
  const showPageAsUsual =
    productId && productId === selectedProduct?.id?.toString();

  // createCartAddress(cartItems, selectedAddress);

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

  useEffect(() => {
    if (!loading) {
      getCartItems();

      if (isUserLoggedIn()) {
        updateTab(1);
      }
    }
  }, [!isEmpty(userDetail), loading]);

  return (
    <>
      <CartStyled className="cart-page">
        {!isEmpty(selectedProduct) && showPageAsUsual ? (
          <div>
            <CheckoutHeader />
            <div className="container">
              {tab === 0 && !isUserLoggedIn() && <LoginBlock />}
              {tabsContainer}
            </div>
          </div>
        ) : (
          <div onClick={() => router.push('/home')}>
            <p>&apos;Something went wrong. Please check your URL.&apos;</p>
          </div>
        )}
      </CartStyled>
    </>
  );
};

export default CheckoutPage;
