'use client';
import React from 'react';
import { FooterContainer, FooterLinkWrap } from './styled';
import ProgressiveImage from '../progressive-image';
import { socialMediya } from './footerData';
// import FooterList from './FooterList';
// import { FooterData } from '../../interface/common';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer>
        <FooterContainer className="container">
          <FooterLinkWrap className="footer-link-wrap ps-md-4">
            <div className="row">
              {/* {footerData?.map((elem: FooterData, index: number) => {
                return <FooterList data={elem} key={index} />;
              })} */}
            </div>
          </FooterLinkWrap>
        </FooterContainer>
        <div className="footer-icon-wrap">
          <div className="footer-line"></div>
          <div className="footer-icon-item">
            {socialMediya?.map((item: any, index: number) => {
              return (
                
                  <ProgressiveImage src={item?.icon} key={index}  alt="" />
              );
            })}
          </div>
          <div className="footer-line"></div>
        </div>
        <div className="copyright-text text-center">
          <p className="text-16 weight-500">
            Copyright {currentYear} &copy;{' '}
            <a href="" className="text-theme">
              Harvin Chairs
            </a>{' '}
            All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
