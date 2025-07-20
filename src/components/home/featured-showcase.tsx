import React, { useState } from 'react';
import useSWR from 'swr';
import ROUTES from '../../utilities/api-routes';
import { fetcherSWR } from '../../services/api';
import CardView from '../../shared/cards';
import { Skeleton } from '@mui/material';
import { range } from 'lodash';
import styled from 'styled-components';

const FeaturedShowcaseSection = styled.section`
  padding: 80px 0;
  background: white;
  color: #333;
  position: relative;

  .showcase-header {
    text-align: center;
    margin-bottom: 60px;

    .featured-badge {
      display: inline-flex;
      align-items: center;
      background: #fb551d;
      color: white;
      padding: 10px 24px;
      border-radius: 25px;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 24px;

      i {
        margin-right: 8px;
        font-size: 16px;
      }
    }

    h2 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 20px;
      color: #333;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 3px;
        background: #fb551d;
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

  .category-tabs {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 50px;
    flex-wrap: wrap;

    .tab-button {
      background: #f8f9fa;
      border: 1px solid #ddd;
      color: #666;
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #fb551d;
        border-color: #fb551d;
        color: white;
      }

      &.active {
        background: #fb551d;
        border-color: #fb551d;
        color: white;
      }
    }
  }

  .featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 50px;
  }

  .featured-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      border-color: #fb551d;
    }

    /* Product headings styling */
    .product-item .product-detail .product-name,
    .product-item .product-detail .compact-name {
      color: #333 !important;
      font-weight: 600 !important;
      line-height: 1.4 !important;
      margin-bottom: 12px !important;
    }

    /* Price styling */
    .product-item .product-detail .product-price-wrap {
      .new-price {
        color: #fb551d !important;
        font-weight: 700 !important;
        font-size: 16px !important;
      }

      .old-price {
        color: #999 !important;
        font-size: 13px !important;
      }

      .discount {
        background: #4caf4f !important;
        color: white !important;
        font-size: 11px !important;
        padding: 3px 8px !important;
        border-radius: 4px !important;
        font-weight: 600 !important;
      }
    }

    /* Product image styling */
    .product-item .product-img {
      border-radius: 8px !important;
      overflow: hidden !important;

      img {
        transition: transform 0.3s ease !important;
      }

      &:hover img {
        transform: scale(1.05) !important;
      }
    }
  }

  .stats-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    margin-top: 60px;

    .stat-card {
      text-align: center;
      padding: 30px 20px;
      background: white;
      border-radius: 12px;
      border: 1px solid #e0e0e0;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      &:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        border-color: #fb551d;
      }

      .stat-icon {
        font-size: 2.5rem;
        color: #fb551d;
        margin-bottom: 16px;
      }

      .stat-number {
        font-size: 2.2rem;
        font-weight: 700;
        color: #333;
        margin-bottom: 8px;
        display: block;
      }

      .stat-label {
        font-size: 0.9rem;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 500;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 60px 0;

    .showcase-header {
      margin-bottom: 40px;

      .featured-badge {
        padding: 8px 16px;
        font-size: 12px;
        margin-bottom: 16px;
      }

      h2 {
        font-size: 2.2rem;
        margin-bottom: 16px;

        &:after {
          width: 60px;
          height: 3px;
        }
      }

      p {
        font-size: 1rem;
        padding: 0 20px;
      }
    }

    .category-tabs {
      gap: 8px;
      margin-bottom: 30px;
      padding: 0 20px;

      .tab-button {
        padding: 10px 16px;
        font-size: 12px;
        min-width: auto;
        flex: 1;
      }
    }

    .featured-grid {
      grid-template-columns: 1fr;
      gap: 20px;
      margin-bottom: 40px;
    }

    .featured-card {
      margin: 0 10px;
      padding: 16px;

      .product-item .product-detail .product-name,
      .product-item .product-detail .compact-name {
        font-size: 14px !important;
        line-height: 1.3 !important;
      }

      .product-item .product-detail .product-price-wrap {
        .new-price {
          font-size: 14px !important;
        }
      }
    }

    .stats-section {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-top: 40px;

      .stat-card {
        padding: 20px 15px;

        .stat-icon {
          font-size: 2rem;
          margin-bottom: 12px;
        }

        .stat-number {
          font-size: 1.8rem;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 0.8rem;
          letter-spacing: 0.5px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .showcase-header h2 {
      font-size: 2rem;
    }

    .category-tabs {
      .tab-button {
        padding: 10px 16px;
        font-size: 12px;
      }
    }

    .stats-section {
      .stat-card {
        padding: 20px 12px;

        .stat-icon {
          font-size: 2rem;
        }

        .stat-number {
          font-size: 1.8rem;
        }
      }
    }
  }
`;

