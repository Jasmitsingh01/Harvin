import React from 'react';
import { useProductDetailData } from '../../../stores/product-detail/product-store';
import Button from '../../../shared/common/Button';
import { useTranslation } from 'react-i18next';
import { sideBarTabAction } from '../../../stores/product-detail/product-action';
import ReactHtmlParser from 'react-html-parser';

const Warranty = () => {
  const { product, sidebarTab } = useProductDetailData();
  const { t } = useTranslation();
  return (
    <div
      className={`offcanvas offcanvas-end ${
        sidebarTab === 'warranty' ? 'show' : ''
      }`}
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title text-18 weight-600"
          id="offcanvasRightLabel"
        >
          {t('warranty')}
        </h5>
        <Button
          onClick={() => sideBarTabAction('')}
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      {/* <div className="offcanvas-body special-offer-side care-maintennce">
        <div dangerouslySetInnerHTML={{ __html: product?.warranty_details }} />
      </div> */}
      <div className="offcanvas-body">
        {ReactHtmlParser(product?.warranty_details)}
      </div>
    </div>
  );
};

export default Warranty;
