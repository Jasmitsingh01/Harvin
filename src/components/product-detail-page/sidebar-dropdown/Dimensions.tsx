import React from 'react';
import ProgressiveImage from '../../../shared/progressive-image';
// import img from '../../../assets/images/dimensions-img.png';
import { useProductDetailData } from '../../../stores/product-detail/product-store';
import Button from '../../../shared/common/Button';
import { useTranslation } from 'react-i18next';
import { sideBarTabAction } from '../../../stores/product-detail/product-action';
const Dimensions: React.FC = () => {
  const { product, sidebarTab } = useProductDetailData();

  console.log(product, 'fbdsjkfbsdjkfb');
  const { t } = useTranslation();
  return (
    <div
      className={`offcanvas offcanvas-end ${
        sidebarTab === 'dimensions' ? 'show' : ''
      }`}
      id="dimensions"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title text-18 weight-600"
          id="offcanvasRightLabel"
        >
          {t('dimensions')}
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
        {product?.dimension?.map((elem: any) => {
          return (
            <div className="product-details-side-text" key={elem?.name}>
              <h4>{elem?.name}</h4>
              <span>:</span>
              <p>{elem?.value}</p>
            </div>
          );
        })}
        <div className="dimensions-img">
          {product?.dimension_image?.original && (
            <ProgressiveImage
              src={product.dimension_image.original}
              alt=""
              className="w-100"
              width={100}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Dimensions;
