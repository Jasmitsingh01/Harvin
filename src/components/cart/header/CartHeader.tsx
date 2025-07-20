// import React from 'react';
// // import { CartHeaderStyle } from './styled';
// import { CartHeaderTabItem } from '../../../interface/common';
// import { useTranslation } from 'react-i18next';
// import { updateTab } from '../../../stores/cart/cart-action';
// import { useCartStore, useMeData } from '../../../stores/cart/cart-store';
// // import { loginModalOpen } from '../../../stores/user/user-action';
// import { isUserLoggedIn } from '../../../utilities/helper';
// import { isEmpty } from 'lodash';
// const CartHeader: React.FC<any> = () => {
//   const { t } = useTranslation();
//   const { tab } = useCartStore();
//   const { meData } = useMeData();
//   const tabItems: CartHeaderTabItem[] = isUserLoggedIn()
//     ? [
//         { id: 'cart', label: `1. ${t('cart')}` },
//         { id: 'address', label: `2. ${t('Address')}` },
//         { id: 'payment', label: `3. ${t('payment')}` },
//       ]
//     : [
//         { id: 'cart', label: `1. ${t('cart')}` },
//         { id: 'login', label: `2. ${t('Login')}` },
//         { id: 'address', label: `3. ${t('Address')}` },
//         { id: 'payment', label: `4. ${t('payment')}` },
//       ];

//   const handleTabClickInternal = (
//     tab: string,
//     index: number,
//     event: React.MouseEvent<HTMLLIElement, MouseEvent>
//   ) => {
//     event.preventDefault();
//     if (!localStorage.token) {
//       if (index === 0 || index === 1) {
//         updateTab(index);
//       }
//     } else {
//       if (isUserLoggedIn() && index === 2 && isEmpty(meData?.address)) {
//         return;
//       } else {
//         updateTab(index);
//       }
//     }
//   };

//   return (
//     <div className="breadcrumb-wrap">
//       <div className="container">
//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb">
//             {tabItems.map((tabItem: CartHeaderTabItem, index: number) => (
//               <li
//                 key={tabItem.id}
//                 className={`breadcrumb-item curser ${
//                   index <= tab ? 'active' : ''
//                 }`}
//                 onClick={(event) =>
//                   handleTabClickInternal(tabItem.label, index, event)
//                 }
//               >
//                 {tabItem.label}
//               </li>
//             ))}
//           </ol>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default CartHeader;

import React from 'react';
import { CartHeaderTabItem } from '../../../interface/common';
import { useTranslation } from 'react-i18next';
import { updateTab } from '../../../stores/cart/cart-action';
import { useCartStore, useMeData } from '../../../stores/cart/cart-store';
import { isUserLoggedIn } from '../../../utilities/helper';
import { isEmpty } from 'lodash';

const CartHeader: React.FC<any> = () => {
  const { t } = useTranslation();
  const { tab } = useCartStore();
  const { meData } = useMeData();

  const tabItems: CartHeaderTabItem[] = isUserLoggedIn()
    ? [
        { id: 'cart', label: `1. ${t('cart')}` },
        { id: 'address', label: `2. ${t('Address')}` },
        { id: 'payment', label: `3. ${t('payment')}` },
      ]
    : [
        { id: 'cart', label: `1. ${t('cart')}` },
        { id: 'login', label: `2. ${t('Login')}` },
        { id: 'address', label: `3. ${t('Address')}` },
        { id: 'payment', label: `4. ${t('payment')}` },
      ];

  const handleTabClickInternal = (
    tab: string,
    index: number,
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.preventDefault();
    const clickedTabItem = tabItems[index];
    if (
      clickedTabItem.id === 'payment' ||
      clickedTabItem.label.includes('payment')
    ) {
      return; // do nothing if the payment tab should be disabled
    }

    if (!localStorage.token) {
      if (index === 0 || index === 1) {
        updateTab(index);
      }
    } else {
      if (isUserLoggedIn() && index === 2 && isEmpty(meData?.address)) {
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
                className={`breadcrumb-item cursor ${
                  index <= tab ? 'active' : ''
                }`}
                onClick={(event) =>
                  handleTabClickInternal(tabItem.label, index, event)
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

export default CartHeader;
