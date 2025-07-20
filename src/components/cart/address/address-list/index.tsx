// import React, { useEffect } from 'react';
// import _, { isEmpty } from 'lodash';
// import AddressCard from './AddressCard';
// import {
//   addressListViewFlag,
//   setDeleteId,
//   setSelectedAddress,
//   updateAddressAction,
// } from '../../../../stores/cart/cart-action';
// import { useTranslation } from 'react-i18next';
// import {
//   getAddressId,
//   useSelectedAddress,
// } from '../../../../stores/cart/cart-store';
// import MyAddressSkeleton from '../AddressSkeleton';
// import { useRouter } from 'next/router';
// import NoDataAvailable from '../../../../shared/common/NoDataAvailable';

// const AddressList = ({
//   address,
//   meLoading,
//   handleCallBack,
//   setOpenModal,
//   setEditAddress,
// }: any) => {
//   const { t } = useTranslation();
//   const { selectedAddress } = useSelectedAddress();
//   const { deleteAddressId, deleteAddressLoading } = getAddressId();
//   const router = useRouter();
//   const handleAddress = () => {
//     if (router.pathname === '/my-accounts') {
//       setOpenModal(true);
//       setEditAddress({});
//     } else {
//       updateAddressAction(null);
//       addressListViewFlag(false);
//     }
//   };

//   const handleGetAddress = async (elem) => {
//     await setSelectedAddress(elem);
//   };

//   const handleDelete = (elem) => {
//     setDeleteId(elem?.id);
//   };
//   const getSelected = () => {
//     return setSelectedAddress(address[address?.length - 1]);
//   };
//   useEffect(() => {
//     getSelected();
//   }, [deleteAddressLoading, isEmpty(selectedAddress), address?.length]);
//   const updateUserAddress = (elem: any) => {
//     if (router.pathname === '/my-accounts') {
//       setOpenModal(true);
//       handleCallBack(elem);
//     } else {
//       updateAddressAction(elem);
//       addressListViewFlag(false);
//     }
//   };

//   return (
//     <div>
//       {deleteAddressId && (
//         <div className={`offcanvas-backdrop fade show`}></div>
//       )}
//       <div className="address-title d-md-flex justify-content-between align-items-center">
//         <h3 className="my-account-title text-24 weight-600 mb-0">
//           {t('yourSavedAddress')}
//         </h3>
//         <button
//           className="btn btn-theme add-address-btn"
//           onClick={handleAddress}
//         >
//           + {t('addNewAddreee')}
//         </button>
//       </div>

//       {isEmpty(address) && !meLoading && <NoDataAvailable />}
//       {meLoading ? (
//         <MyAddressSkeleton />
//       ) : (

//         address &&
//         _.isArray(address) &&
//         address
//           .slice()
//           .reverse()
//           .map((elem, index) => {
//             return (
//               <div className="my-address-wrap" key={index}>
//                 <div className="my-address-name-title d-md-flex justify-content-between align-items-center">
//                   <div className="my-name-wrap d-flex align-items-center">
//                     {window.location.pathname === '/cart' && (
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         checked={elem.id === selectedAddress?.id}
//                         name="address"
//                         onChange={() => handleGetAddress(elem)}
//                       />
//                     )}

//                     <h4 className="text-20 weight-500 mb-0">
//                       {elem?.first_name} {elem?.last_name}
//                     </h4>
//                     <span>{elem?.address_name}</span>
//                   </div>
//                   <div className="address-edit-detele-btn d-flex align-items-center">
//                     <div className="edit-remove-btn-wrap d-flex align-items-center">
//                       <span
//                         onClick={() => updateUserAddress(elem)}
//                         className="edit-btn"
//                       >
//                         <i className="fa-light fa-pen-line"></i>Edit
//                       </span>
//                       <span
//                         onClick={() => handleDelete(elem)}
//                         className="remove-btn"
//                       >
//                         <i className="fa-light fa-trash-can"></i>Remove
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <AddressCard address={elem} />
//               </div>
//             );
//           })
//       )}
//     </div>
//   );
// };

// export default AddressList;

