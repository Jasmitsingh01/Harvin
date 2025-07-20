import React from 'react';
import Button from '../../../shared/common/Button';
import { useProductDetailData } from '../../../stores/product-detail/product-store';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';

const Maintennce = ({ setActiveMenu }: any) => {
  const { t } = useTranslation();
  const { product, sidebarTab } = useProductDetailData();
  return (
    <div
      className={`offcanvas offcanvas-end ${
        sidebarTab === 'maintennce' ? 'show' : ''
      }`}
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title text-18 weight-600"
          id="offcanvasRightLabel"
        >
          {t('careAndMaintennce')}
        </h5>
        <Button
          onClick={() => setActiveMenu('')}
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      {/* <div className="offcanvas-body special-offer-side care-maintennce">
        <div
          dangerouslySetInnerHTML={{ __html: product?.maintenance_details }}
        />
      </div> */}
      <div className="offcanvas-body">
        {ReactHtmlParser(product?.maintenance_details)}
      </div>
    </div>
  );
};

export default Maintennce;
