import React from 'react';
import Input from '../../shared/fields/Input';

import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../shared/common/Button';
import { useForm } from 'react-hook-form';
import { LoginForm, LoginInput } from '../../interface/common';
import { userLoginSchema } from '../../validations/auth/user';
import {
  setModalType,
  loginAction,
  updateForgotScreen,
} from '../../stores/user/user-action';
import { loginInputs } from '../../shared/fields/field-data';
import { useLoading } from '../../stores/user/user-store';
import { ModalTypeEnum } from '../../enums';
import LoginAuth from './LoginAuth';

const Login = ({ inCartView = false, registerCallback }: any) => {
  const { t } = useTranslation();
  const {
    register: userRegister,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<LoginForm | any>({
    resolver: yupResolver(userLoginSchema),
    shouldUnregister: false,
    // defaultValues: { email: '', password:""},
  });

  const { loading } = useLoading();
  const handleLogin = async (values: LoginInput) => {
    // if (!values?.email || !values?.password) {
    //   return;
    // } else {
    //   const inputValues: LoginInput = {
    //     email: values?.email,
    //     password: values?.password,
    //   };
    loginAction(values, inCartView);
    // }
  };
  const openModal = (value) => {
    if (value == 'forgotpassword') {
      updateForgotScreen();
    }
    if (registerCallback) {
      if (value == 'getotp') {
        registerCallback(2);
      } else if (value == 'register') {
        registerCallback(1);
      } else if (value == 'forgotpassword') {
        registerCallback(4);
      }
      return;
    }

    setModalType(value);
  };
  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleLogin)}
        className="login-form"
        noValidate
      >
        <h3 className="text-24 weight-600">{t('login')}</h3>

        <p>
          {t('readytoExploreOurWorldoFurniture')}?
          <br />
          {t('loginToStartShoppingHassleFree')}.
        </p>
        {loginInputs.map((field) => (
          <Input
            key={field.name}
            type={field.type}
            name={field.name}
            register={userRegister}
            control={control}
            errors={errors}
            placeholder={field.placeholder}
            className="form-control"
            setValue={setValue}
            trigger={trigger}
          />
        ))}
        <div className="forgot-password-wrap d-flex justify-content-between align-items-center my-4">
          <span
            onClick={() => openModal(ModalTypeEnum.forgotpassword)}
            className="text-14 weight-400"
          >
            {t('forgotPassword')}?
          </span>
          <span
            onClick={() => openModal(ModalTypeEnum.getotp)}
            className="text-14 weight-400"
          >
            {t('loginUsingOTP')}
          </span>
        </div>
        <Button
          type="submit"
          className="btn login-btn"
          text={t('login')}
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

export default Login;
