import React from 'react';
import Input from '../../../shared/fields/Input';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../shared/common/Button';
import { useForm } from 'react-hook-form';
import {
  LoginUsingOtpForm,
  LoginUsingOtpInput,
} from '../../../interface/common';
import { userLoginOtpSchema } from '../../../validations/auth/user';
import {
  setModalType,
  forgotPasswordAction,
} from '../../../stores/user/user-action';
import { loginUsingOTP } from '../../../shared/fields/field-data';
import { forgotScreen, useLoading } from '../../../stores/user/user-store';
import { ModalTypeEnum } from '../../../enums';
import ReceivedEmail from './ReceivedEmail';

const ForgotPassword = ({ inCartView, loginCallback }: any) => {
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
  const { isForgotView } = forgotScreen();
  const { loading } = useLoading();
  const handleLogin = async (values: LoginUsingOtpInput) => {
    forgotPasswordAction(values);
  };
  const openModal = (value) => {
    if (loginCallback) {
      if (value == 'register') {
        loginCallback(1);
      } else if (value == 'login') {
        loginCallback(0);
      }
      return;
    }
    setModalType(value);
  };
  return !isForgotView ? (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleLogin)}
        className="login-form login-otp-form"
        noValidate
      >
        <span
          className="login-back-btn"
          onClick={() => openModal(ModalTypeEnum.login)}
        >
          <i className="fa-regular fa-arrow-left-long"></i>
        </span>

        <h3 className="text-24 weight-600">{t('forgotpassword')}</h3>
        <p>{t('enteryouremailbelowtoresetpassword')}</p>

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
          text={t('submit')}
          loading={loading}
        />

        <p className="register text-center text-14">
          {t('newToHarvinLifestyle')} ?{' '}
          <span
            onClick={() => openModal(ModalTypeEnum.register)}
            className="register-text cursor-pointer"
          >
            {t('registerHere')}
          </span>
        </p>
      </form>
    </div>
  ) : (
    <ReceivedEmail inCartView={inCartView} />
  );
};

export default ForgotPassword;
