import React from 'react';
import { useRouter } from 'next/router';
import { updateTab } from '../../stores/cart/cart-action';

const CartElement = ({ cartCount }: any) => {
  const router = useRouter();
  const handleCartRoute = () => {
    updateTab(0);
    router.push('/cart');
  };
  return (
    <p className="header-right" onClick={handleCartRoute}>
      <i className="fa-regular fa-cart-shopping"></i>
      <span>({cartCount})</span>
    </p>
  );
};

export default CartElement;