import React, { useEffect } from 'react';
import _, { isEmpty } from 'lodash';
import AddressCard from './AddressCard';
import {
  addressListViewFlag,
  setDeleteId,
  setSelectedAddress,
  updateAddressAction,
} from '../../../../stores/cart/cart-action';
import { useTranslation } from 'react-i18next';
import {
  getAddressId,
  useSelectedAddress,
} from '../../../../stores/cart/cart-store';
import MyAddressSkeleton from '../AddressSkeleton';
import { useRouter } from 'next/router';
// import NoDataAvailable from '../../../../shared/common/NoDataAvailable';

const AddressList = ({
  address,
  meLoading,
  handleCallBack,
  setOpenModal,
  setEditAddress,
}: any) => {
  const { t } = useTranslation();
  const { selectedAddress } = useSelectedAddress();
  const { deleteAddressId, deleteAddressLoading } = getAddressId();
  const router = useRouter();
  const handleAddress = () => {
    if (router.pathname === '/my-accounts') {
      setOpenModal(true);
      setEditAddress({});
    } else {
      updateAddressAction(null);
      addressListViewFlag(false);
    }
  };

  const handleGetAddress = async (elem) => {
    await setSelectedAddress(elem);
  };

  const handleDelete = (elem) => {
    setDeleteId(elem?.id);
  };
  // const getSelected = () => {
  //   return setSelectedAddress(address[address?.length - 1]);
  // };

  const getSelected = () => {
    console.log('Address:', address);
    console.log('Address Length:', address?.length);
    if (address && address.length > 0) {
      return setSelectedAddress(address[address.length - 1]);
    }
  };
  useEffect(() => {
    getSelected();
  }, [deleteAddressLoading, isEmpty(selectedAddress), address?.length]);
  const updateUserAddress = (elem: any) => {
    if (router.pathname === '/my-accounts') {
      setOpenModal(true);
      handleCallBack(elem);
    } else {
      updateAddressAction(elem);
      addressListViewFlag(false);
    }
  };

  return (
    <div>
      {deleteAddressId && (
        <div className={`offcanvas-backdrop fade show`}></div>
      )}
      <div className="address-title d-md-flex justify-content-between align-items-center">
        <h3 className="my-account-title text-24 weight-600 mb-0">
          {t('yourSavedAddress')}
        </h3>
        <button
          className="btn btn-theme add-address-btn"
          onClick={handleAddress}
        >
          + {t('addNewAddreee')}
        </button>
      </div>

      {/* {isEmpty(address) && !meLoading && <NoDataAvailable />} */}
      {meLoading ? (
        <MyAddressSkeleton />
      ) : address && _.isArray(address) && address.length > 0 ? (
        address
          .slice()
          .reverse()
          .map((elem, index) => {
            return (
              <div className="my-address-wrap" key={index}>
                <div className="my-address-name-title d-md-flex justify-content-between align-items-center">
                  <div className="my-name-wrap d-flex align-items-center">
                    {window.location.pathname === '/cart' && (
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={elem.id === selectedAddress?.id}
                        name="address"
                        onChange={() => handleGetAddress(elem)}
                      />
                    )}

                    {window.location.pathname.includes('/checkout') && (
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={elem.id === selectedAddress?.id}
                        name="address"
                        onChange={() => handleGetAddress(elem)}
                      />
                    )}

                    <h4 className="text-20 weight-500 mb-0">
                      {elem?.first_name} {elem?.last_name}
                    </h4>
                    <span>{elem?.address_name}</span>
                  </div>
                  <div className="address-edit-detele-btn d-flex align-items-center">
                    <div className="edit-remove-btn-wrap d-flex align-items-center">
                      <span
                        onClick={() => updateUserAddress(elem)}
                        className="edit-btn"
                      >
                        <i className="fa-light fa-pen-line"></i>Edit
                      </span>
                      <span
                        onClick={() => handleDelete(elem)}
                        className="remove-btn"
                      >
                        <i className="fa-light fa-trash-can"></i>Remove
                      </span>
                    </div>
                  </div>
                </div>
                <AddressCard address={elem} />
              </div>
            );
          })
      ) : (
        <section className="no-result-section">
          <div className="container">
            <div className="no-result text-center">
              <p className="text-20 weight-500">No Data Available</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AddressList;
