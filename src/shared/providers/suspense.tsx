'use client';
import React from 'react';
import { Suspense as ReactSuspense } from 'react';
import type { FC, SuspenseProps } from 'react';

export const Suspense: FC<SuspenseProps> = ({ children, fallback }) => {
  return <ReactSuspense fallback={fallback}>{children}</ReactSuspense>;
};
