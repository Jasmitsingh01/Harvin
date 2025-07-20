import styled from 'styled-components';

export const ProductDetailWrapper = styled.div`
  /* .product-item .product-img {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
  }
  .product-item .product-img img {
    transition: all 0.5s ease;
  }
  .product-item:hover .product-img img {
    transform: scale(1.1);
  }
  &.product-item .product-detail .product-name {
    font-size: 16px;
    font-weight: 500;
    margin: 14px 0 8px 0;
  }
  &.product-item .product-detail .new-price {
    font-size: 16px;
    font-weight: 500;
  }
  &.product-item .product-detail .old-price {
    font-size: 15px;
    font-weight: 500;
    color: #999999;
    margin: 0 6px 0 8px;
    text-decoration: line-through;
  }
  &.product-item .product-detail .discount {
    font-size: 15px;
    font-weight: 600;
    color: #4caf4f;
  }
  &.product-item .product-detail .rating-wrap {
    margin-top: 6px;
  }
  &.product-item .product-detail .rating-wrap i {
    font-size: 11px;
    margin-right: 4px;
    color: #1a1a1a;
  }
  &.product-item .product-detail .rating-wrap span {
    font-size: 14px;
  } */

  /* Compact card styles */
  &.compact-card {
    .product-item {
      .product-img {
        height: 180px;
        overflow: hidden;
        border-radius: 8px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .product-detail {
        padding: 12px 0;

        .compact-name {
          font-size: 14px !important;
          line-height: 1.3;
          margin: 8px 0 6px 0 !important;
          color: #1a1a1a;
          font-weight: 500;
        }

        .product-price-wrap {
          .new-price {
            font-size: 14px !important;
            font-weight: 600;
            color: #fb551d;
          }

          .old-price {
            font-size: 12px !important;
            margin: 0 4px 0 6px !important;
          }

          .discount {
            font-size: 12px !important;
            background: #e8f5e8;
            color: #4caf4f;
            padding: 2px 6px;
            border-radius: 4px;
          }
        }
      }
    }
  }
`;
