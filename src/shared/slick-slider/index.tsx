import React from 'react';
import Slick from 'react-slick';
import { SlickSliderStyled } from './styled';

const DefaultSettings = {
  focusOnSelect: true,
  arrows: false,
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  infinite: true,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SlickSlider = ({ children, className, options = {} }: any) => {
  const nextArrow = <div className="nextArrow"></div>;
  const prevArrow = <div className="prevArrow"></div>;

  const settings = { ...DefaultSettings, ...options, nextArrow, prevArrow };

  return (
    <SlickSliderStyled>
      <Slick className={className} {...settings}>
        {children}
      </Slick>
    </SlickSliderStyled>
  );
};

export default SlickSlider;
