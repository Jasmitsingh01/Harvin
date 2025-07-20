import React from 'react';
import ProgressiveImage from '../../shared/progressive-image';
// import { ProductType } from '../../interface/common';
// import Image from 'next/image'
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import NoDataAvailable from '../../shared/common/NoDataAvailable';
import { useRouter } from 'next/router';
import { useLastViewedItmes } from '../../stores/last-viewed/last-store';
const RecenteltViewed = ({ loading }: any) => {
  const router = useRouter();
  // const { data = [] } = result || {};
  const { t } = useTranslation();

  const { lastViewedItems } = useLastViewedItmes();

  return (
    <section className="recently-view-product detail-page-product">
      <div className="container">
        <div className="section-heading">
          <h2>{t('yourRecentlyViewProducts')}</h2>
        </div>
        {isEmpty(lastViewedItems) && !loading && <NoDataAvailable />}
        <div className="recently-view-product-listing">
          {lastViewedItems.map((item, key) => (
            <div
              onClick={() => router.push(`/product/${item?.id}-${item?.slug}`)}
              key={key}
              className="recently-view-product-item"
            >
              <ProgressiveImage
                src={item?.gallery[0]?.original || item?.image}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecenteltViewed;
