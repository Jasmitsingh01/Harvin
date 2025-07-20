import { useRouter } from 'next/router';
import React from 'react';
import MenuItems from './constant';
import { removeCartItmes } from '../../stores/cart/cart-action';

const LeftPane = ({ activeTab }: any) => {
  const router = useRouter();

  const logoutUser = (router) => {
    localStorage.clear();
    removeCartItmes();
    router.push('/home');
  };

  const handleClick = (url) => {
    router.push(url);
  };
  return (
    <div className="col-md-4 col-lg-3">
      <div className="my-account-side">
        <h3 className="text-20 weight-600">My Account</h3>
        <ul className="my-account-tab-list">
          {MenuItems.map((item, index) => (
            <li
              key={index}
              className={`my-account-tab-list-item ${
                activeTab === index ? 'active' : ''
              }`}
              onClick={() => handleClick(item.href)}
            >
              <div className="my-account-tab-name-wrap">
                <div className="my-account-icon">
                  <i className="fa-regular fa-grid-2"></i>
                </div>
                <h5>{item.title}</h5>
              </div>
            </li>
          ))}
          <li className="my-account-tab-list-item">
            <div className="my-account-tab-name-wrap">
              <div className="my-account-icon">
                <i className="fa-regular fa-arrow-right-from-bracket"></i>
              </div>
              <h5 onClick={() => logoutUser(router)}>Logout</h5>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftPane;
