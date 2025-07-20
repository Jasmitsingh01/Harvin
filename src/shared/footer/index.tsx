'use client';
import React from 'react';
import { FooterStyled } from './styled';
import ProgressiveImage from '../progressive-image';
import { socialMediya } from './footerData';
import FooterList from './FooterList';
import { FooterData } from '../../interface/common';
import useSWR from 'swr';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';

const Footer = () => {
  const { data: FooterData } = useSWR(ROUTES.footerData(), fetcherSWR);
  const currentYear = new Date().getFullYear();

  return (
    <FooterStyled>
      <div className="container">
        <div className="footer-link-wrap ps-md-4">
          <div className="row">
            {FooterData?.map((elem: FooterData, index: number) => {
              return <FooterList data={elem} key={index} />;
            })}
          </div>
        </div>
      </div>
      <div className="footer-icon-wrap">
        <div className="footer-line"></div>
        <div className="footer-icon-item">
          {socialMediya?.map((item: any, index: number) => {
            return (
              <a
                href={item?.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ProgressiveImage src={item?.icon} alt="" width="34" />
              </a>
            );
          })}
        </div>
        <div className="footer-line"></div>
      </div>
      <div className="copyright-text text-center d-flex flex-wrap justify-content-between text-center text-md-start container mt-4 pt-1">
        <p className="text-16 weight-500">
          Harvin Chairs is a Trademark of Harvin Lifestyle Pvt. Ltd. Copyright{' '}
          {currentYear} &copy;{' '}
          <a
            href="https://harvinchairs.com/"
            target="_blank"
            className="text-theme"
            rel="noreferrer"
          >
            Harvin Chairs
          </a>{' '}
          All Rights Reserved.
        </p>
        <p className="text-14 weight-400 mx-auto mx-md-0">
          Powered by{' '}
          <a
            href="https://www.indapoint.com/"
            className="text-theme"
            target="_blank"
            rel="noreferrer"
          >
            IndaPoint Technologies.
          </a>
        </p>
      </div>
    </FooterStyled>
  );
};

export default Footer;
