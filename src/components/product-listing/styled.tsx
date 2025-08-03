import styled from 'styled-components';

export const PaginationStyled = styled.div`
  /* .pagination-wrap { 
  padding: 50px 0 60px 0;
   } */

  /* .pagination {
    justify-content: center;
    gap: 18px;
    margin: 0;
  }

  .pagination .page-item .page-link {
    padding: 7px 14px;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    border-radius: 6px;
    border: 1px solid #f1f1f1;
    background: #fff;
    transition: all 0.2s;
  }

  .pagination .page-item .page-link:hover {
    background-color: #cccc;
    border: 1px solid #cccc;
  }

  .pagination .page-item .page-link:focus {
    box-shadow: none;
  }

  .pagination .page-item.active .page-link {
    color: #fff;
    background-color: #fc6e3d;
    border: 0;
  }

  .pagination .page-item .page-link.dots {
    border: 0;
  }

  .pagination .page-item .page-link.dots:hover {
    background-color: transparent;
    border: 0;
    color: #333;
  } */
`;

export const ProductListingStyled = styled.section`
  /* Show More Button styles */
  .show-more-section {
    padding: 40px 0 20px 0;
    text-align: center;

    .show-more-btn {
      padding: 12px 30px;
      font-size: 16px;
      font-weight: 500;
      border: 2px solid #fb551d;
      color: #fb551d;
      background: white;
      border-radius: 6px;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover:not(:disabled) {
        background: #fb551d;
        color: white;
        border-color: #fb551d;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .show-more-info {
      margin: 15px 0 0 0;
      font-size: 14px;
      color: #666;
      font-weight: 400;
    }
  }

  .loading-more-container {
    padding: 20px 0;

    .product-listing-wrap {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px 0;
    }
  }

  .end-of-results {
    padding: 20px 0;
    text-align: center;

    p {
      margin: 0;
      padding: 20px 0;
      color: #666;
      font-style: italic;
    }
  }

  /* .product-listing-section{ */
  /* padding: 20px 0 20px 0; */
  /* } */
  /* .product-listing-wrap {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px 0;
    margin-top: 10px;
  }

  .product-item {
    position: relative;
    cursor: pointer;
    

    &:hover {
      .product-img img {
        transform: scale(1);
      }

      .add-to-cart-btn-wrap {
        visibility: visible;
        opacity: 1;
        bottom: 14px;
      }

      .wishlist-btn {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .product-img {
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    min-height: 228px;

    img {
      width: 100%;
      height: auto;
      transition: transform 0.4s ease;
    }
  }

  .add-to-cart-btn-wrap {
    width: 100%;
    position: absolute;
    text-align: center;
    bottom: 0;
    transition: all 0.4s ease;
    visibility: hidden;
    opacity: 0;

    .add-to-cart-btn {
      font-size: 15px;
      font-weight: 500;
      padding: 12px 22px;
      display: inline-block;
      color: white;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 100px;
    }
  }

  .wishlist-btn {
    width: 35px;
    height: 35px;
    background-color: #fffc;
    position: absolute;
    top: 12px;
    right: 12px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    visibility: hidden;
    opacity: 0;

    i {
      color: #333333;
      font-size: 15px;
    }
  }

  .product-detail {
    padding: 10px;

    .product-name {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .product-price-wrap {
      display: flex;
      align-items: baseline;
      margin-top: 8px;

      .new-price {
        font-size: 18px;
       
        color: black; 
        margin-right: 10px;
      }

      .old-price {
        font-size: 14px;
        

        color: #999;
        text-decoration: line-through;
      }

      .discount {
        font-size: 14px;
        color: #388e3c;
        font-weight: 600;

        margin-left: 10px;
      }
    }

    .rating-wrap {
      display: flex;
      align-items: center;
      margin-top: 8px;
      font-size: 11px;

      &.rating-star {
        color: black; 
        margin-right: 4px;
      }

      .rating-num {
        font-size: 14px;
        color: #666;
        margin-left: 6px;
      }
    }

    .product-color-wrap {
      display: flex;
      align-items: center;
      margin-top: 8px;

      .product-color {
        span {
          width: 20px;
          
          height: 20px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 9px;
          cursor: pointer;
        }
        &.active {
          border-bottom: 1px solid #333;
        }
      }
    }
  } */
`;

export default ProductListingStyled;
