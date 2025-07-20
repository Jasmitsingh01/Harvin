import React from 'react';
import ProgressiveImage from '../../shared/progressive-image';
const ShopByMaterialCard = ({ item }: any) => {
  const { name, image } = item;
  return (
    <div className="sofa-material-item">
      <a href="#">
        <div className="material-img">
          <ProgressiveImage src={image?.url} alt="" className="w-100" />
        </div>
      </a>
      <a href="#" className="material-name text-18 weight-500">
        {name}
      </a>
    </div>
  );
};

export default ShopByMaterialCard;
