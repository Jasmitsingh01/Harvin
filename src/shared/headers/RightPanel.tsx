'use client';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useAddToCartLoading,
  useCartCount,
} from '../../stores/cart/cart-store';
import {
  loginModalOpen,
  logoutUser,
  setModalType,
} from '../../stores/user/user-action';
import dynamic from 'next/dynamic';
import Dropdown from 'react-bootstrap/Dropdown';
import { isUserLoggedIn } from '../../utilities/helper';
import { useLoading, userDetail } from '../../stores/user/user-store';
import { getAllWishList } from '../../stores/wishlist/wishlist-action';
import { HeaderLogout } from './styled';
import { useRouter } from 'next/router';
import { getCartItems } from '../../stores/cart/cart-action';
import { useAllWishlistCount } from '../../stores/wishlist/wishlist-store';
const CartElement = dynamic(() => import('./CartElement'), { ssr: false });
const WishListElement = dynamic(() => import('./WishListElement'), {
  ssr: false,
});
const RightPanel = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const cartCount = useCartCount();
  const loading = useAddToCartLoading();
  const count = useAllWishlistCount();
  const { loading: wishlistLoading } = useLoading();

  useEffect(() => {
    getCartItems();
  }, [loading]);

  useEffect(() => {
    isUserLoggedIn() && getAllWishList();
  }, [wishlistLoading]);

  //   const [tab, setTab] = useState(false);
  const handleLoginOpen = () => {
    setModalType('login');
    loginModalOpen(true);
  };
  const { result } = userDetail();
  //   const handleShowTab = () => {
  //     setTab(!tab);
  //   };
  const showWishlistCount = isUserLoggedIn() ? count : 0;
  const myAccounts = () => {
    router.push('/my-accounts');
  };
  return (
    <div className="header-right-item d-flex order-2 order-md-3 ms-auto">
      {!isUserLoggedIn() ? (
        <p
          className="header-right myaccount-icon"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={handleLoginOpen}
        >
          <i className="fa-regular fa-circle-user"></i>
          <span>
            {t('signUp')}
            <>/</>
            {t('login')}
          </span>
        </p>
      ) : (
        <HeaderLogout className="mb-0">
          <Dropdown>
            <Dropdown.Toggle className="header-right after-none myaccount-icon">
              <i className="fa-regular fa-circle-user"></i>
              <span>
                {result?.first_name} {result?.last_name}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="py-0 mt-1" style={{ zIndex: 11111 }}>
              <Dropdown.Item
                href=""
                onClick={myAccounts}
                className="py-2 text-15"
              >
                My Accounts
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-1"
                // onClick={logoutUser}
                onClick={() => logoutUser(router)}
                className="py-2 text-15"
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </HeaderLogout>
      )}
      <WishListElement wishlistCount={showWishlistCount} />
      <CartElement cartCount={cartCount} />
    </div>
  );
};

export default RightPanel;
