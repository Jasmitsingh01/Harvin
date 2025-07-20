import React, { useState } from 'react';
import ProgressiveImage from '../../shared/progressive-image';
import {
  useCombinationData,
  // useSelectedProductCombination,
} from '../../stores/product-detail/product-store';
import { setSelectedCombination } from '../../stores/product-detail/product-action';

const CombinationList = ({ result }: any) => {
  const {
    data: combinationsData,
    selectedCombination,
    loading: combinationLoading,
  } = useCombinationData();

  const [selectedValues, setSelectedValues] = useState({});

  const handleClick = (elem: any, object: any) => {
    setSelectedCombination(elem, object, result);

    setSelectedValues((prevValues) => ({
      ...prevValues,
      [object.id]: elem.value,
    }));
  };

  const isActive = (elem: any, value: string) => {
    if (value === elem?.id) {
      return 'active';
    }
    return '';
  };

  const imageRadioView = (attribute: any, object: any) => {
    return (
      <>
        <div className="fabric-title d-flex align-items-center">
          <h4 className="mb-0 text-16 weight-600"> Choose {attribute}:</h4>
          <span className="text-16 weight-600 text-theme ms-lg-2">
            {selectedValues[object.id] || object.values[0]?.value}
          </span>
        </div>
        <div className="fabric-storage-listing">
          {object.values?.map((elem: any) => {
            return (
              <div
                key={elem.id}
                className={`fabric-items-container `}
                onClick={() => handleClick(elem, object)}
              >
                <div
                  className={`fabric-item ${isActive(
                    elem,
                    selectedCombination[object.id]
                  )}`}
                >
                  <div className="fabric-img">
                    <ProgressiveImage
                      src={elem?.cover_image?.thumbnail}
                      alt=""
                    />
                  </div>
                  <span className="fabric-name">{elem.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const radioView = (attribute: any, object: any) => {
    return (
      <>
        <div className="storage-wrap">
          <div className="fabric-title d-flex align-items-center">
            <h4 className="mb-0 text-16 weight-600">Choose {attribute}:</h4>
            <span className="text-16 weight-600 text-theme ms-lg-2">
              {selectedValues[object.id] || object.values[0]?.value}
            </span>
          </div>
          <div className="fabric-storage-listing">
            {object.values?.map((elem: any) => {
              return (
                <span
                  key={elem.id}
                  className={`storage-name ${isActive(
                    elem,
                    selectedCombination[object.id]
                  )}`}
                  onClick={() => handleClick(elem, object)}
                >
                  {elem?.value}
                </span>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      style={{
        display:
          !combinationLoading &&
          Object.entries(combinationsData).some(
            ([, object]: any) => object.values && object.values.length > 1
          )
            ? 'block'
            : 'none',
      }}
      className="fabric-storage-wrap"
    >
      {!combinationLoading &&
        Object.entries(combinationsData).map(([attribute, object]: any) => {
          if (object.values && object.values.length > 1) {
            return object.type === 'image_radio'
              ? imageRadioView(attribute, object)
              : radioView(attribute, object);
          }
          return null;
        })}
    </div>
  );
};

export default CombinationList;
