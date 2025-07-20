import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const MyAddressSkeleton = () => {
  const numberOfSkeletons = 4;
  const cardStyle = { marginTop: '20px', marginBottom: '20px' };

  return (
    <div>
      {[...Array(numberOfSkeletons)].map((_, index) => (
        <div key={index} style={cardStyle}>
          <div style={{ display: 'flex' }}>
            <Skeleton width={80} height={24} style={{ marginRight: '8px' }} />
            <Skeleton variant="text" width={80} />
          </div>
          <div className="my-address-detail-wrap d-lg-flex">
            <div className="my-address-detail">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>
            <div className="my-address-detail">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAddressSkeleton;
