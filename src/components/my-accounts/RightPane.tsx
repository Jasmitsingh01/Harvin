import React, { useMemo } from 'react';
import MenuItems from './constant';
import Dashlet from './Dashlet';
import EditProfile from './edit-profile';
import MyOrders from './my-orders';
import Wishlist from './wishlists';
import MyAddress from './my-address';
// import AddressBlock from '../cart/address';

const RightPane = ({ activeTab }: any) => {
  const renderView = useMemo(() => {
    switch (MenuItems[activeTab].name) {
      case 'overview':
        return <Dashlet />;
      case 'editProfile':
        return <EditProfile />;
      case 'myOrders':
        return <MyOrders />;
      case 'wishlist':
        return <Wishlist />;
      case 'myAddress':
        return <MyAddress />;
      case 'help':
        return null;
      default:
        return null;
    }
  }, [activeTab]);

  return renderView;
};

export default RightPane;
