import React from 'react';
import ProgressiveImage from '../../shared/progressive-image';
import { useRouter } from 'next/router';

const TopFurnitureCard = ({ item }: any) => {
  const router = useRouter();

  const handleRouting = () => {
    // Handle static categories differently
    if (typeof item?.id === 'string' && item.id.startsWith('static-')) {
      // For static categories, you can define custom routing
      switch (item.id) {
        case 'static-special-offers':
          router.push('/categories/offers'); // Custom route for special offers
          break;
        case 'static-new-arrivals':
          router.push('/categories/new-arrivals'); // Route for new arrivals
          break;
        case 'static-bestsellers':
          router.push('/categories/bestsellers'); // Route for best sellers
          break;
        default:
          router.push('/categories'); // Default fallback
      }
    } else {
      // Original logic for API categories
      if (item?.parent === null || item?.parent !== 0) {
        router.push(`/categories/${item?.id}-${item?.slug}`);
      } else {
        router.push(`/categories/${item?.id}-${item?.slug}/products`);
      }
    }
  };

  return (
    <div className="category-item" onClick={handleRouting}>
      <div className="category-img">
        <ProgressiveImage
          height={500}
          src={item?.icon?.url}
          alt={item?.name || ''}
        />
      </div>
      <h4>{item?.name}</h4>
    </div>
  );
};

export default TopFurnitureCard;
