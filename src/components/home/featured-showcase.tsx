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
  color: #333;3
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
  const [activeCategory, setActiveCategory] = useState('1'); // Start with Sofas (ID: 1)

  // Fetch categories first
  const { data: categoriesData, isLoading: loadingCategories, error: errorCategories } = useSWR(
    ROUTES.getTopFurnitureCategory(),
    fetcherSWR,
    { 
      revalidateOnFocus: false,
      errorRetryCount: 1,
      onError: (err) => {
        console.warn('Failed to fetch categories:', err);
      }
    }
  );

  // Fetch category details (which includes children) for the active category
  const { data: categoryDetails, isLoading: loadingCategoryDetails, error: errorCategoryDetails } = useSWR(
    activeCategory ? ROUTES.getFeaturedProducts(activeCategory) : null,
    fetcherSWR,
    { 
      revalidateOnFocus: false,
      errorRetryCount: 1,
      onError: (err) => {
        console.warn('Failed to fetch category details:', err);
      }
    }
  );

  const isLoading = loadingCategories || loadingCategoryDetails;
  const hasApiError = errorCategories || errorCategoryDetails;

  // Prepare categories for tabs
  const categories = React.useMemo(() => {
    // If there's an API error, show fallback categories with the specific IDs
    if (hasApiError) {
      return [
        { id: '1', name: 'Sofas', slug: 'sofas' },
        { id: '2', name: 'Chairs', slug: 'chairs' },
        { id: '3', name: 'Table', slug: 'table' },
        { id: '4', name: 'Wardrobe', slug: 'wardrobe' },
        { id: '6', name: 'Pooja Cabinet', slug: 'pooja-cabinet' },
        { id: '7', name: 'Bed', slug: 'bed' },
        { id: '8', name: 'Outdoor Furniture', slug: 'outdoor-furniture' },
        { id: '52', name: 'L Shape Sofa', slug: 'l-shape-sofa' },
        { id: '51', name: 'Sofa cum Bed', slug: 'sofa-cum-bed' },
        { id: '61', name: 'Dining Table', slug: 'dining-table' },
        { id: '58', name: 'Sale Offer', slug: 'sale-offer' },
        { id: '65', name: 'Monsoon Sale Offer', slug: 'monsoon-sale-offer' }
      ];
    }

    // Use real category data from API, but filter to only include the specific IDs
    if (Array.isArray(categoriesData)) {
      const specificCategoryIds = ['1', '2', '3', '4', '6', '7', '8', '49', '51', '61', '58', '65'];
      
      const categoryOptions = categoriesData
        .filter((cat: any) => specificCategoryIds.includes(cat.id?.toString()))
        .slice(0, 8) // Limit to 8 categories for better UX
        .map((cat: any) => ({
          id: cat.id?.toString(),
          name: cat.name,
          slug: cat.slug
        }))
        .filter(cat => cat.id && cat.name); // Filter out invalid entries

      return categoryOptions;
    }

    return [];
  }, [categoriesData, hasApiError]);

  // Handle category tab click
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // Get products to display from category children
  const productsToDisplay = React.useMemo(() => {
    // If there's an API error, show fallback products
    if (hasApiError) {
      return [
        {
          id: 1,
          name: 'Premium Sofa Set',
          price: 29999,
          original_price: 35999,
          image: '/images/chester-sofa.png',
          category_id: '1',
          slug: 'premium-sofa-set',
          isCategory: true
        },
        {
          id: 2,
          name: 'Modern Dining Table',
          price: 15999,
          original_price: 19999,
          image: '/images/chester-sofa.png',
          category_id: '2',
          slug: 'modern-dining-table',
          isCategory: true
        },
        {
          id: 3,
          name: 'Comfortable Bed Frame',
          price: 22499,
          original_price: 26999,
          image: '/images/chester-sofa.png',
          category_id: '3',
          slug: 'comfortable-bed-frame',
          isCategory: true
        },
        {
          id: 4,
          name: 'Elegant Wardrobe',
          price: 19099,
          original_price: 22999,
          image: '/images/chester-sofa.png',
          category_id: '4',
          slug: 'elegant-wardrobe',
          isCategory: true
        }
      ];
    }

    // Return children from category details as products
    if (categoryDetails && categoryDetails.children && Array.isArray(categoryDetails.children)) {
      return categoryDetails.children
        .filter((child: any) => child.enabled === 1) // Only show enabled categories
        .slice(0, 8) // Limit to 8 products
        .map((child: any) => ({
          id: child.id,
          name: child.name,
          slug: child.slug,
          image: child.icon?.url || child.image?.url || '/images/chester-sofa.png',
          category_id: child.parent,
          isCategory: true, // Mark as category for proper routing
          // Add some sample pricing for display
          price: Math.floor(Math.random() * 20000) + 10000, // Random price between 10k-30k
          original_price: Math.floor(Math.random() * 25000) + 15000, // Random original price
          gallery: child.icon?.url ? [{ original: child.icon.url }] : [],
          product_combination_short: [{
            price: Math.floor(Math.random() * 20000) + 10000,
            original_price: Math.floor(Math.random() * 25000) + 15000
          }]
        }));
    }

    return [];
  }, [categoryDetails, hasApiError]);

  console.log(productsToDisplay, 'featuredProductstest');

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

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="category-tabs">
            {categories.map((category: any) => (
              <button
                key={category.id}
                className={`tab-button ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Featured Products Grid */}
        <div className="featured-grid">
          {productsToDisplay.map((product: any) => (
            <div key={product.id} className="featured-card">
              <CardView product={product} compact={true} />
            </div>
          ))}
        </div>

        {/* No Products Found Message */}
        {productsToDisplay.length === 0 && !hasApiError && (
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

        {/* API Error Message */}
        {hasApiError && (
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              color: '#666',
              gridColumn: '1 / -1',
              background: '#fff3cd',
              borderRadius: '12px',
              border: '1px solid #ffeaa7',
              marginBottom: '20px',
            }}
          >
            <p
              style={{
                fontSize: '0.9rem',
                margin: '0',
                color: '#856404',
              }}
            >
              <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
              Showing sample products. API connection may be temporarily unavailable.
            </p>
          </div>
        )}

        {/* Stats Section */}
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
