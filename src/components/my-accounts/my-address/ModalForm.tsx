import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { userAddressField } from '../../../shared/fields/field-data';
import {
  addUserAddressAction,
  updateUserAddressAction,
} from '../../../stores/user/user-action';
import { userAddressValidationSchemas } from '../../../validations/card/address';
import { useTranslation } from 'react-i18next';
import TextInput from '../../../shared/fields/TextInput';
import Button from '../../../shared/common/Button';
// import RadioOption from '../../../shared/fields/RadioGroup';
import AutocompleteSelect from '../../../shared/fields/AutoCompleteSelect';
import { getAllStates } from '../../../stores/cart/cart-action';
import { useGetAllStates } from '../../../stores/cart/cart-store';
interface ModalFormProps {
  initilvalues: any;
  openModal: any;
  setOpenModal: any;
  loading: any;
}
const ModalForm: React.FC<ModalFormProps> = ({
  initilvalues,
  openModal,
  setOpenModal,
  loading,
}) => {
  const { t } = useTranslation();
  const {
    register: addressRegister,
    handleSubmit,
    // control,
    setValue,
    clearErrors,
    // trigger,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(userAddressValidationSchemas),
    shouldUnregister: false,
    // defaultValues: {
    //     ...initilvalues,

    // },
  });

  const { states, loading: stateLoading } = useGetAllStates();

  useEffect(() => {
    getAllStates();
  }, []);
  useEffect(() => {
    if (initilvalues === null) {
      reset();
    } else {
      Object.keys(initilvalues).forEach((key) => {
        // Handle radio button separately
        if (key === 'is_service_lift') {
          const value = initilvalues[key] === 1 ? true : false;
          setValue(key, String(value));
        } else {
          setValue(key, initilvalues[key]);
        }
      });
    }
  }, [setValue, initilvalues?.id]);
  const callBack = () => {
    setOpenModal(false);
  };
  const submitData = async (values: any) => {
    if (initilvalues?.id) {
      updateUserAddressAction(values, callBack);
    } else {
      addUserAddressAction(values, callBack);
    }
  };

  return (
    <div>
      <div
        className={`modal fade add-address-pop-up ${openModal && 'show'}`}
        id="add-address"
        aria-labelledby=""
        style={{ display: 'block' }}
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title text-18 weight-600"
                id="exampleModalLabel"
              >
                {initilvalues?.id ? 'Update Address' : 'Add New Address'}
              </h1>
              <button
                onClick={() => setOpenModal(false)}
                type="button"
                className="btn-close m-0 p-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <form className="row" onSubmit={handleSubmit(submitData)}>
                  {userAddressField?.map((field) => {
                    const isNewRow = field.parentClassName === 'row';
                    return (
                      <React.Fragment key={field.name}>
                        {isNewRow && <div className="w-100"></div>}
                        <div className={field.className} key={field?.name}>
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
                                      register={addressRegister}
                                      className={'form-check-input'}
                                    />
                                    <div></div>
                                  </div>
                                ))} */}
                              </div>
                            )}
                            {field.type === 'autocomplete' && (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <AutocompleteSelect
                                    key={field.name}
                                    type={field?.type}
                                    name={field.name}
                                    options={states}
                                    register={addressRegister}
                                    maxLength={field?.max_length}
                                    setValue={setValue}
                                    clearErrors={clearErrors}
                                    error={errors[field.name]}
                                    label={t(field?.placeholder)}
                                    className="form-control"
                                    loading={stateLoading}
                                    initialValue={initilvalues?.[field.name]}
                                  />
                                </div>
                              </div>
                            )}

                            {['text', 'email'].includes(field.type) && (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <TextInput
                                    key={field.name}
                                    type={field?.type}
                                    name={field.name}
                                    {...addressRegister(field.name)}
                                    maxLength={field?.max_length}
                                    // control={control}
                                    errors={errors}
                                    placeholder={t(field?.placeholder)}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                  {errors?.is_service_lift && (
                    <p className="text-danger mt-2">
                      {t<any>(errors?.is_service_lift?.message)}
                    </p>
                  )}
                  <div className="col-md-12">
                    <Button
                      loading={loading}
                      className="btn btn-theme save-address-btn"
                      text={
                        initilvalues?.id ? 'Update Address' : 'Save Address'
                      }
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
