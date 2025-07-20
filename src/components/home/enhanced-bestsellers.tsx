import React from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';
import CardView from '../../shared/cards';
import { Skeleton } from '@mui/material';
import { range } from 'lodash';
import styled from 'styled-components';

const BestSellersSection = styled.section`
  padding: 60px 0;
  background: linear-gradient(135deg, #fef9f8 0%, #fff5f0 100%);

  .bestsellers-header {
    text-align: center;
    margin-bottom: 50px;

    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 16px;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: linear-gradient(90deg, #fb551d 0%, #ff8c42 100%);
        border-radius: 2px;
      }
    }

    p {
      font-size: 1.1rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .bestsellers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
  }

  .bestseller-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1px solid rgba(251, 85, 29, 0.1);

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }
  }

  .bestseller-badge {
    display: inline-flex;
    align-items: center;
    background: linear-gradient(90deg, #fb551d 0%, #ff8c42 100%);
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 16px;

    i {
      margin-right: 6px;
      font-size: 14px;
    }
  }

  .category-products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .view-all-btn {
    text-align: center;
    margin-top: 40px;

    button {
      background: linear-gradient(90deg, #fb551d 0%, #ff8c42 100%);
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(251, 85, 29, 0.3);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 40px 0;

    .bestsellers-header h2 {
      font-size: 2rem;
    }

    .bestsellers-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .category-products {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }
  }
`;

const SkeletonCard = () => (
  <div className="bestseller-card">
    <Skeleton
      variant="rectangular"
      width="100%"
      height={20}
      style={{ marginBottom: '16px' }}
    />
    <div className="category-products">
      {range(4).map((index) => (
        <Skeleton key={index} variant="rectangular" width="100%" height={200} />
      ))}
    </div>
  </div>
);

const EnhancedBestSellers: React.FC = () => {
  const { t } = useTranslation();
  const { data: bestSellers, isLoading } = useSWR(
    ROUTES.getBestSellerProducts(),
    fetcherSWR
  );
  const { data: topCategories } = useSWR(
    ROUTES.getTopFurnitureCategory(),
    fetcherSWR
  );

  // Group products by category
  const groupedProducts = React.useMemo(() => {
    if (!bestSellers || !topCategories) return [];

    return topCategories.slice(0, 3).map((category: any) => {
      const categoryProducts = bestSellers
        .filter((product: any) => product.category_id === category.id)
        .slice(0, 4);

      return {
        ...category,
        products: categoryProducts,
        productCount: categoryProducts.length,
      };
    });
  }, [bestSellers, topCategories]);

  if (isLoading) {
    return (
      <BestSellersSection>
        <div className="container">
          <div className="bestsellers-header">
            <Skeleton
              variant="text"
              width={300}
              height={40}
              style={{ margin: '0 auto 16px' }}
            />
            <Skeleton
              variant="text"
              width={500}
              height={20}
              style={{ margin: '0 auto' }}
            />
          </div>
          <div className="bestsellers-grid">
            {range(3).map((index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </BestSellersSection>
    );
  }

  return (
    <BestSellersSection>
      <div className="container">
        <div className="bestsellers-header">
          <h2>{t('bestSellingProduct')}</h2>
          <p>
            Discover our most popular furniture pieces loved by thousands of
            customers
          </p>
        </div>

        <div className="bestsellers-grid">
          {groupedProducts.map((category: any) => (
            <div key={category.id} className="bestseller-card">
              <div className="bestseller-badge">
                <i className="fas fa-fire"></i>
                {category.name} Bestsellers
              </div>

              <div className="category-products">
                {category.products.map((product: any) => (
                  <CardView key={product.id} product={product} compact={true} />
                ))}
              </div>

              {category.productCount === 0 && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '40px 0',
                    color: '#666',
                  }}
                >
                  <i
                    className="fas fa-box-open"
                    style={{ fontSize: '24px', marginBottom: '10px' }}
                  ></i>
                  <p>New products coming soon!</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="view-all-btn">
          <button onClick={() => (window.location.href = '/categories')}>
            View All Best Sellers
          </button>
        </div>
      </div>
    </BestSellersSection>
  );
};

export default EnhancedBestSellers;
