import React from 'react';
// import ProgressiveImage from '../../../shared/progressive-image';
// import ProgressiveImage from '../progressive-image'
// import img from "../../../assets/images/dimensions-img.png"
// import ProgressiveImage from '../../../shared/progressive-image';
// import Button from '../../../shared/common/Button';
// import SpecialOffer from './SpecialOffer';
import ProductDetails from './ProductDetails';
import ReviewAndRating from './ReviewAndRating';
import Dimensions from './Dimensions';
import Maintennce from './Maintennce';
import Warranty from './Warranty';
import Faq from './Faq';
import Button from '../../../shared/common/Button';
import { useTranslation } from 'react-i18next';
import { useProductDetailData } from '../../../stores/product-detail/product-store';
import { isEmpty } from 'lodash';
import { sideBarTabAction } from '../../../stores/product-detail/product-action';
const ToggelSideBarNav = () => {
  const { t } = useTranslation();
  const { product, sidebarTab } = useProductDetailData();

  return (
    <>
      {!isEmpty(product?.product_featured_detail) && (
        <div className="product-side-menu">
          {sidebarTab !== '' && (
            <div
              className={`offcanvas-backdrop fade show`}
              onClick={() => sideBarTabAction('')}
            ></div>
          )}
          <Button
            className="btn btn-primary side-menu-btn"
            onClick={() => sideBarTabAction('product-details')}
            data-bs-target="#product-details"
            aria-controls="offcanvasRight"
            text={t('productDetails')}
          />
          <ProductDetails />
        </div>
      )}
      {!isEmpty(product?.dimension) && (
        <div className="product-side-menu">
          <Button
            className="btn btn-primary side-menu-btn"
            onClick={() => sideBarTabAction('dimensions')}
            data-bs-target="#product-details"
            aria-controls="offcanvasRight"
            text={t('dimensions')}
          />
          <Dimensions />
        </div>
      )}
      <div className="product-side-menu">
        <Button
          className="btn btn-primary side-menu-btn"
          onClick={() => sideBarTabAction('reviews-ratings')}
          data-bs-target="#product-details"
          aria-controls="offcanvasRight"
          text={t('reviewsRatings')}
        />
        <ReviewAndRating />
      </div>
      {!isEmpty(product?.maintenance_details) && (
        <div className="product-side-menu">
          <Button
            className="btn btn-primary side-menu-btn"
            type="button"
            onClick={() => sideBarTabAction('maintennce')}
            data-bs-toggle="offcanvas"
            data-bs-target="#care-maintennce"
            aria-controls="offcanvasRight"
            text={t('careAndMaintennce')}
          />
          <Maintennce setActiveMenu={sideBarTabAction} />
        </div>
      )}
      {product?.warranty_details !== null && (
        <div className="product-side-menu">
          <Button
            className="btn btn-primary side-menu-btn"
            type="button"
            onClick={() => sideBarTabAction('warranty')}
            data-bs-toggle="offcanvas"
            data-bs-target="#care-maintennce"
            aria-controls="offcanvasRight"
            text={t('warranty')}
          />
          <Warranty />
        </div>
      )}

      {!isEmpty(product?.product_faqs) && (
        <div className="product-side-menu">
          <Button
            className="btn btn-primary side-menu-btn"
            type="button"
            onClick={() => sideBarTabAction('FAQs')}
            data-bs-toggle="offcanvas"
            data-bs-target="#care-maintennce"
            aria-controls="offcanvasRight"
            text={t('FAQs')}
          />
          <Faq />
        </div>
      )}
    </>
  );
};

export default ToggelSideBarNav;
