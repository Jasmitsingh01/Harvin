'use client';
// import { useRouter } from 'next/router';
import * as React from 'react';
// import img from '../../assets/images/product-img-1.png';
import ProgressiveImage from '../progressive-image';
import { useRouter } from 'next/router';
import { ProductDetailWrapper } from './product.styled';
import Rating from '../rating/Rating';
import CardPrices from './CardPrices';
const CardView = ({ product, key, compact = false }: any) => {
  const router = useRouter();
  const [index, setIndex] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);

  const handleMouseEnter = () => {
    if (product?.gallery.length > 1) {
      setIndex(1);
    } else {
      setIsZoomed(true);
    }
  };

  const handleMouseLeave = () => {
    setIndex(0);
    setIsZoomed(false);
  };

  return (
    <ProductDetailWrapper
      className={`w-100 ${compact ? 'compact-card' : ''}`}
      key={key}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/product/${product?.id}-${product?.slug}`);
      }}
    >
      <div className="product-item">
        <div
          className="product-img"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ProgressiveImage
            src={product?.gallery[index]?.original}
            alt=""
            style={{ transform: isZoomed ? 'scale(1.1)' : 'scale(1)' }}
            key={key}
          />
        </div>
        <div className="product-detail">
          <h3 className={`product-name ${compact ? 'compact-name' : ''}`}>
            {compact
              ? product?.name?.substring(0, 50) +
                (product?.name?.length > 50 ? '...' : '')
              : product?.name}
          </h3>
          <CardPrices prices={product?.product_combination_short[0]} />
          {!compact && (
            <div className="rating-wrap d-flex align-items-center">
              <Rating
                rating={product?.ratings}
                ratingcount={product?.rating_count}
                reviews={product?.reviews}
                totalReview={product?.total_reviews}
                className={'rating-star d-flex align-items-center'}
                detail={false}
              />
            </div>
          )}
        </div>
      </div>
    </ProductDetailWrapper>
  );
};

export default CardView;
