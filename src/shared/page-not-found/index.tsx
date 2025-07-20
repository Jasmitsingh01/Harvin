import React from 'react';

const NotFoundPage = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
          color: '#000',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: 'translateY(-50%)',
            position: 'relative',
            top: '5%',
          }}
        >
          <h1
            style={{
              margin: 0,
              paddingRight: '23px',
              fontSize: '24px',
              fontWeight: 500,
              lineHeight: '49px',
              borderRight: '1px solid rgba(0, 0, 0, 0.3)',
            }}
          >
            404
          </h1>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '49px',
              margin: 0,
              paddingLeft: '23px',
              textAlign: 'left',
            }}
          >
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
