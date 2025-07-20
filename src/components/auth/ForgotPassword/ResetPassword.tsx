import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  ResetPasswordForm,
  ResetPasswordInput,
} from '../../../interface/common';
import { userResetPasswordSchema } from '../../../validations/auth/user';
import { getEmail, useLoading } from '../../../stores/user/user-store';
import {
  ResetPasswordAction,
  verifyTokenAction,
} from '../../../stores/user/user-action';
import { resetPasswordInputs } from '../../../shared/fields/field-data';
import Button from '../../../shared/common/Button';
import Input from '../../../shared/fields/Input';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const { t } = useTranslation();
  const {
    register: userRegister,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ResetPasswordForm | any>({
    resolver: yupResolver(userResetPasswordSchema),
    shouldUnregister: false,
    // defaultValues: { email: '', password:""},
  });
  const [resetPasswordInputData, setResetPasswordInputs] =
    useState(resetPasswordInputs);

  const router = useRouter();
  const token = router?.query?.id;
  const { loading } = useLoading();
  const [isMounted, setIsMounted] = useState(false);
  const { email } = getEmail();
  const handleResetPassword = async (values: ResetPasswordInput) => {
    const payload = { token: token, password: values.password };
    ResetPasswordAction(payload, router);
  };

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted && token) {
      const values = { token: token };
      verifyTokenAction(values);
    }
  }, [isMounted, token]);

  return (
    <section className="banner-section">
      <div className="container">
        <form
          autoComplete="off"
          onSubmit={handleSubmit(handleResetPassword)}
          className="login-form"
          noValidate
        >
          <h3 className="text-24 weight-600">{t('resetpassword')}</h3>
          <p>
            {t('readytoExploreOurWorldoFurniture')}?
            <br />
            {t('loginToStartShoppingHassleFree')}.
          </p>

          {resetPasswordInputData?.map((field: any, index) => (
            <div key={field.name} className="password-input-container">
              {field.name === 'email' && !email ? null : (
                <>
                  <Input
                    type={field.type}
                    name={field.name}
                    register={userRegister}
                    control={control}
                    errors={errors}
                    placeholder={
                      field.placeholder === 'email' ? email : field.placeholder
                    }
                    className="form-control"
                    setValue={setValue}
                    trigger={trigger}
                    readOnly={field.name === 'email'}
                  />
                  {(field.name === 'password' ||
                    field.name === 'confirm_password') && (
                    <span
                      onClick={() => {
                        const oldResetPasswordData = [
                          ...resetPasswordInputData,
                        ];
                        oldResetPasswordData[index].type =
                          oldResetPasswordData[index].type === 'password'
                            ? 'text'
                            : 'password';
                        setResetPasswordInputs(oldResetPasswordData);
                      }}
                      className="password-toggle-icon"
                    >
                      {field.type === 'text' ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </span>
                  )}
                </>
              )}
            </div>
          ))}

          <br />
          <Button
            type="submit"
            className="btn login-btn"
            text={t('resetpassword')}
            loading={loading}
          />
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
