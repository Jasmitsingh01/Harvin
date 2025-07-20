import styled from 'styled-components';

export const ProductDetail = styled.div`
  /* .breadcrumb-wrap nav {
    padding: 30px 0 20px 0;
  }
  .breadcrumb-wrap .breadcrumb {
    margin: 0;
  }
  .breadcrumb-wrap .breadcrumb .breadcrumb-item,
  .breadcrumb-wrap .breadcrumb .breadcrumb-item a {
    font-size: 14px;
    font-weight: 500;
    color: #999999;
  }
  .breadcrumb-wrap .breadcrumb .breadcrumb-item.active {
    color: #fb551d;
  } */
  /*.product-detail-img {
    border-radius: 10px;
    overflow: hidden;
  }
  .product-detail-img img {
    width: 100%;
  }
  .product-detail-section .product-multiple-img-wrap {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
    margin-top: 20px;
  }
  .product-detail-section .product-multiple-img-wrap .product-multiple-img {
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
  }
  .product-detail-section .product-multiple-img-wrap div.active {
    border: 2px solid #fb551d;
  }
  .product-detail-section .product-multiple-img-wrap .product-multiple-img img {
    width: 100%;
  }*/

  /* For Right Side Section */
  /*.product-detail-right {
    height: 900px;
    overflow-y: scroll;
  }
  .product-detail-right::-webkit-scrollbar {
    display: none;
  }
  .product-detail-right .product-rating .product-rating-star i {
    font-size: 15px;
    color: #fb551d;
  }
  .product-detail-right .product-rating span {
    margin-left: 8px;
  }
  .product-detail-right .product-wishlist-share {
    margin-left: 16px;
  }
  .product-detail-right .product-wishlist-share span {
    margin-left: 5px;
  }

  .product-prize-wrap {
    padding: 25px 0 25px 0;
    border-top: 2px dashed #cccc;
    margin-top: 25px;
  }
  .product-prize {
    display: flex;
    gap: 12px;
    align-items: end;
  }
  .product-prize .product-old-prize {
    color: #999999;
    text-decoration: line-through;
  }
  .product-prize .product-off {
    padding: 4px 5px 2px 5px;
    background-color: #fb551d;
    color: white;
    font-size: 15px;
    font-weight: 600;
    border-radius: 4px;
  }

  .discount-coupon-img {
    margin-top: 18px;
  }

  .fabric-storage-wrap {
    padding: 20px 0 25px 0;
    border-bottom: 2px dashed #cccc;
  }
  .fabric-storage-listing {
    display: flex;
    gap: 14px;
    margin-top: 18px;
    flex-wrap: wrap;
  }
  .fabric-item {
    border-radius: 3px;
    border: 1px solid #f2f2f2;
  }
  .fabric-item .fabric-name {
    display: block;
    text-align: center;
    font-size: 12px;
    color: #666666;
    padding: 9px 0 9px 0;
    border-top: 1px solid #f2f2f2;
  }
  .fabric-item.active {
    border: 1px solid #fc6e3d;
  }
  .fabric-item.active .fabric-name {
    border-top: 1px solid #fc6e3d;
    background: rgba(254, 207, 190, 0.08);
  }

  .storage-wrap .storage-listing {
    display: flex;
    gap: 14px;
    margin-top: 18px;
  }
  .storage-name {
    padding: 13px 12px;
    font-size: 12px;
    border: 1px solid #f2f2f2;
    border-radius: 3px;
    cursor: pointer;
  }
  .storage-name.active {
    border: 1px solid #fc6e3d;
    background: rgba(254, 207, 190, 0.08);
  }

  .pincode-input {
    display: flex;
    width: 300px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    margin-left: 18px;
    overflow: hidden;
  }
  .pincode-input input {
    padding: 16px 0 16px 20px;
    font-size: 16px;
    color: #999999;
    border: 0;
    outline: 0;
    width: calc(100% - 85px);
  }
  .pincode-input button {
    padding: 0 20px 0 20px;
    border: 0;
    background: transparent;
  }
  .product-detail-right .pincode-text {
    color: #666666;
    font-size: 14px;
    margin: 10px 0 30px 79px;
  }

  .quantity-price .quantity {
    display: flex;
    border: 1px solid #f2f2f2;
    overflow: hidden;
    border-radius: 5px;
    margin-left: 18px;
  }
  .quantity-price .quantity .quantity-num {
    width: 50px;
    text-align: center;
    font-size: 20px;
    border: 0;
    outline: 0;
    color: #333333;
  }
  .quantity-price .quantity button {
    padding: 0 15px;
    height: 51px;
    border: 0;
    background: transparent;
    color: #666666;
    font-size: 24px;
    border-radius: 0;
  }
  .quantity-price .quantity button:active {
    color: #666666;
    background-color: #e6e6e6;
  }
  .quantity-price .price h4 {
    color: #7f7f7f;
  }
  .quantity-price .price .price-num {
    color: #333333;
    margin-left: 12px;
  }

  .add-buy-btn-wrap {
    display: flex;
    justify-content: space-between;
    padding: 25px 0 25px 0;
    border-bottom: 2px dashed #cccc;
  }
  .add-buy-btn-wrap button {
    width: 281px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 16px;
    font-weight: 600;
  }
  .add-buy-btn-wrap button i {
    margin-right: 10px;
    color: white;
  }
  .add-buy-btn-wrap .add-to-cart-btn {
    background-color: #fc6e3d;
  }
  .add-buy-btn-wrap .add-to-cart-btn:hover {
    color: white;
    background-color: #fb551d;
  }
  .add-buy-btn-wrap .buy-now-btn {
    background-color: #333333;
  }
  .add-buy-btn-wrap .buy-now-btn:hover {
    color: white;
    background-color: #000;
  }

  .product-side-menu {
    padding: 26px 30px 26px 0;
    border-bottom: 2px dashed #cccc;
  }
  .product-side-menu .side-menu-btn {
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 0;
    background-color: white;
    border: 0;
    color: #333333;
    font-size: 20px;
    font-weight: 600;
  }
  .product-side-menu .side-menu-btn:focus {
    background-color: white;
    color: #333333;
  }
  .product-side-menu .side-menu-btn::after {
    content: '\f054';
    font-family: 'Font Awesome 6 Pro';
    margin-left: auto;
    color: #333333;
    font-size: 16px;
  }
  .product-side-menu .offcanvas-end {
    width: 500px;
    border-radius: 14px 0px 0px 14px;
  }
  .product-side-menu .offcanvas-header {
    padding: 24px 18px 20px 25px;
    border-bottom: 1px solid #f2f2f2;
  }
  .product-side-menu .offcanvas-header .btn-close {
    font-size: 12px;
    color: #4d4d4d;
  }

  .product-side-menu .offcanvas-body {
    padding: 24px 25px 24px 25px;
  }
  .product-side-menu .special-offer-side {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .product-side-menu .special-offer-side p {
    color: #4d4d4d;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: baseline;
    margin-bottom: 0;
  }
  .product-side-menu .special-offer-side p::before {
    content: '\f005';
    font-family: 'Font Awesome 6 Pro';
    font-weight: 600;
    font-size: 13px;
    color: #fb551d;
    margin-right: 12px;
  }

  .product-details-side {
    display: flex;
    flex-direction: column;
    gap: 26px;
  }
  .product-details-side .product-details-side-text {
    display: flex;
    align-items: baseline;
  }
  .product-details-side .product-details-side-text h4 {
    font-size: 16px;
    font-weight: 500;
    color: #7f7f7f;
    width: 155px;
    margin-bottom: 0;
    flex-shrink: 0;
  }
  .product-details-side .product-details-side-text span {
    color: #4d4d4d;
    margin: 0 10px;
  }
  .product-details-side .product-details-side-text p {
    font-size: 16px;
    font-weight: 500;
    color: #4d4d4d;
    margin-bottom: 0;
  }

  .product-side-menu .care-maintennce p {
    font-weight: 400;
  }
  .product-side-menu .care-maintennce p::before {
    content: '\f068';
    font-family: 'Font Awesome 6 Sharp';
    font-size: 15px;
    color: #333333;
  }

  .side-review-rating .side-rating h3 {
    font-size: 40px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 0;
    margin-right: 12px;
  }
  .side-review-rating .side-rating .side-star-rating i {
    font-size: 22px;
    margin: 0 2px;
  }
  .side-review-rating .side-review-btn {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: #333;
    padding: 18px 0;
    margin: 22px 0 16px 0;
  }
  .side-review-rating .customer-review {
    padding: 24px 0 24px 0;
  }
  .side-review-rating .customer-review:not(:last-child) {
    border-bottom: 2px dashed #cccc;
  }
  .side-review-rating .customer-review .customer-rating i {
    font-size: 15px;
  }
  .side-review-rating .customer-review .customer-review-text p {
    font-size: 15px;
    color: #333333;
    margin: 16px 0 18px 0;
  }
  .side-review-rating .customer-review .customer-review-detail span {
    color: #999999;
    font-size: 16px;
  }
  .side-review-rating
    .customer-review
    .customer-review-detail
    span:not(:last-child):after {
    content: '|';
    margin: 0 8px;
  }

  .side-menu-faq .accordion-button {
    font-size: 16px;
    font-weight: 600;
    color: #4d4d4d;
    background-color: white;
    border-radius: 0;
    box-shadow: none;
    padding: 5px 60px 5px 0;
    position: relative;
  }
  .side-menu-faq .accordion-button::after {
    position: absolute;
    background: none;
    content: '\2b';
    font-family: 'Font Awesome 6 Pro';
    height: 13px;
    width: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 9px;
    transition: transform 0.3s ease-in-out;
  }
  .side-menu-faq .accordion-button:not(.collapsed)::after {
    background: none;
    content: '\f068';
    font-family: 'Font Awesome 6 Pro';
  }
  .side-menu-faq .accordion-button:focus {
    box-shadow: none;
  }
  .side-menu-faq .accordion-item {
    border: 0;
  }
  .side-menu-faq .accordion-item:not(:last-child) {
    margin-bottom: 16px;
  }
  .side-menu-faq .accordion .accordion-body {
    padding: 5px 28px 12px 26px;
    font-size: 15px;
    font-weight: 400;
    color: #666666;
    position: relative;
  }
  .side-menu-faq .accordion .accordion-body::before {
    content: '\e3d6';
    font-family: 'Font Awesome 6 Pro';
    position: absolute;
    left: 2px;
    top: 6px;
    font-size: 14px;
  }

  .detail-page-product .section-heading h2::before {
    width: 65%;
    left: 0;
    transform: translate(0, 0);
  }*/
`;
