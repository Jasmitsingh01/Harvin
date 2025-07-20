import React from 'react';
import Input from '../../shared/fields/Input';
import {
  useSelectedProductCombination,
  useValidationLoading,
} from '../../stores/product-detail/product-store';
import { getValidateProduct } from '../../stores/product-detail/product-action';

const QuantityButton = ({ error }: any) => {
  const selectedProductCombination = useSelectedProductCombination();
  const { selectQuantity, minimum_quantity } = selectedProductCombination;
  const loading = useValidationLoading();

  const handleChange = (event: any) => {
    const { value } = event.target;
    getValidateProduct(selectedProductCombination, Number(value));
  };
  const handleUpdate = (value: number) => {
    const quantity = selectQuantity || minimum_quantity || 1;
    getValidateProduct(selectedProductCombination, quantity + value);
  };

  return (
    <div className="quantity">
      <button
        disabled={loading || selectQuantity < minimum_quantity || !!error}
        onClick={() => handleUpdate(-1)}
      >
        -
      </button>
      <Input
        type="text"
        value={selectQuantity || minimum_quantity || 1}
        defaultValue={selectQuantity || minimum_quantity}
        onChange={handleChange}
        className="quantity-num"
        disabled={loading || !!error}
      />
      <button disabled={loading} onClick={() => handleUpdate(1)}>
        +
      </button>
      <div className={`quantityloader ${loading && 'show'}`} />
    </div>
  );
};

export default QuantityButton;
