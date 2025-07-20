import React from 'react';
import { useTranslation } from 'react-i18next';
// import Button from '../../../../shared/common/Button';
import DeleteModal from './DeleteModal';

const AddressCard = ({ address }: any) => {
  const { t } = useTranslation();
  return (
    <div className="my-address-detail-wrap d-lg-flex">
      {/* bootstrap modal  */}

      <DeleteModal />
      <div className="my-address-detail">
        <p>{address?.society + ','}</p>
        <p>{address?.area + ','}</p>
        <p>{address?.landmark + ','}</p>
        <p>
          {address?.city} - {address?.postal_code}
        </p>
        <p>{address?.state}</p>
      </div>
      <div className="my-address-detail">
        {address?.mobile_number && (
          <p>
            {t('phone')}: {address?.mobile_number}
          </p>
        )}

        {address?.alternate_mobile_number && (
          <p>
            {t('alternateMobileNumber')}: {address?.alternate_mobile_number}
          </p>
        )}
        {address?.email && (
          <p>
            {t('email')}: {address?.email}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
