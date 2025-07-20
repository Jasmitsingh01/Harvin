import React from 'react';
import { Skeleton, Typography } from '@mui/material';

const NoDataAvailable = () => {
  return (
    <div className="mt-5">
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '250px',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
        }}
      >
        <Typography
          variant="h6"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            color: 'gray',
            transform: 'translate(-50%, -50%)',
            // fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          No Data Available
        </Typography>
      </div>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default NoDataAvailable;
