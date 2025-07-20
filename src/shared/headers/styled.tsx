import styled from 'styled-components';

export const NavStyled = styled.header`
  /* nav {
    padding: 20px 0;
    .navbar {
      justify-content: flex-start;
      padding: 0;
      .header-right-item {
        gap: 20px;
      }
      .nav-icon {
        display: none;
      }
    }
  }
  .header-search input {
    color: #666666;
    position: relative;
    width: 574px;
    border-radius: 40px;
    font-size: 14px;
    padding: 14px 50px 14px 50px;
    margin-left: 100px;
    background-color: #f8f8f8;
    border: 0;
    &:focus {
      box-shadow: none;
      outline: none;
    }
  }
  .header-search i {
    color: #666666;
    position: absolute;
    left: 122px;
    top: 14px;
    font-size: 20px;
  }
  .header-right-item .header-right {
    display: flex;
    align-items: center;
    color: #333333;
    gap: 5px;
    cursor: pointer;

    i {
      font-size: 22px;
    }
    span {
      font-size: 16px;
      margin-left: 8px;
      color: #1a1a1a;
    }
  }


  @media screen and (min-width: 768px) and (max-width: 991px) {
    nav {
      padding: 10px 0 !important;
    }
    .nav .navbar .nav-icon {
      display: block !important;
    }
    nav .navbar .nav-icon i {
      font-size: 22px;
      color: #fb551d;
      margin-right: 12px;
    }
    .navbar a img {
      width: 160px;
    }
    nav .navbar .header-right-item .header-right span {
      display: none;
      font-size: 20px;
    }
    nav .navbar .header-search input {
      width: 300px;
      margin-left: 46px;
      padding: 11px 20px 11px 50px;
    }
    nav .navbar .header-search i {
      left: 66px;
      top: 14px;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 767px) {
    nav {
      padding: 8px 0 10px 0 !important;
    }
    nav .navbar {
      justify-content: center;
    }
    .navbar a img {
      width: 174px;
    }
    .navbar .header-right-item {
      gap: 14px !important;
    }
    .navbar .header-search {
      margin-top: 18px !important;
      width: 100%;
    }
    .nav-icon {
      display: block !important;
    }
    nav .navbar .nav-icon i {
      font-size: 22px;
      color: #fb551d;
      margin-right: 18px;
    }
    nav .navbar .header-search input {
      margin-left: 0px;
      width: 100%;
      padding: 9px 20px 9px 44px;
    }
    nav .navbar .header-search i {
      left: 18px;
      top: 12px;
      font-size: 14px;
    }
    nav .navbar .header-right-item .header-right i {
      font-size: 20px;
    }
    nav .navbar .header-right-item .header-right span {
      font-size: 14px;
      margin-left: 3px;
      display: none;
    }
  } */
`;

export const HeaderLogout = styled.p`
  position: relative;
  cursor: pointer;
  .fa-regular {
  }
  ul {
    list-style: none;
    padding: 0;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: block;
    margin-top: 10px;
  }
  &:hover ul {
  }
  li {
    padding: 10px;
    color: #333;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
