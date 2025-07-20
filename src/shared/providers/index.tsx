import * as React from 'react';
import CustomErrorBoundary from './error-boundary';
import { Suspense } from './suspense';
import Toastify from './toastify';
import { FC } from 'react';

export const AppProvider: FC<any> = ({ children }) => {
  return (
    <CustomErrorBoundary fallbackRender={() => null}>
      <Suspense>
        <Toastify />
        {children}
      </Suspense>
    </CustomErrorBoundary>
  );
};
