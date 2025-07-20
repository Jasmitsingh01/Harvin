import React from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';
import CardView from '../../shared/cards';
import { Skeleton } from '@mui/material';
import { range } from 'lodash';
import styled from 'styled-components';

const NewArrivalsSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #fb551d 50%,
      transparent 100%
    );
  }

  .arrivals-header {
    text-align: center;
    margin-bottom: 60px;

    .new-badge {
      display: inline-flex;
      align-items: center;
      background: linear-gradient(90deg, #28a745 0%, #20c997 100%);
      color: white;
      padding: 8px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 20px;

      i {
        margin-right: 8px;
        font-size: 16px;
      }
    }

    h2 {
      font-size: 2.8rem;
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
        width: 100px;
        height: 4px;
        background: linear-gradient(90deg, #28a745 0%, #20c997 100%);
        border-radius: 2px;
      }
    }

    p {
      font-size: 1.2rem;
      color: #666;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  .arrivals-timeline {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, #28a745 0%, #20c997 100%);
      transform: translateX(-50%);
    }
  }

  .arrival-item {
    display: flex;
    align-items: center;
    margin-bottom: 80px;
    position: relative;

    &:nth-child(even) {
      flex-direction: row-reverse;

      .arrival-content {
        text-align: right;
        margin-right: 0;
        margin-left: 60px;
      }

      .arrival-products {
        margin-left: 0;
        margin-right: 60px;
      }
    }

    .timeline-marker {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      border-radius: 50%;
      border: 4px solid white;
      box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
      z-index: 2;
    }
  }

  .arrival-content {
    flex: 1;
    margin-right: 60px;

    .arrival-badge {
      display: inline-flex;
      align-items: center;
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
      padding: 6px 14px;
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

    h3 {
      font-size: 1.8rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 12px;
    }

    p {
      color: #666;
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .arrival-stats {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;

      .stat-item {
        text-align: center;

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #28a745;
          display: block;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }
  }

  .arrival-products {
    flex: 1;
    margin-left: 60px;

    .products-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  }

  .featured-arrival {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 20px;
    padding: 40px;
    margin: 60px 0;
    color: white;
    text-align: center;
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>')
        repeat;
      background-size: 30px 30px;
      animation: float 20s linear infinite;
    }

    .featured-content {
      position: relative;
      z-index: 2;

      h3 {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 16px;
      }

      p {
        font-size: 1.1rem;
        margin-bottom: 30px;
        opacity: 0.9;
      }

      .featured-btn {
        background: white;
        color: #28a745;
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
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @media (max-width: 768px) {
    padding: 60px 0;

    .arrivals-header h2 {
      font-size: 2.2rem;
    }

    .arrivals-timeline:before {
      display: none;
    }

    .arrival-item {
      flex-direction: column !important;
      text-align: center !important;
      margin-bottom: 60px;

      &:nth-child(even) .arrival-content {
        margin-left: 0;
        margin-right: 0;
        text-align: center;
      }

      .arrival-content {
        margin-right: 0;
        margin-bottom: 30px;
      }

      .arrival-products {
        margin-left: 0;
        margin-right: 0;
      }

      .timeline-marker {
        display: none;
      }

      .products-grid {
        grid-template-columns: 1fr;
      }

      .arrival-stats {
        justify-content: center;
      }
    }

    .featured-arrival {
      padding: 30px 20px;

      .featured-content h3 {
        font-size: 1.8rem;
      }
    }
  }
`;

const SkeletonArrival = () => (
  <div className="arrival-item">
    <div className="arrival-content">
      <Skeleton
        variant="rectangular"
        width={100}
        height={20}
        style={{ marginBottom: '16px' }}
      />
      <Skeleton
        variant="text"
        width="80%"
        height={30}
        style={{ marginBottom: '12px' }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={20}
        style={{ marginBottom: '20px' }}
      />
      <div style={{ display: 'flex', gap: '20px' }}>
        {range(3).map((index) => (
          <Skeleton key={index} variant="rectangular" width={60} height={40} />
        ))}
      </div>
    </div>
    <div className="arrival-products">
      <div className="products-grid">
        {range(4).map((index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={200}
          />
        ))}
      </div>
    </div>
  </div>
);

const EnhancedNewArrivals: React.FC = () => {
  const { t } = useTranslation();
  const { data: newArrivals, isLoading } = useSWR(
    ROUTES.getNewArrival(),
    fetcherSWR
  );
  const { data: topCategories } = useSWR(
    ROUTES.getTopFurnitureCategory(),
    fetcherSWR
  );

  // Group new arrivals by categories
  const categorizedArrivals = React.useMemo(() => {
    if (!newArrivals || !topCategories) return [];

    return topCategories.slice(0, 3).map((category: any, index: number) => {
      const categoryProducts = newArrivals
        .filter((product: any) => product.category_id === category.id)
        .slice(0, 4);

      return {
        ...category,
        products: categoryProducts,
        productCount: categoryProducts.length,
        badge:
          index === 0 ? 'Just Arrived' : index === 1 ? 'This Week' : 'Latest',
      };
    });
  }, [newArrivals, topCategories]);

  if (isLoading) {
    return (
      <NewArrivalsSection>
        <div className="container">
          <div className="arrivals-header">
            <Skeleton
              variant="rectangular"
              width={120}
              height={30}
              style={{ margin: '0 auto 20px' }}
            />
            <Skeleton
              variant="text"
              width={400}
              height={40}
              style={{ margin: '0 auto 16px' }}
            />
            <Skeleton
              variant="text"
              width={600}
              height={20}
              style={{ margin: '0 auto' }}
            />
          </div>
          <div className="arrivals-timeline">
            {range(3).map((index) => (
              <SkeletonArrival key={index} />
            ))}
          </div>
        </div>
      </NewArrivalsSection>
    );
  }

  return (
    <NewArrivalsSection>
      <div className="container">
        <div className="arrivals-header">
          <div className="new-badge">
            <i className="fas fa-sparkles"></i>
            Fresh Arrivals
          </div>
          <h2>{t('newAtHarvin')}</h2>
          <p>
            Explore the latest furniture collections designed to transform your
            living spaces with style and comfort
          </p>
        </div>

        <div className="arrivals-timeline">
          {categorizedArrivals.map((category: any, index: number) => (
            <div key={category.id} className="arrival-item">
              <div className="timeline-marker"></div>

              <div className="arrival-content">
                <div className="arrival-badge">
                  <i className="fas fa-star"></i>
                  {category.badge}
                </div>
                <h3>{category.name} Collection</h3>
                <p>
                  Discover our newest {category.name.toLowerCase()} designs that
                  blend contemporary aesthetics with exceptional comfort and
                  durability.
                </p>
                <div className="arrival-stats">
                  <div className="stat-item">
                    <span className="stat-number">{category.productCount}</span>
                    <span className="stat-label">New Items</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{index + 1}st</span>
                    <span className="stat-label">This Week</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">4.8★</span>
                    <span className="stat-label">Rating</span>
                  </div>
                </div>
              </div>

              <div className="arrival-products">
                <div className="products-grid">
                  {category.products.slice(0, 4).map((product: any) => (
                    <CardView
                      key={product.id}
                      product={product}
                      compact={true}
                    />
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
                      className="fas fa-clock"
                      style={{ fontSize: '24px', marginBottom: '10px' }}
                    ></i>
                    <p>New arrivals coming soon!</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="featured-arrival">
          <div className="featured-content">
            <h3>🎉 Weekly New Arrivals</h3>
            <p>
              Be the first to discover our latest furniture collections. New
              products added every week!
            </p>
            <button
              className="featured-btn"
              onClick={() => (window.location.href = '/categories')}
            >
              Explore All New Arrivals
            </button>
          </div>
        </div>
      </div>
    </NewArrivalsSection>
  );
};

export default EnhancedNewArrivals;
