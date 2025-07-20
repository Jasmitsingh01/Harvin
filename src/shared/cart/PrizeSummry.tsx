import React from 'react';
import { useTranslation } from 'react-i18next';

const PrizeSummry = () => {
  const { t } = useTranslation();

  return (
    <div className="cart-summary-wrap">
      <h4 className="cart-summary-text text-20 weight-500">
        {t('prizeSummary')}
      </h4>
      <ul>
        <li>
          <span className="weight-500">{t('MRP')}</span>
          <span className="amount weight-500">₹ 43,450</span>
        </li>
        <li>
          <span className="weight-500">Discount</span>
          <span className="discount weight-500">- ₹ 12,897</span>
        </li>
        <li>
          <span className="weight-500">{t('coupon')} (MANIA10)</span>
          <span className="discount weight-500">- ₹ 1,000</span>
        </li>
        <li>
          <span className="weight-500">{t('assemblyCharges')}</span>
          <span className="amount weight-500">₹ 1,000</span>
        </li>
      </ul>
      <div className="pay-amount-wrap">
        <h3 className="pay-text text-24 weight-600 ">You Pay</h3>
        <h3 className="pay-amount-num text-24 weight-600 ">₹ 32,785</h3>
      </div>
      <p className="tax-line">{t('inclusiveOfAllTaxes')}</p>
      <p className="save-amount-text weight-500">
        Congratulation! You just saved ₹ 12,897 on your order.
      </p>
    </div>
  );
};

export default PrizeSummry;
