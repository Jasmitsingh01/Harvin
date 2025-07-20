import styled from 'styled-components';

export const PaymentStyled = styled.section`
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
  &.payment-method .accordion-button {
    align-items: center;
    padding: 20px 18px 20px 18px;
  }
  &.payment-method .accordion-button:not(.collapsed) {
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
  }
`;
