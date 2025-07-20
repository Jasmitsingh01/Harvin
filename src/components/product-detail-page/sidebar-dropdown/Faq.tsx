import React, { useState } from 'react';
import { useProductDetailData } from '../../../stores/product-detail/product-store';
import Button from '../../../shared/common/Button';
import { useTranslation } from 'react-i18next';
import { sideBarTabAction } from '../../../stores/product-detail/product-action';
const Faq = () => {
  const { t } = useTranslation();
  const { product, sidebarTab } = useProductDetailData();
  const [openAns, setOpenAns] = useState(0);
  const handleOpen = (index: number) => {
    setOpenAns(openAns === index ? null : index);
  };

  console.log('product', product.product_faqs);
  return (
    <div
      className={`offcanvas offcanvas-end ${
        sidebarTab === 'FAQs' ? 'show' : ''
      }`}
      style={{ overflowY: 'hidden' }}
      id="faq"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title text-18 weight-600"
          id="offcanvasRightLabel"
        >
          {t('FAQs')}
        </h5>
        <Button
          onClick={() => sideBarTabAction('')}
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div
        className="offcanvas-body side-menu-faq"
        style={{ overflowY: 'auto' }}
      >
        <div className="accordion" id="accordionExample">
          {product?.product_faqs?.map((elem, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <Button
                  className={`accordion-button ${
                    index === openAns ? '' : 'collapsed'
                  }`}
                  type="button"
                  onClick={() => handleOpen(index)}
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === openAns}
                  aria-controls={`collapse${index}`}
                  text={elem?.question}
                />
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${
                  index === openAns ? 'show' : ''
                }`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">{elem?.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
