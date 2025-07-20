import * as React from 'react';
//  import img from '../../assets/images/pr'
import img from '../../assets/images/product-multiple-img-2.png';
import coupon from '../../assets/images/discount-coupon.jpg';

import ProgressiveImage from '../../shared/progressive-image';
// import Image from 'next/image';
// import Slider from './slider';
// import { useTranslation } from 'react-i18next';
import { getAllProducts } from '../../stores/home-actions';
import ImageList from '../product-detail-page/CombinationList';
import LeftSideImageGallery from '../product-detail-page/LeftSideImageGallery';
import { Rating } from '@mui/material';
import BottomProductList from '../product-detail-page/BottomProductList';
import BreadCrumbs from '../../shared/breadcrumbs';
import ToggelSideBarNav from '../product-detail-page/sidebar-dropdown';

// import CardView from '../../shared/cards';
// import { convertIstToUtc, priceWithCurrency } from '../../utilities/helper';

const Product = () => {
  // const { t } = useTranslation()
  React.useEffect(() => {
    getAllProducts();
  }, []);

  // const { title, description, image, price } = props;
  return (
    <main>
      <BreadCrumbs />
      <section className="product-detail-section">
        <div className="container">
          <div className="row">
            <LeftSideImageGallery img={img} />
            <div className="col-md-6">
              <div className="product-detail-right">
                <h3 className="product-name text-26 weight-600">
                  Vanisa 3 Seater Living Room Sofa With 2 Arm Chairs And 6
                  Cushions
                </h3>
                <div className="product-rating-review-wrap d-flex align-items-center">
                  <Rating />
                  <div className="product-wishlist-share d-flex align-items-center">
                    <i className="fa-sharp fa-regular fa-heart"></i>
                    <span className="wishlist-text text-14 weight-500 ml-2">
                      Add to wishlist
                    </span>
                  </div>
                  <div className="product-wishlist-share d-flex align-items-center">
                    <i className="fa-sharp fa-light fa-share-nodes"></i>
                    <span className="share-text text-14 weight-500">
                      Share this Product
                    </span>
                  </div>
                </div>
                <div className="product-prize-wrap">
                  <div className="product-prize">
                    <h4 className="product-old-prize text-16 weight-500 mb-0">
                      ₹17,550
                    </h4>
                    <h3 className="product-new-prize text-26 weight-600 mb-0">
                      ₹13,657
                    </h3>
                    <p className="product-off mb-0">38% OFF</p>
                  </div>
                  <div className="discount-coupon-img">
                    <ProgressiveImage src={coupon} alt="" className="w-100" />
                  </div>
                </div>
                <div className="fabric-storage-wrap">
                  <ImageList />
                </div>
                <div className="pincode-wrap d-flex align-items-center mt-4">
                  <span className="text-16 weight-600">Delivery</span>
                  <div className="pincode-input">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter Pincode"
                    />
                    <button className="text-16 weight-500 text-theme">
                      Check
                    </button>
                  </div>
                </div>
                <p className="pincode-text">
                  Enter your pincode to instantly check delivery charges and
                  shipping details.
                </p>
                <div className="quantity-price d-flex justify-content-between align-items-center">
                  <div className="quantity-wrap d-flex align-items-center">
                    <span className="text-16 weight-600">Quantity</span>
                    <div className="quantity">
                      <button>-</button>
                      <input
                        type="text"
                        className="quantity-num"
                        placeholder="2"
                      />
                      <button>+</button>
                    </div>
                  </div>
                  <div className="price d-flex align-items-center">
                    <h4 className="mb-0 text-16 weight-600">Total Price:</h4>
                    <span className="price-num text-24 weight-600">27,964</span>
                  </div>
                </div>
                <div className="add-buy-btn-wrap">
                  <button className="btn add-to-cart-btn">
                    <i className="fa-regular fa-plus"></i>Add To Cart
                  </button>
                  <button className="btn buy-now-btn">
                    <i className="fa-solid fa-bolt"></i>Buy Now
                  </button>
                </div>
                {/* ------------------------sidebar start------------- */}
                <ToggelSideBarNav />
              </div>
            </div>
          </div>
        </div>
      </section>
      <BottomProductList />
    </main>
  );
};

export default Product;
