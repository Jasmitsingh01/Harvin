import React from 'react';
import ProgressiveImage from '../../shared/progressive-image';
import { useRouter } from 'next/router';

const TopFurnitureCard = ({ item }: any) => {
  const router = useRouter();
  const handleRouting = () => {
    if (item?.parent === null || item?.parent !== 0) {
      router.push(`/categories/${item?.id}-${item?.slug}`);
    } else {
      router.push(`/categories/${item?.id}-${item?.slug}/products`);
    }
  };

  return (
    <div className="category-item" onClick={handleRouting}>
      <div className="category-img">
        <ProgressiveImage height={500} src={item?.icon?.url} alt="" />
      </div>
      <h4>{item?.name}</h4>
    </div>
  );
};

export default TopFurnitureCard;
