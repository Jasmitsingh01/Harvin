import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../shared/fields/Input';
import Button from '../../shared/common/Button';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { productPincodeValidationSchema } from '../../validations/auth/user';
import {
  changePinCode,
  checkPincodeApiCart,
} from '../../stores/product-detail/product-action';
import { useIsPincodeEntered } from '../../stores/product-detail/product-store';

const PinCode = ({
  product_id,
  loading,
}: {
  product_id?: number;
  loading: boolean;
}): any => {
  const { t } = useTranslation();
  const [pincode, setPincode] = useState('');
  const isPincodeEnter = useIsPincodeEntered();

  useEffect(() => {
    const storedPincode = localStorage.getItem('pincode');
    if (storedPincode) {
      setPincode(storedPincode);
      checkPincodeApiCart({ product_id, postcode: Number(storedPincode) });
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(productPincodeValidationSchema),
    shouldUnregister: true,
    defaultValues: {
      pincode: '',
    },
  });

  const submitData = async (data: { pincode: any }) => {
    const { pincode } = data;
    const isValid = await trigger('pincode');
    if (isValid) {
      const payload: any = {
        product_id: product_id,
        postcode: Number(pincode),
      };
      checkPincodeApiCart(payload);
    }
  };

  const handlePincodeChange = () => {
    clearErrors('pincode');
    changePinCode();
  };

  return (
    <>
      <h4 className="delivering-text text-16 weight-600">
        {t('deliveringTo')}
      </h4>
      <div className="change-pincode-wrap d-flex align-items-center">
        <form onSubmit={handleSubmit(submitData)}>
          <div className="pincode-inputcart">
            <div>
              <Input
                type={'text'}
                name={'pincode'}
                register={register}
                control={control}
                placeholder={t('enterPinCode')}
                className={'form-control'}
                setValue={setValue}
                value={pincode}
                maxLength={6}
                onChange={(name, value) => {
                  setPincode(value);
                  handlePincodeChange();
                }}
              />
            </div>
            {isPincodeEnter ? (
              <a
                onClick={() => {
                  reset({
                    pincode: '',
                  });
                  setPincode('');
                  setValue('pincode', '');
                  handlePincodeChange();
                }}
                className={'text-16 weight-500 text-theme btn'}
                style={{ margin: 'auto' }}
              >
                Change
              </a>
            ) : (
              <Button
                className={'text-16 weight-500 text-theme'}
                text={loading ? 'Checking...' : 'Change'}
                disabled={loading}
                type="submit"
              />
            )}
          </div>
          <span
            // href=""
            className=" locate-text text-16 weight-500 text-theme"
          >
            <i className="fa-light fa-location-dot"></i>
            {t('locate')}
          </span>
        </form>
      </div>
      <div>
        {errors && (
          <p className="text-danger mt-2">
            {t((errors?.pincode as any)?.message)}
          </p>
        )}
      </div>
    </>
  );
};

export default PinCode;