const SkeletonFeatured = () => (
  <div className="featured-card">
    <Skeleton
      variant="rectangular"
      width="100%"
      height={200}
      style={{ marginBottom: '16px', backgroundColor: 'rgba(255,255,255,0.1)' }}
    />
  </div>
);

const FeaturedShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: bestSellers, isLoading: loadingBest } = useSWR(
    ROUTES.getBestSellerProducts(),
    fetcherSWR
  );
  const { data: newArrivals, isLoading: loadingNew } = useSWR(
    ROUTES.getNewArrival(),
    fetcherSWR
  );
  const { data: topCategories, isLoading: loadingCategories } = useSWR(
    ROUTES.getTopFurnitureCategory(),
    fetcherSWR
  );

  const isLoading = loadingBest || loadingNew || loadingCategories;

  // Combine and filter products based on active category
  const featuredProducts = React.useMemo(() => {
    if (!bestSellers || !newArrivals) return [];

    const allProducts = [...(bestSellers || []), ...(newArrivals || [])];

    if (activeCategory === 'all') {
      return allProducts.slice(0, 8);
    }

    return allProducts
      .filter((product) => product.category_id === parseInt(activeCategory))
      .slice(0, 8);
  }, [bestSellers, newArrivals, activeCategory]);

  const categories = React.useMemo(() => {
    if (!topCategories) return [];
    return [
      { id: 'all', name: 'All Products' },
      ...topCategories
        .slice(0, 4)
        .map((cat: any) => ({ id: cat.id.toString(), name: cat.name })),
    ];
  }, [topCategories]);

  const stats = [
    { icon: 'fas fa-award', number: '500+', label: 'Featured Products' },
    { icon: 'fas fa-users', number: '50K+', label: 'Happy Customers' },
    { icon: 'fas fa-star', number: '4.8', label: 'Average Rating' },
    { icon: 'fas fa-shipping-fast', number: '24h', label: 'Fast Delivery' },
  ];

  if (isLoading) {
    return (
      <FeaturedShowcaseSection>
        <div className="container">
          <div className="showcase-header">
            <Skeleton
              variant="rectangular"
              width={150}
              height={35}
              style={{
                margin: '0 auto 24px',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            />
            <Skeleton
              variant="text"
              width={400}
              height={50}
              style={{
                margin: '0 auto 20px',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            />
            <Skeleton
              variant="text"
              width={600}
              height={25}
              style={{
                margin: '0 auto',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            />
          </div>
          <div className="featured-grid">
            {range(8).map((index) => (
              <SkeletonFeatured key={index} />
            ))}
          </div>
        </div>
      </FeaturedShowcaseSection>
    );
  }

  return (
    <FeaturedShowcaseSection>
      <div className="container">
        <div className="showcase-header">
          <div className="featured-badge">
            <i className="fas fa-crown"></i>
            Featured Collection
          </div>
          <h2>Premium Furniture Showcase</h2>
          <p>
            Handpicked exceptional pieces that represent the pinnacle of design,
            comfort, and craftsmanship
          </p>
        </div>

        <div className="category-tabs">
          {categories.map((category: any) => (
            <button
              key={category.id}
              className={`tab-button ${
                activeCategory === category.id ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="featured-grid">
          {featuredProducts.map((product: any) => (
            <div key={product.id} className="featured-card">
              <CardView product={product} compact={true} />
            </div>
          ))}
        </div>

        {featuredProducts.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#666',
              gridColumn: '1 / -1',
              background: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '20px',
                color: '#fb551d',
              }}
            >
              <i className="fas fa-search"></i>
            </div>
            <h3
              style={{
                marginBottom: '12px',
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#333',
              }}
            >
              No products found
            </h3>
            <p
              style={{
                fontSize: '1rem',
                maxWidth: '400px',
                margin: '0 auto',
                lineHeight: '1.5',
                color: '#666',
              }}
            >
              Try selecting a different category or check back later for new
              arrivals.
            </p>
          </div>
        )}

        <div className="stats-section">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-icon">
                <i className={stat.icon}></i>
              </div>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </FeaturedShowcaseSection>
  );
};

export default FeaturedShowcase;
