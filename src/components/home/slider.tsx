import React from 'react';
import CardView from '../../shared/cards';
import Slick from 'react-slick';

const Slider = ({ products }: any) => {
  const settings = {
    focusOnSelect: true,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    infinite: products?.length > 4 ? true : false,
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

  return (
    <div className="product-listing position-relative">
      <Slick {...settings}>
        {products &&
          products?.length &&
          products?.map((product: any, index: number) => {
            return <CardView product={product} key={index} />;
          })}
      </Slick>
    </div>
  );
};

export default Slider;
