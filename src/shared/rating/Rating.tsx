import React from 'react';

const Rating = ({ className, rating, ratingcount, totalReview }: any) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const renderStars = () => {
    const stars = [];

    // Render full-colored stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa-solid fa-star colored"></i>);
    }
    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fa-solid fa-star-half light-gray"></i>
      );
    }
    const remainingStars = 5 - (fullStars + (hasHalfStar ? 1 : 0));
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>);
    }
    return stars;
  };

  return (
    <div className={className}>
      <div className="product-rating-star">{renderStars()}</div>

      {ratingcount ? (
        <span className="rating-review-text text-14 weight-500">
          | Reviews ({totalReview})
        </span>
      ) : (
        <span className="rating-num"></span>
      )}
    </div>
  );
};

export default Rating;
