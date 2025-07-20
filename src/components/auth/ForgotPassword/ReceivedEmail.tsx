import React from 'react';

import { useTranslation } from 'react-i18next';
import Button from '../../../shared/common/Button';
import { useForm } from 'react-hook-form';

import {
  setModalType,
  loginModalOpen,
  updateForgotScreen,
} from '../../../stores/user/user-action';
import { getEmail, useLoading } from '../../../stores/user/user-store';
import { ModalTypeEnum } from '../../../enums';

const ReceivedEmail = ({ inCartView }: any) => {
  const { t } = useTranslation();
  const { handleSubmit } = useForm<any>({
    shouldUnregister: false,
    // defaultValues: { email: '', password:""},
  });
  const { email }: any = getEmail();
  const { loading } = useLoading();
  const handleReceiveEmail = async () => {
    loginModalOpen(false);
  };

  const openModal = (value) => {
    updateForgotScreen();
    setModalType(value);
  };
  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleReceiveEmail)}
        className="login-form login-otp-form"
        noValidate
      >
        <span
          className="login-back-btn"
          onClick={() => openModal(ModalTypeEnum.forgotpassword)}
        >
          <i className="fa-regular fa-arrow-left-long"></i>
        </span>

        <h3 className="text-24 weight-600">{t('forgotpassword')}</h3>
        <p>
          {t('gotEmailMessage', {
            userEmail: email,
          })}
        </p>
        {!inCartView ? (
          <Button
            type="submit"
            className="btn login-btn"
            text={t('gotit')}
            loading={loading}
          />
        ) : null}
      </form>
    </div>
  );
};

export default ReceivedEmail;
