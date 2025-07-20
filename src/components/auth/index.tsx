import React from 'react';
import Login from './Login';
import ProgressiveImage from '../../shared/progressive-image';
import { loginModalOpen } from '../../stores/user/user-action';
import Register from './Register';
import { useModalData } from '../../stores/user/user-store';
import { ModalTypeEnum } from '../../enums';
import LoginUsingOTP from './LoginUsingOTP';
import VerifyOtp from './VerifyOtp';
import ForgotPassword from './ForgotPassword';
import ReceivedEmail from './ForgotPassword/ReceivedEmail';
import SlickSlider from '../../shared/slick-slider';
import { loginSlider } from '../../shared/fields/field-data';
import VerifyOtpRegister from './VerifyOtpRegister';

const AuthModal = () => {
  const { modalType } = useModalData();
  const handleOpen = () => {
    loginModalOpen(false);
  };

  return (
    <div className="modal  login-pop-up" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="col-md-5 pop-up-left">
                <div className="login-img h-full">
                  <SlickSlider>
                    {loginSlider.map((src, index) => (
                      <div className="banner" key={index}>
                        <ProgressiveImage
                          src={src}
                          className="w-100"
                          key={index}
                        />
                      </div>
                    ))}
                  </SlickSlider>
                </div>
              </div>
              <div className="col-md-7 pop-up-right">
                <button
                  onClick={handleOpen}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                {modalType === ModalTypeEnum.register ? (
                  <Register />
                ) : modalType === ModalTypeEnum.getotp ? (
                  <LoginUsingOTP />
                ) : modalType === ModalTypeEnum.verifyotp ? (
                  <VerifyOtp />
                ) : modalType === ModalTypeEnum.forgotpassword ? (
                  <ForgotPassword />
                ) : modalType === ModalTypeEnum.gotit ? (
                  <ReceivedEmail />
                ) : modalType === ModalTypeEnum.verifyotpregister ? (
                  <VerifyOtpRegister />
                ) : (
                  <Login />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
