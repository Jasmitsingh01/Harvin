import React from 'react';
import ProgressiveImage from '../../shared/progressive-image';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';

const SofaStyleBlock = ({ loading }: any) => {
  const { t } = useTranslation();
  const router: any = useRouter();

  const idFromRouter = router?.query.id?.split('-')[0];

  const numberBeforeHyphen = parseInt(idFromRouter, 10);

  const { data: sofas, error } = useSWR(
    ROUTES.styleShowcase(numberBeforeHyphen),
    fetcherSWR
  );
  if (isEmpty(sofas)) {
    return null;
  }

  return (
    <section className="sofa-showcase">
      <div className="container">
        {error ? (
          <div>Error loading data</div>
        ) : loading && !sofas ? (
          <Skeleton width={'100%'} height={'100%'} />
        ) : (
          !isEmpty(sofas) && (
            <>
              <div className="section-heading text-center">
                <h2>{t('sofaStylesShowcase')}</h2>
                <p className="text-16 weight-500 mb-0 mt-4 mx-md-5 px-md-5">
                  Immerse yourself in a world of sofa inspirations. Browse
                  through our curated gallery of stylish living rooms, cozy
                  lounges, and modern interiors, all adorned with our exquisite
                  sofa collections.
                </p>
              </div>
              <div className="row">
                {sofas.slice(0, 3).map((sofa: any, index: number) => (
                  <div
                    className={index === 0 ? 'col-md-12' : 'col-md-6'}
                    key={index}
                  >
                    <div
                      className={
                        index === 0
                          ? 'collection-img mt-4'
                          : 'collection-img1 mt-4'
                      }
                      onClick={() => router.push(`/${sofa.url}`)}
                    >
                      <ProgressiveImage src={sofa?.image?.url} alt="" />
                      <div className="collection-name-wrap text-center">
                        <a href={`/${sofa.url}`} className="collection-name">
                          {sofa?.name}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </section>
  );
};

export default SofaStyleBlock;
