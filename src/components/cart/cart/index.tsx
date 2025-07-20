import React from 'react';
import CartProduct from '../../../shared/cart/Cart';
import { useTranslation } from 'react-i18next';
// import { cartProducts } from '../../../shared/footer/footerData';
import { useCartStore, useStepLoading } from '../../../stores/cart/cart-store';
import {
  // calcuLateAssemblyCharges,
  // calculateDiscount,
  // calculateMainTotal,
  // calculateTotal,
  proceedToAddAddress,
} from '../../../stores/cart/cart-action';
import Button from '../../../shared/common/Button';
import { isUserLoggedIn } from '../../../utilities/helper';
import PriceSummery from './PriceSummery';

const CartBlock = () => {
  // const [showCouponList, setShowCouponList] = useState<boolean>(false);
  const { t } = useTranslation();
  const loading = useStepLoading();
  const { cartItems } = useCartStore();

  // const { codeCheckLoadingCart, pincodeErrorCart, pincodeSuccessCart } =
  //   useProductDetailValidate();

  // const productIds = cartItems.map((item) => item.product_id).join(',');

  // const success = useMemo(() => {
  //   return pincodeSuccessCart;
  // }, [pincodeSuccessCart]);

  // const error = useMemo(() => {
  //   return pincodeErrorCart;
  // }, [pincodeErrorCart]);

  return (
    <div className="cart-wrap">
      <div className="row">
        <div className="col-md-7 cart-left">
          <div className="cart-product-wrap">
            <div className="cart-heading">
              <h2 className="text-26 weight-600">
                {t('yourCart')} ({cartItems?.length})
              </h2>
            </div>
            {cartItems?.map((item: { name: any }) => {
              return <CartProduct product={item} key={item?.name} />;
            })}
          </div>
        </div>
        <div className="col-md-5 cart-right">
          <div className="total-amount-wrap">
            {/* <div className="delivery-pincode">
             
              <PinCode product_id={productIds} loading={codeCheckLoadingCart} />
              {error && <p className="product-error">{error}</p>}
              {success && <p className="product-success">{success}</p>}
            </div> */}

            <PriceSummery
              cartItems={cartItems}
              t={t}
              text={'cartSummary'}
              showGST={false}
            />
            <Button
              onClick={proceedToAddAddress}
              className="btn btn-theme proceed-btn"
              text={
                isUserLoggedIn()
                  ? t('proceedToAddAddress')
                  : t('proceedToLogin')
              }
              loading={loading}
            >
              <i className="fa-sharp fa-regular fa-arrow-right-long"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBlock;
