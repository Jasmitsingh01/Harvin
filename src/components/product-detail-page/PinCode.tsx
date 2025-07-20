import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../shared/fields/Input';
import Button from '../../shared/common/Button';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { productPincodeValidationSchema } from '../../validations/auth/user';
import {
  changePinCode,
  checkPincodeApi,
} from '../../stores/product-detail/product-action';
import {
  useIsPincodeEntered,
  usePincodeBasedPrice,
} from '../../stores/product-detail/product-store';

const PinCode = ({
  product_id,
  loading,
}: {
  product_id: number;
  loading: boolean;
}): any => {
  const { t } = useTranslation();

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
  const isPincodeEnter = useIsPincodeEntered();
  const { isPincodePriceAvailable } = usePincodeBasedPrice();
  const [state, setState] = useState('');
  const submitData = async (data: { pincode: any }) => {
    const { pincode } = data;

    const isValid = await trigger('pincode');
    if (isValid) {
      const payload: any = {
        product_id: Number(product_id),
        postcode: Number(pincode),
      };

      checkPincodeApi(payload);
    }
  };

  const handlePincodeChange = () => {
    clearErrors('pincode');
    changePinCode();
  };

  useEffect(() => {
    setValue('pincode', state);
  }, [state]);

  return (
    <>
      <div className="pincode-wrap d-flex align-items-center mt-4">
        <span className="text-16 weight-600">{t('delivery')}</span>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="pincode-input">
            <div>
              <Input
                type={'text'}
                name={'pincode'}
                register={register}
                control={control}
                // pattern="\d*"
                // inputMode="numeric"
                // errors={errors}
                placeholder={t('enterPinCode')}
                className={'form-control'}
                setValue={setValue}
                value={state}
                maxLength={6}
                onChange={(name, value) => {
                  setState(value);
                  handlePincodeChange();
                }}
                // onChange={handlePincodeChange}
              />
            </div>
            {isPincodeEnter ? (
              <a
                onClick={() => {
                  reset({
                    pincode: '',
                  });
                  setState('');
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
                text={loading ? 'Checking...' : 'Check'}
                disabled={loading}
                type="submit"
              />
            )}
          </div>
        </form>
      </div>
      <div>
        {errors && (
          <p className="text-danger mt-2">
            {t((errors?.pincode as any)?.message)}
          </p>
        )}
      </div>

      <div>
        <p className="pincode-text">{t('enterPinckToInstantlyCheck')}</p>
        {isPincodePriceAvailable && (
          <p
            className="pincode-availability"
            style={{
              fontSize: '12px',
              color: '#28a745',
              marginTop: '5px',
              fontWeight: '500',
            }}
          >
            ✓ Product available at this pincode
          </p>
        )}
      </div>
    </>
  );
};

export default PinCode;
