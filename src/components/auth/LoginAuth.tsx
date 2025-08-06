// Login.js
import React from 'react';
import social from '../../assets/images/google.png';
import ProgressiveImage from '../../shared/progressive-image';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import { SocialAuth } from '../../interface/common';
import { loginAuthAction } from '../../stores/user/user-action';

const LoginAuth = () => {
  // eslint-disable-next-line no-undef
  const facebookClientID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

  const responseFacebook = (response: { accessToken: any }) => {
    const values: SocialAuth = {
      provider: 'facebook',
      access_token: response?.accessToken,
    };
    loginAuthAction(values);
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      const values: SocialAuth = {
        provider: 'google',
        access_token: accessToken,
      };
      loginAuthAction(values);
    },
  });

  return (
    <div className="form-social-icon-wrap d-flex justify-content-center mb-4">
      <button className="social-icon" onClick={() => login()}>
        <ProgressiveImage src={social} alt="" width="18" />
      </button>

      <FacebookLogin
        appId={facebookClientID}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="custom-facebook-button"
        icon="fa-facebook"
        textButton=""
      />
    </div>
  );
};

export default LoginAuth;
