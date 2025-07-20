import React from 'react';
import { useRouter } from 'next/router';
const WishListElement = ({ wishlistCount }: any) => {
  const router = useRouter();
  return (
    <p
      className="header-right"
      onClick={() => router.push('/my-accounts#/wishlist')}
    >
      <i className="fa-sharp fa-regular fa-heart"></i>
      <span>({wishlistCount})</span>
    </p>
  );
};

export default WishListElement;
