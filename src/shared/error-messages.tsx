'use client';
import React from 'react';
import { useTranslation } from 'next-i18next';

const ErrorMessages = ({ messages }: any) => {
  const { t } = useTranslation();
  return <>{t(`${messages}`)}</>;
};

export default ErrorMessages;
