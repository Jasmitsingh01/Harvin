'use client';
import React, { FC } from 'react';
import { ErrorBoundary, ErrorBoundaryProps } from 'react-error-boundary';

function fallbackRender({ error }: { error: { message: string } }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error?.message}</pre>
    </div>
  );
}

const CustomErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>
  );
};

export default CustomErrorBoundary;
