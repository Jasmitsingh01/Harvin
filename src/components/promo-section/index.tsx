import React from 'react';
import ProgressiveImage from '../../shared/progressive-image';
import { PromoSectionStyled } from './styled';
import emiBanner from '../../assets/images/emi-banner.jpg';
import { bannerRouting } from '../../utilities/helper';
import { Skeleton } from '@mui/material';
// const PromoSection = ({ data, isLoading }: any) => {
//   const handleBannerRouting = (elem: any) => {
//     bannerRouting(elem);
//   };
//   return (
//     <PromoSectionStyled className="coupon">
//       <div className="container">
//         <div className="coupon-img">
//           {isLoading && <Skeleton width={'100%'} height={108} />}
//           {data?.map((elem: any, index: number) => {
//             return (
//               <div onClick={() => handleBannerRouting(elem)} key={index}>
//                 <ProgressiveImage
//                   key={index}
//                   src={elem?.banner?.url || emiBanner}
//                   alt=""
//                   className="w-100"
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </PromoSectionStyled>
//   );
// };
const PromoSection = ({ data, isLoading, index }: any) => {
  const handleBannerRouting = (elem: any) => {
    bannerRouting(elem);
  };

  // Use the specified index to get the advertisement banner data
  const advertisementBanner = data && data[index];

  console.log(advertisementBanner, 'advertisementBanner');

  return (
    <PromoSectionStyled className="coupon">
      <div className="container">
        <div className="coupon-img">
          {isLoading && <Skeleton width={'100%'} height={108} />}
          {advertisementBanner && (
            <div
              onClick={() => handleBannerRouting(advertisementBanner)}
              style={{
                cursor: advertisementBanner?.link_url ? 'pointer' : 'default',
              }}
            >
              <ProgressiveImage
                src={
                  advertisementBanner?.banner_image?.url ||
                  advertisementBanner?.banner?.url ||
                  emiBanner
                }
                alt=""
                className="w-100"
              />
            </div>
          )}
        </div>
      </div>
    </PromoSectionStyled>
  );
};

export default PromoSection;
