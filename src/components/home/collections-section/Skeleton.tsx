import React from 'react';
import { Skeleton } from '@mui/material';
const CollectionSkeleton = () => (
  <div>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-6">
              <div style={{ borderRadius: '20%' }}>
                <Skeleton
                  variant="rectangular"
                  style={{ borderRadius: '13px' }}
                  width="100%"
                  height={200}
                />
              </div>
            </div>
            {[1, 2, 3].map((index) => (
              <div className={`col-6 ${index !== 1 && 'mt-4'}`} key={index}>
                <div className="collection-img">
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <div className="collection-name-wrap text-center"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          {[4].map((index) => (
            <div className={`collection-item mt-4 mt-md-0`} key={index}>
              <div className="collection-img">
                <Skeleton variant="rectangular" width="100%" height={430} />
                <div className="collection-name-wrap text-center"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default CollectionSkeleton;
