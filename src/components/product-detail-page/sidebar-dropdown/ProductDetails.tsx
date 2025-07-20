import React from 'react';
import Button from '../../../shared/common/Button';
import { useProductDetailData } from '../../../stores/product-detail/product-store';
import { useTranslation } from 'react-i18next';
import { sideBarTabAction } from '../../../stores/product-detail/product-action';
import ReactHtmlParser from 'react-html-parser';
const ProductDetails: React.FC = () => {
  const { t } = useTranslation();
  const { product, sidebarTab } = useProductDetailData();
  return (
    <div
      className={`offcanvas offcanvas-end ${
        sidebarTab === 'product-details' ? 'show' : ''
      }`}
      id="product-details"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title text-18 weight-600"
          id="offcanvasRightLabel"
        >
          {t('productDetails')}
        </h5>
        <Button
          onClick={() => sideBarTabAction('')}
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body product-details-side">
        {product && product.description && ReactHtmlParser(product.description)}
        {product?.product_featured_detail?.map((elem) => {
          return (
            <div
              className="product-details-side-text"
              key={elem?.feature_title}
            >
              <h4>{elem?.feature_title}</h4>
              <span>:</span>
              <p>{elem?.feature_value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetails;
