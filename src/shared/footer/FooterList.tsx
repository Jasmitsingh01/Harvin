import React from 'react';
import { useTranslation } from 'react-i18next';

const FooterList = ({ data, index }: any) => {
  const { t } = useTranslation();

  console.log(data, 'data');

  return (
    <div className="col-6 col-md-3 mt-4 mt-md-0" key={index}>
      <div className="footer-link">
        <h4>{t(data?.title)}</h4>

        <ul>
          {data?.submenu?.map((submenuItem: any, submenuIndex: number) => (
            <li key={submenuIndex}>
              <a
                href={
                  submenuItem?.is_external === 0
                    ? `/${submenuItem?.url}`
                    : submenuItem?.url
                }
                target={submenuItem?.is_external === 0 ? '_self' : '_blank'}
                rel="noreferrer"
              >
                {t(submenuItem?.title)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterList;
