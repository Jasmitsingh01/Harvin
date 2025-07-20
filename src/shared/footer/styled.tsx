import styled from 'styled-components';

export const FooterContainer = styled.div``;

export const FooterLinkWrap = styled.div``;
export const FooterStyled: any = styled.footer`
  padding: 60px 0 20px 0;
  .footer-link-wrap .footer-link h4 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 24px;
    color: black;
  }
  .footer-link-wrap .footer-link ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .footer-link-wrap .footer-link ul li {
    margin: 13px 0;
  }
  .footer-link-wrap .footer-link ul li a {
    font-weight: 500;
    color: #2c2c2c;
    font-size: 17px;
  }
  .footer-link-wrap .footer-link ul li a:hover {
    color: #fb551d;
  }
  .footer-icon-wrap {
    display: flex;
    align-items: center;
    margin: 46px 0 20px 0;
  }
  .footer-icon-wrap .footer-line {
    height: 1px;
    width: 100%;
    background-color: #b9b9b9;
  }
  .footer-icon-wrap .footer-icon-item {
    min-width: 390px;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  /* Default styles */

  @media screen and (min-width: 768px) and (max-width: 991px) {
    padding: 45px 0 24px 0;
    .footer-link-wrap .footer-link h4 {
      font-size: 17px;
    }
    .footer-link-wrap .footer-link ul li a {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 10px 0 20px 0;
    .footer-link-wrap .footer-link h4 {
      font-size: 17px;
      margin-bottom: 14px;
    }
    .footer-link-wrap .footer-link ul li {
      margin: 6px 0;
    }
    .footer-link-wrap .footer-link ul li a {
      font-size: 16px;
    }
    .footer-icon-wrap {
      margin: 36px 0 20px 0;
    }
    .footer-icon-wrap .footer-icon-item {
      gap: 12px;
      padding: 0 16px;
      min-width: 260px;
    }
    .footer-icon-wrap .footer-icon-item img {
      width: 30px;
    }
    .copyright-text p {
      font-size: 14px;
    }
  }
`;
