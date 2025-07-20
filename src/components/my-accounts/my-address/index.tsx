import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import AddressList from '../../cart/address/address-list';
import { useCartStore, useMeData } from '../../../stores/cart/cart-store';
import { getUserDetailFromMe } from '../../../stores/cart/cart-action';
import ModalForm from './ModalForm';
import { useAddressLoading } from '../../../stores/user/user-store';
import Loading from '../../../shared/Loading';

const MyAddress = () => {
  // const { t } = useTranslation();
  const { deleteAddressLoading } = useCartStore();
  const { addressLoading } = useAddressLoading();
  const { meData, meLoading } = useMeData();
  const [editAddress, setEditAddress] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getUserDetailFromMe();
  }, [deleteAddressLoading, meLoading, addressLoading]);

  const handleEditMode = (address) => {
    setEditAddress(address);
  };

  if (meLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      {openModal && <div className="offcanvas-backdrop show"></div>}
      <div className="delivery-address-wrap">
        {/* {addressListView ? }  */}
        {openModal && (
          <ModalForm
            initilvalues={editAddress}
            openModal={openModal}
            setOpenModal={setOpenModal}
            loading={addressLoading}
          />
        )}
        <AddressList
          address={meData?.address}
          meLoading={meLoading}
          handleCallBack={handleEditMode}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setEditAddress={setEditAddress}
        />
      </div>
    </div>
  );
};

export default MyAddress;
