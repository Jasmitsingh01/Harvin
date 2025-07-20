import React from 'react';
import ProgressiveImage from '../../../shared/progressive-image';
// import banner1 from '../../../assets/images/offer-banner-first.png';
// import banner2 from '../../../assets/images/offer-banner-second.png';
import { OfferSectionStyled } from './styled';
import { bannerRouting } from '../../../utilities/helper';
const OfferSection = ({ data }: any) => {
  const handleBannerRouting = (elem: any) => {
    bannerRouting(elem);
  };

  console.log(data, 'sdhkjhdfs');
  return (
    <OfferSectionStyled className="offer-banner">
      <div className="container">
        <div className="row">
          {data?.map((elem: any) => {
            return (
              <div
                className="col-md-6"
                key={elem?.title}
                onClick={() => handleBannerRouting(elem)}
                style={{ cursor: elem?.link_url ? 'pointer' : 'default' }}
              >
                <div className="offer-banner-item position-relative">
                  <ProgressiveImage
                    src={elem?.banner?.url}
                    alt=""
                    className="w-100"
                  />
                  <div className="offer-banner-info">
                    <h4 className="text-24 weight-600">{elem?.title}</h4>
                    <p>{elem?.display_text}</p>
                    <a href="#" className="btn offer-btn">
                      Shop now
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </OfferSectionStyled>
  );
};

export default OfferSection;
