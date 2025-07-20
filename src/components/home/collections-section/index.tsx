import React from 'react';
// import sofa from '../../../assets/images/collections-sofa.png';
// import woodensofa from '../../../assets/images/collections-wooden-sofa.png';
// import Image from 'next/image';
import ProgressiveImage from '../../../shared/progressive-image';
import { CollectionStyled } from './styled';
import { useTranslation } from 'react-i18next';
import Skeleton from './Skeleton';
import { useRouter } from 'next/router';
const CollectionSection = ({ data, loading }: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleRouting = (item) => {
    router.push(item?.url);
  };
  return (
    <CollectionStyled className="collection">
      {loading && <Skeleton />}
      {data && (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-6">
                  <div className="collection-title">
                    <h3 className="text-32 weight-700">
                      {t('collectionInFocus')}
                    </h3>
                  </div>
                </div>
                {data?.slice(0, 3)?.map((item: any, index: number) => {
                  return (
                    <div
                      className="col-6"
                      key={item?.name}
                      onClick={() => handleRouting(item)}
                    >
                      <div
                        className={`collection-img ${index !== 0 && 'mt-4'}`}
                      >
                        <ProgressiveImage src={item?.image?.url} alt="" />
                        <div className="collection-name-wrap text-center">
                          <a href="" className="collection-name">
                            {item?.name}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {data?.slice(3, 4)?.map((item: any) => (
              <div
                className="col-md-6"
                key={item.name}
                onClick={() => handleRouting(item)}
              >
                <div className="collection-item mt-4 mt-md-0">
                  <div className="collection-img">
                    <ProgressiveImage src={item?.image?.url} alt="" />
                    <div className="collection-name-wrap text-center">
                      <a href="" className="collection-name">
                        {item?.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </CollectionStyled>
  );
};

export default CollectionSection;
