import { useRouter } from 'next/router';
import React from 'react';

const Dashlet = () => {
  const router = useRouter();
  return (
    <div className="right-side-wrap overview-right">
      <div className="row overview-listing">
        <div className="col-6">
          <div
            className="overview-item"
            onClick={() => router.push('/my-accounts#/edit-profile')}
          >
            <div className="overview-icon">
              <i className="fa-regular fa-user-pen"></i>
            </div>
            <h4 className="text-16 weight-500">Edit Profile</h4>
            <p className="text-14">Change your profile details</p>
          </div>
        </div>
        <div className="col-6">
          <div
            className="overview-item"
            onClick={() => router.push('/my-accounts#/my-orders')}
          >
            <div className="overview-icon">
              <i className="fa-regular fa-file-invoice"></i>
            </div>
            <h4 className="text-16 weight-500">My Orders</h4>
            <p className="text-14">Check your order status</p>
          </div>
        </div>
        <div
          className="col-6 col-lg-4"
          onClick={() => router.push('/my-accounts#/my-address')}
        >
          <div className="overview-item">
            <div className="overview-icon">
              <i className="fa-regular fa-location-dot"></i>
            </div>
            <h4 className="text-16 weight-500">My Addresses</h4>
            <p className="text-14">Save addresses for a hassle free checkout</p>
          </div>
        </div>
        <div className="col-6 col-lg-4">
          <div
            className="overview-item"
            onClick={() => router.push('/my-accounts#/wishlist')}
          >
            <div className="overview-icon">
              <i className="fa-sharp fa-regular fa-heart"></i>
            </div>
            <h4 className="text-16 weight-500">Wishlist</h4>
            <p className="text-14">View all your liked products</p>
          </div>
        </div>
        <div className="col-6 col-lg-4">
          <div
            className="overview-item"
            onClick={() => router.push('/help-desk')}
          >
            <div className="overview-icon">
              <i className="fa-regular fa-circle-question"></i>
            </div>
            <h4 className="text-16 weight-500">Help Desk</h4>
            <p className="text-14">Help Desk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashlet;
