import React from 'react';
import Input from '../../shared/fields/Input';

import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../shared/common/Button';
import { useForm } from 'react-hook-form';
import { LoginUsingOtpForm, LoginUsingOtpInput } from '../../interface/common';
import { userLoginOtpSchema } from '../../validations/auth/user';
import {
  setModalType,
  loginUsingOtpAction,
} from '../../stores/user/user-action';
import { loginUsingOTP } from '../../shared/fields/field-data';
import { useLoading } from '../../stores/user/user-store';
import { ModalTypeEnum } from '../../enums';
import LoginAuth from './LoginAuth';

const LoginUsingOTP = ({ loginCallback }: any) => {
  const { t } = useTranslation();
  const {
    register: userGetOtp,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<LoginUsingOtpForm | any>({
    resolver: yupResolver(userLoginOtpSchema),
    shouldUnregister: false,
    // defaultValues: { email: '', password:""},
  });
  const { loading } = useLoading();
  const handleLogin = async (values: LoginUsingOtpInput) => {
    loginUsingOtpAction(values, loginCallback);
  };

  const openRegister = () => {
    if (loginCallback) {
      loginCallback(1);
      return;
    }
    setModalType(ModalTypeEnum.register);
  };
  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleLogin)}
        className="login-form login-otp-form"
        noValidate
      >
        <h3 className="text-24 weight-600">{t('login')}</h3>
        <p>{t('enteryouremailaddresstogetotp')}</p>

        {loginUsingOTP.map((field) => (
          <div className="form-group" key={field.name}>
            <Input
              key={field.name}
              type={field.type}
              name={field.name}
              register={userGetOtp}
              control={control}
              errors={errors}
              placeholder={field.placeholder}
              className="form-control"
              setValue={setValue}
              trigger={trigger}
            />{' '}
          </div>
        ))}

        <Button
          type="submit"
          className="btn login-btn"
          text={t('getotp')}
          loading={loading}
        />
        <p className="register text-center text-14">
          {t('newToHarvinLifestyle')} ?{' '}
          <span onClick={openRegister} className="register-text cursor-pointer">
            {t('registerHere')}
          </span>
        </p>
        <div className="or-wrap d-flex align-items-center">
          <div className="or-line"></div>
          <span className="or-text">OR</span>
          <div className="or-line"></div>
        </div>
      </form>

      <LoginAuth />
    </div>
  );
};

export default LoginUsingOTP;
