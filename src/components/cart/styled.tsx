import styled from 'styled-components';

export const CartStyled = styled.main`
  /* &.cart-page {
    padding: 20px 0 20px 0;


  }
  &.cart-page .breadcrumb-wrap {
    padding: 20px 0 20px 0;

  }
  &.cart-page .breadcrumb-wrap nav {
    padding: 22px;
    background: rgba(254, 207, 190, 0.14);
    border-radius: 8px;
  }
  &.cart-page .breadcrumb-wrap nav ol {
    margin-bottom: 0;
  }
  &.cart-page .breadcrumb-wrap nav .breadcrumb-item {
    font-size: 20px;
    font-weight: 600;
    color: #fdb69e;
    padding-left: 14px;
  }
  &.cart-page .breadcrumb-item::before {
    color: #fdb69e;
  }
  &.cart-page .breadcrumb-wrap nav .breadcrumb-item.active {
    color: #fb551d;
  }

  .cart-left {
    width: 55%;
  }
  &.product-detail-right::-webkit-scrollbar {
    display: none;
  }
  .cart-right {
    width: 45%;
  }
  .cart-heading h2 {
    padding-bottom: 20px;
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 8px;
  }
  .cart-product-wrap {
    padding-right: 30px;
    border-right: 1px solid #f2f2f2;
    height: 670px;
    overflow-y: scroll;
  }
  .cart-product-wrap::-webkit-scrollbar {
    display: none;
  }
  .cart-product-item {
    padding: 30px 0 28px 0;
    border-bottom: 2px dashed #cccc;
  }
  .cart-product-item .cart-product-img img {
    border-radius: 6px;
  }
  .cart-product-item .cart-product-detail {
    padding-left: 20px;
  }
  .cart-product-item .cart-product-detail p {
    font-size: 15px;
    color: #7f7f7f;
    margin-bottom: 3px;
  }
  .quantity-wrap span {
    font-size: 15px;
    color: #666666;
  }
  .cart-product-item .quantity-price {
    gap: 24px;
    margin-top: 16px;
  }
  .cart-product-item .quantity-price .quantity button {
    height: 40px;
    font-size: 18px;
    padding: 0 13px;
  }
  .cart-product-item .quantity-price .quantity .quantity-num {
    width: 30px;
    font-size: 16px;
  }
  .cart-product-item .product-price-wrap .new-price {
    font-size: 18px;
    font-weight: 500;
  }
  .cart-product-item .product-price-wrap .old-price {
    font-size: 16px;
    font-weight: 500;
    color: #999999;
    margin: 0 6px 0 8px;
    text-decoration: line-through;
  }
  .cart-product-item .product-price-wrap .discount {
    font-size: 16px;
    font-weight: 600;
    color: #4caf4f;
  }
  .cart-product-item .product-wishlist-remove {
    margin-top: 20px;
    gap: 24px;
  }
  .cart-product-item .product-wishlist-remove a {
    color: #666666;
  }
  .cart-product-item .product-wishlist-remove span {
    margin-left: 5px;
  }

  .delivery-pincode .change-pincode {
    padding-left: 20px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    margin-right: 18px;
  }
  .delivery-pincode .change-pincode .change-btn {
    height: 50px;
    padding: 0 18px;
    color: #fc6e3d;
  }
  .delivery-pincode .locate-text i {
    margin-right: 5px;
  }
  &.apply-coupon-wrap {
    padding: 18px 20px 18px 16px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 500;
    margin-top: 24px;
  }
  &.apply-coupon-wrap .apply-coupon-btn img {
    margin-right: 12px;
  }
  &.side-menu-btn {
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
  &.apply-coupon-wrap .apply-coupon-code-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0px 0 0px 18px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    margin-bottom: 30px;
  }
  &.apply-coupon-wrap .apply-coupon-code-wrap input {
    border: 0;
    outline: 0;
    width: calc(100% - 100px);
    color: #999999;
  }
  &.apply-coupon-wrap .apply-coupon-code-wrap .apply-btn {
    height: 50px;
    padding: 0 18px;
  }

  .apply-coupon-wrap .offer-coupon-wrap .code-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .apply-coupon-wrap .offer-coupon-wrap .code-wrap h4 {
    color: #323232;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 0;
  }
  .offcanvas-end {
    width: 500px !important;
    border-radius: 14px 0px 0px 14px;
    overflow: hidden;
  }
  .offcanvas-header {
    padding: 24px 18px 20px 25px;
    border-bottom: 1px solid #f2f2f2;
  }
  .offcanvas-header .btn-close {
    font-size: 12px;
    color: #4d4d4d;
  }

  .offcanvas-body {
    padding: 24px 25px 24px 25px;
  }
  .apply-coupon-wrap .offer-coupon-wrap .code-wrap a {
    font-size: 18px;
    font-weight: 600;
    color: #fb551d;
  }
  .apply-coupon-wrap .offer-detail {
    margin-top: 15px;
    padding: 15px 0 0 0;
    border-top: 2px dashed #fecfbe;
  }
  .apply-coupon-wrap .offer-detail p {
    font-size: 14px;
    margin-bottom: 7px;
    color: #666666;
  }
  .cart-summary-wrap {
    padding: 20px 26px 28px 26px;
    border-radius: 8px;
    border: 1px solid #f2f2f2;
    margin-top: 24px;
  }
  .cart-summary-text {
    padding-bottom: 12px;
    margin-bottom: 0;
    border-bottom: 1px solid #f2f2f2;
  }
  .cart-summary-wrap ul {
    list-style: none;
    margin: 0;
    padding: 5px 0 10px 0;
    border-bottom: 1px solid #f2f2f2;
  }
  .cart-summary-wrap ul li {
    display: flex;
    justify-content: space-between;
    margin: 14px 0;
  }
  .cart-summary-wrap ul li span {
    color: #7f7f7f;
  }
  .cart-summary-wrap ul li .amount {
    color: #333333;
  }
  .cart-summary-wrap ul li .discount {
    color: #4caf4f;
  }
  .cart-summary-wrap .pay-amount-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 26px;
  }
  .cart-summary-wrap .tax-line {
    text-align: right;
    color: #7f7f7f;
    margin: 0 0 30px 0;
  }
  .cart-summary-wrap .save-amount-text {
    padding: 12px;
    color: #4caf4f;
    background: rgba(76, 175, 79, 0.08);
    margin-bottom: 0;
    border-radius: 5px;
  }
  .total-amount-wrap .proceed-btn {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .total-amount-wrap .proceed-btn i {
    font-size: 19px;
    margin-left: 10px;
  }


  .cart-address-wrap {
    padding: 30px 0 70px 0;
  }
  .delivery-address-wrap {
    padding-right: 24px;
    border-right: 1px solid #f2f2f2;
  }
  .delivery-address-wrap .form-group {
    margin-top: 28px;
  }
  .delivery-address-wrap .form-group .form-label {
    font-size: 18px;
    font-weight: 500;
    color: #4d4d4d;
  }
  .delivery-address-wrap .form-group .form-control {
    padding: 18px 20px 18px 20px;
    font-size: 16px;
    color: #999999;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
  }
  .delivery-address-wrap .form-group .form-control:focus {
    box-shadow: none;
  }
  .delivery-address-wrap .form-group .input-city,
  .delivery-address-wrap .form-group .input-state {
    background: rgba(248, 248, 248, 0.5);
  }
  .delivery-address-wrap .form-group p {
    color: #7f7f7f;
    font-size: 15px;
    font-weight: 400;
  }
  .delivery-address-wrap .form-group span {
    color: #4d4d4d;
    margin: 0px 10px 0 10px;
  }
  .order-detail-wrap {
    padding: 20px 26px 20px 26px;
    border: 1px solid #f2f2f2;
    border-radius: 8px;
  }
  .order-detail-wrap .order-detial-text {
    padding-bottom: 16px;
    border-bottom: 1px solid #f2f2f2;
  }
  .order-detail-wrap .order-detail-item {
    margin-top: 22px;
    display: flex;
    gap: 16px;
  }
  .order-detail-wrap .order-detail-item .order-detail-img img {
    border-radius: 6px;
  }
  .order-detail-wrap .order-detail-item .order-detail-info h4 {
    margin-bottom: 4px;
  }
  .order-detail-wrap .order-detail-item .order-detail-info p {
    font-size: 14px;
    margin-bottom: 0;
    color: #7f7f7f;
  }

  .cart-payment-wrap {
    padding: 30px 0 90px 0;
  }
  .payment-method-wrap {
    padding-right: 26px;
    border-right: 1px solid #f2f2f2;
  }
  .payment-method-wrap .payment-method {
    margin-top: 30px;
  }
  .payment-name-option-wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .payment-name-option-wrap .payment-name {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .payment-name-option-wrap .payment-name input {
    margin-right: 10px;
  }
  .payment-name-option-wrap .payment-name h5 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 0;
  }
  .payment-name-option-wrap .payment-option-icon {
    transition: all 0.3s;
  }
  .payment-method .accordion-item {
    border: 1px solid #f2f2f2;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 20px;
  }
  .payment-method .accordion-item:first-child {
    border-top: 1px solid #f2f2f2;
  }
  .payment-method .accordion-item:last-child {
    border-bottom: 1px solid #f2f2f2;
  }
  .payment-method .accordion-button {
    align-items: center;
    padding: 20px 18px 20px 18px;
  }
  .payment-method .accordion-button:not(.collapsed) {
    color: unset;
    background-color: white;
    box-shadow: none;
  }
  .payment-method .accordion-button:focus {
    box-shadow: none;
  }
  .payment-method .accordion-button::after {
    margin-left: 30px;
    background: none;
    content: '\f107';
    font-family: 'Font Awesome 6 Pro';
    height: 13px;
    width: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .payment-method .accordion-button:not(.collapsed) .payment-option-icon {
    opacity: 0;
  }
  .payment-method .accordion-body {
    padding: 10px 18px 28px 60px;
  }

  .card-open .form-group {
    display: flex;
    gap: 0 18px;
    margin-bottom: 18px;
    flex-wrap: wrap;
  }
  .card-open .form-group .form-control {
    font-size: 16px;
    color: #999999;
    font-weight: 400;
    padding: 14px 16px 14px 16px;
    border-radius: 5px;
    border: 1px solid #f2f2f2;
  }
  .card-open .form-group .form-control:focus {
    box-shadow: none;
  }
  .card-open .form-group .card-input {
    width: 400px;
  }
  .card-open .form-group .num-input {
    width: 150px;
  }

  .card-open .form-group .info-icon-btn {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 16px;
    color: #999999;
    font-size: 17px;
    padding: 0;
    background: transparent;
    border: 0;
  }
  .card-open .form-group .modal-dialog {
    margin-top: 140px;
  }
  .card-open .modal-body {
    padding: 20px 26px 26px 26px;
  }
  .card-open .modal-body .cvv-wrap {
    display: flex;
    flex-direction: column;
    gap: 26px;
  }
  .card-open .modal-body .cvv-wrap h4 {
    color: #424553;
    margin-bottom: 6px;
  }
  .card-open .modal-body .cvv-wrap p {
    color: #515460;
    margin-bottom: 10px;
  }
  .pay-now-btn {
    font-size: 20px;
    margin-top: 10px;
  }

  .bank-card-listing {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 28px;
  }
  .bank-card-listing .bank-card {
    padding: 16px 14px;
    border-radius: 8px;
    border: 1px solid #f2f2f2;
    text-align: center;
    cursor: pointer;
  }
  .bank-card-listing .bank-card.active {
    border: 1px solid #fc865d;
    background: rgba(254, 207, 190, 0.05);
  }
  .bank-card-listing .bank-card img {
    width: 36px;
    margin-bottom: 14px;
  }
  .bank-card-listing .bank-card span {
    font-size: 15px;
    display: block;
  }
  .netbanking-open .select-bank {
    font-size: 16px;
    color: #999999;
    background-color: white;
    padding: 16px 18px 16px 18px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #f2f2f2;
    width: 100%;
    margin-bottom: 26px;
  }
  .netbanking-open .select-bank:active {
    background-color: white;
    border: 1px solid #f2f2f2;
  }
  .netbanking-open .select-bank::after {
    margin-left: auto;
    content: '\f107';
    font-family: 'Font Awesome 6 Pro';
    color: #999999;
  }
  .modal-header {
    padding: 20px;
  }
  .modal-header h1 {
    color: #333333;
  }
  .netbanking-open .modal-body {
    padding: 0;
  }
  .bank-name-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .bank-name-list li {
    padding: 20px;
  }
  .bank-name-list li:not(:last-child) {
    border-bottom: 1px solid #f2f2f2;
  }
  .bank-name-list li .bank-name-link {
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 18px;
    color: #333333;
  }

  .upi-open .qr-scan-wrap {
    padding: 20px;
    display: flex;
    gap: 20px;
    align-items: center;
    border: 1px solid #e5e5e5;
    border-radius: 11px;
    margin-bottom: 28px;
  }
  .upi-open .qr-scan-wrap .upi-paymeny-icon {
    display: flex;
    gap: 8px;
    margin: 13px 0;
  }
  .upi-open .qr-scan-wrap .qr-code-text {
    font-size: 15px;
    color: #4d4d4d;
  }
  .upi-open .qr-scan-wrap .qr-code-time {
    font-size: 15px;
    color: #7f7f7f;
  }
  .payment-method .payment-open-heading {
    color: #4d4d4d;
    margin-bottom: 18px;
  }
  .upi-id-num-wrap {
    padding: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 11px;
    margin-bottom: 18px;
  }
  .upi-id-num-wrap .upi-id-num {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .upi-id-num-wrap .upi-id-num h5 {
    font-size: 15px;
  }
  .upi-id-num-wrap .form-control {
    font-size: 16px;
    color: #999999;
    font-weight: 400;
    padding: 14px 16px 14px 16px;
    border-radius: 5px;
    border: 1px solid #f2f2f2;
    width: 410px;
    margin-top: 20px;
  }
  .upi-id-num-wrap .form-control:focus {
    box-shadow: none;
  }

  .upi-pay-option-wrap {
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    margin-bottom: 22px;
  }
  .upi-pay-option-wrap .upi-pay-option {
    display: flex;
    gap: 18px;
    padding: 22px;
  }
  .upi-pay-option-wrap .upi-pay-option input {
    cursor: pointer;
  }
  .upi-pay-option-wrap .upi-pay-option .upi-pay-name {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  .upi-pay-option-wrap .upi-pay-option:not(:last-child) {
    border-bottom: 1px solid #f2f2f2;
  }
  .cart-payment-right .cart-summary-wrap {
    margin-top: 0;
  } */
`;
