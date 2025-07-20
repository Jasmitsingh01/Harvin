import React, { useEffect } from 'react';
import { AddressStyled } from './styled';
import { useTranslation } from 'react-i18next';
// import Input from '../../../shared/fields/Input';
// import PrizeSummry from '../../../shared/cart/PrizeSummry';
// import OrderDetail from './OrderDetail';
import OrderPrize from './right-side/OrderPrize';
import { userAddressField } from '../../../shared/fields/field-data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import Button from '../../../shared/common/Button';
import { userAddressValidationSchemas } from '../../../validations/card/address';
import {
  addUserAddressAction,
  updateUserAddressAction,
} from '../../../stores/user/user-action';

import { useAddressLoading } from '../../../stores/user/user-store';

import AddressList from './address-list';
import { isBoolean, toNumber } from 'lodash';

import {
  useAddressListView,
  useCartStore,
  useGetAllStates,
  useMeData,
  useUpdateUserAddressDetail,
} from '../../../stores/cart/cart-store';
import {
  addressListViewFlag,
  createCartAddress,
  createSelectedCartAddress,
  getAllStates,
  getUserDetailFromMe,
  updateAddressAction,
  updateTab,
} from '../../../stores/cart/cart-action';
import { isEmpty } from 'lodash';
import MyAddressSkeleton from './AddressSkeleton';
// import RadioOption from '../../../shared/fields/RadioGroup';
import TextInput from '../../../shared/fields/TextInput';
import AutocompleteSelect from '../../../shared/fields/AutoCompleteSelect';
import { useRouter } from 'next/router';

const AddressBlock = () => {
  const { t } = useTranslation();
  const { deleteAddressLoading } = useCartStore();
  const { addressListView } = useAddressListView();
  const { meData, meLoading } = useMeData();
  const { updateAddress, updateAddressFlag } = useUpdateUserAddressDetail();
  const { addressLoading } = useAddressLoading();
  const { states, loading } = useGetAllStates();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(userAddressValidationSchemas),
    shouldUnregister: false,
  });

  useEffect(() => {
    if (updateAddress === null) {
      reset();
    } else {
      Object?.keys(updateAddress)?.forEach((key) => {
        if (key === 'is_service_lift') {
          const value = updateAddress[key] === 1 ? true : false;
          setValue(key, String(value));
        } else {
          setValue(key, updateAddress[key]);
        }
      });
    }
  }, [setValue, updateAddress, reset, updateAddressFlag]);
  const { cartItems, selectedAddress, selectedProduct } = useCartStore();

  const router = useRouter();
  const handleAddress = (values: any) => {
    values.is_service_lift = isBoolean(values.is_service_lift)
      ? toNumber(values.is_service_lift)
      : values.is_service_lift;
    if (addressListView) {
      if (router.pathname.includes('/cart')) {
        createCartAddress(cartItems, selectedAddress);
      } else {
        createSelectedCartAddress(selectedProduct, selectedAddress);
      }

      // updateTab(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (!updateAddress) {
      addUserAddressAction(values);
      // createCartAddress(cartItems,selectedAddress);
    } else {
      updateUserAddressAction(values);
    }
  };
  useEffect(() => {
    getUserDetailFromMe();
  }, [deleteAddressLoading, meLoading, addressLoading]);

  const handleAddressList = () => {
    if (!isEmpty(meData?.address)) {
      updateAddressAction(null);
      addressListViewFlag(true);
    } else {
      if (router.pathname.includes('/cart')) {
        updateTab(0);
      } else {
        updateTab(1);
      }
    }
  };

  useEffect(() => {
    addressListViewFlag(true);
    updateAddressAction(null);
    getAllStates();
  }, []);
  return (
    <AddressStyled className="cart-address-wrap">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 cart-address-left">
            <div className="delivery-address-wrap">
              {/* {addressListView ? }  */}
              {meLoading ? (
                <MyAddressSkeleton />
              ) : !addressListView ||
                isEmpty(meData?.address) ||
                updateAddress ? (
                <>
                  <div className="cart-heading d-flex">
                    <span className="me-3 mt-1">
                      <i
                        onClick={handleAddressList}
                        className="fa-regular fa-arrow-left-long"
                      ></i>
                    </span>
                    <h2 className="text-26 weight-600">
                      {t('deliveryAddress')}
                    </h2>
                  </div>
                  <div className="row">
                    {userAddressField?.map((field) => {
                      return (
                        <div className={field?.className} key={field?.name}>
                          <div className="form-group">
                            <label className="form-label">
                              {t(field?.label)} {field?.required && '*'}
                            </label>
                            {field.type === 'radio' && (
                              <div className={field?.className}>
                                {/* <p>({t(field?.note)})</p> */}
                                {/* {field.options.map((option) => (
                                  <div
                                    key={option.value}
                                    className="form-check form-check-inline"
                                  >
                                    <RadioOption
                                      name={field.name}
                                      type={field.type}
                                      value={option.value}
                                      label={t(option.label)}
                                      register={register}
                                      className={'form-check-input'}
                                    />
                                    <div></div>
                                  </div>
                                ))} */}
                              </div>
                            )}
                            {field.type === 'autocomplete' && (
                              <div className="col-md-12">
                                <AutocompleteSelect
                                  key={field.name}
                                  type={field?.type}
                                  name={field.name}
                                  options={states}
                                  register={register}
                                  maxLength={field?.max_length}
                                  setValue={setValue}
                                  clearErrors={clearErrors}
                                  error={errors[field.name]}
                                  label={t(field?.placeholder)}
                                  initialValue={updateAddress?.[field.name]} // Pass the initial value
                                  className="form-control"
                                  loading={loading}
                                />
                              </div>
                            )}

                            {['text', 'email'].includes(field.type) && (
                              <TextInput
                                type={field.type}
                                name={field.name}
                                {...register(field.name)}
                                control={control}
                                maxLength={field.max_length}
                                errors={errors}
                                placeholder={t(field.placeholder)}
                                className="form-control"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {/* {errors?.is_service_lift && (
                      <p className="text-danger mt-2">
                        {t<any>(errors?.is_service_lift?.message)}
                      </p>
                    )} */}
                  </div>
                </>
              ) : (
                <AddressList address={meData?.address} meLoading={meLoading} />
              )}

              {/* <AddressList /> */}
            </div>
          </div>

          {}
          <OrderPrize
            subbmitAddress={handleAddress}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </AddressStyled>
  );
};

export default AddressBlock;
