import React from 'react';
// import { CartHeaderStyle } from './styled';
import { CartHeaderTabItem } from '../../../interface/common';
import { useTranslation } from 'react-i18next';
import { updateTab } from '../../../stores/cart/cart-action';
import { useCartStore, useMeData } from '../../../stores/cart/cart-store';
import { loginModalOpen } from '../../../stores/user/user-action';
import { isUserLoggedIn } from '../../../utilities/helper';
import { isEmpty } from 'lodash';

const CheckoutHeader: React.FC<any> = () => {
  const { t } = useTranslation();
  const { tab } = useCartStore();
  const { meData } = useMeData();
  const tabItems: CartHeaderTabItem[] = isUserLoggedIn()
    ? [
        { id: 'address', label: `1. ${t('Address')}` },
        { id: 'payment', label: `2. ${t('payment')}` },
      ]
    : [
        { id: 'login', label: `1. ${t('Login')}` },
        { id: 'address', label: `2. ${t('Address')}` },
        { id: 'payment', label: `3. ${t('payment')}` },
      ];

  // const handleTabClickInternal = (tab: string, index: number, event) => {
  //   event.preventDefault();
  //   if (!isUserLoggedIn() && index !== 1) {
  //     loginModalOpen(true);
  //     updateTab(1);
  //   } else {
  //     updateTab(index);
  //   }
  // };

  const handleTabClickInternal = (
    tab: string,
    index: number,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!isUserLoggedIn() && index !== 1) {
      loginModalOpen(true);
      updateTab(1);
    } else {
      // updateTab(index);
      if (isUserLoggedIn() && index === 1 && isEmpty(meData?.address)) {
        return;
      } else {
        updateTab(index);
      }
    }
  };
  return (
    <div className="breadcrumb-wrap">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {tabItems.map((tabItem: CartHeaderTabItem, index: number) => (
              <li
                key={tabItem.id}
                className={`breadcrumb-item curser ${
                  index + 1 <= tab || index === 0 ? 'active' : ''
                }`}
                // onClick={(event) =>
                //   handleTabClickInternal(tabItem.label, index + 1, event)
                // }
                onClick={(event) =>
                  tabItem.id === 'payment'
                    ? null
                    : handleTabClickInternal(tabItem.label, index + 1, event)
                }
              >
                {tabItem.label}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default CheckoutHeader;
