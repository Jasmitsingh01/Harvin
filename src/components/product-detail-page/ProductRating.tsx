import React from 'react';
import PropTypes from 'prop-types';
import { sideBarTabAction } from '../../stores/product-detail/product-action';

const ProductRating = ({ result }: any) => {
  const fullStars = Math.floor(result?.ratings);
  const hasHalfStar = result?.ratings % 1 !== 0;
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      let starClassName = 'fa-solid fa-star';
      if (i < fullStars) {
        starClassName += ' colored';
      } else if (i === fullStars && hasHalfStar) {
        starClassName = 'fa-solid fa-star colored';
      }
      stars.push(
        <i
          key={i}
          className={starClassName}
          style={{ color: i < fullStars ? '' : '#C7C7C7' }}
        ></i>
      );
    }
    return stars;
  };

  const handleOpenRatingTab = () => {
    sideBarTabAction('reviews-ratings');
  };

  return (
    <div className="product-rating d-flex align-items-center">
      <div onClick={handleOpenRatingTab} className="product-rating-star">
        {renderStars()}
      </div>
      <span className="rating-review-text text-14 weight-500">
        ({result.ratings} Ratings & {result?.total_reviews} reviews)
      </span>
    </div>
  );
};

ProductRating.propTypes = {
  result: PropTypes.shape({
    ratings: PropTypes.number,
    total_reviews: PropTypes.number,
  }),
};

export default ProductRating;
