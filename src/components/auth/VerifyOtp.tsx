import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../shared/common/Button';
import { useForm } from 'react-hook-form';
import { LoginUsingOtpForm } from '../../interface/common';

import {
  setModalType,
  loginUsingOtpAction,
  verifyOtpAction,
} from '../../stores/user/user-action';

import { getEmail, useLoading } from '../../stores/user/user-store';
import { ModalTypeEnum } from '../../enums';

import OTPInput from 'react-otp-input';

const VerifyOtp = ({ inCartView, loginCallback }: any) => {
  const { t } = useTranslation();
  const { handleSubmit } = useForm<LoginUsingOtpForm | any>({
    shouldUnregister: false,
    // defaultValues: { email: '', password:""},
  });
  const { loadingVerify } = useLoading();
  const email: any = getEmail();
  const [otp, setOtp] = useState('');
  // const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<any>(null);

  const [timer, setTimer] = useState(900);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(true);
  const handleVerifyOTP = async () => {
    const payload = {
      otp: otp,
      email: email,
    };
    verifyOtpAction(payload);
    setIsOtpValid(true);
  };
  // useEffect(() => {
  //   const countdown = setInterval(() => {
  //     setTimer((prevTimer) => {
  //       if (prevTimer > 0) {
  //         return prevTimer - 1;
  //       } else {
  //         setIsOtpValid(false); // Mark OTP as invalid when the timer reaches 0
  //         clearInterval(countdown); // Clear the interval when the timer reaches 0
  //         return 0;
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(countdown);
  // }, []);

  useEffect(() => {
    if (!isResendDisabled) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setIsOtpValid(false); // Mark OTP as invalid when the timer reaches 0
            clearInterval(countdown); // Clear the interval when the timer reaches 0
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(countdown);
    }

    return () => {};
  }, [isResendDisabled]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const openGetOTP = () => {
    if (loginCallback) {
      loginCallback(2);
      return;
    }

    setModalType(ModalTypeEnum.getotp);
  };
  const handleLoginUsingOtp = async () => {
    const payload = {
      email: email,
    };
    loginUsingOtpAction(payload, inCartView);

    // Reset timer and mark OTP as valid
    setTimer(900); // Reset timer to 15 minutes
    setIsOtpValid(true);

    setIsResendDisabled(true);

    // Clear the existing interval and start a new one
    clearInterval(intervalRef.current);
    const newInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          setIsOtpValid(false); // Mark OTP as invalid when the timer reaches 0
          clearInterval(newInterval); // Clear the interval when the timer reaches 0
          return 0;
        }
      });
    }, 1000);
    intervalRef.current = newInterval;
  };

  return (
    <div>
      <form
        action=""
        className="login-form verify-otp-form"
        autoComplete="off"
        onSubmit={handleSubmit(handleVerifyOTP)}
        noValidate
      >
        <span onClick={() => openGetOTP()} className="login-back-btn">
          <i className="fa-regular fa-arrow-left-long"></i>
        </span>

        <h3 className="text-24 weight-600">{t('verifyotp')}</h3>
        <p>{t('enterthe4digitverificationcodesenttoemail')}</p>

        <div className="opt-num-wrap">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={'opt-num'}
            //   renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <p className="register text-14">
          {t('didntreceiveanycode')}
          <span
            onClick={() => handleLoginUsingOtp()}
            className="register-text"
            style={{
              pointerEvents: isResendDisabled ? 'none' : 'auto',
              opacity: isResendDisabled ? 0.5 : 1,
            }}
            //  loading={loading}
          >
            {!isOtpValid && `${t('expired')} `}
            {t('resend')}
          </span>
          <span
            className="register-text"
            //  loading={loading}
          >
            {' '}
            {`   ${minutes}:${seconds}`}
          </span>
        </p>
        <Button
          type="submit"
          className="btn login-btn"
          text={t('submit')}
          loading={loadingVerify}
          disabled={!isOtpValid}
        />
      </form>
    </div>
  );
};

export default VerifyOtp;
