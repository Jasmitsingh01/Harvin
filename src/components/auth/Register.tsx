// import React, { useState } from 'react';
// import Input from '../../shared/fields/Input';
// import { useTranslation } from 'react-i18next';
// import { yupResolver } from '@hookform/resolvers/yup';
// import Button from '../../shared/common/Button';
// import { useForm } from 'react-hook-form';
// import { LoginForm, RegisterInputs } from '../../interface/common';
// import { userRegisterSchema } from '../../validations/auth/user';
// import {
//   registerUserAction,
//   setModalType,
//   updateForgotScreen,
// } from '../../stores/user/user-action';
// import { registerUser } from '../../shared/fields/field-data';
// import { useLoading } from '../../stores/user/user-store';
// import { ModalTypeEnum } from '../../enums';
// const Register = ({ inCartView, loginCallback }: any) => {
//   const { t } = useTranslation();
//   const {
//     register: userRegister,
//     handleSubmit,
//     control,
//     setValue,
//     trigger,
//     formState: { errors },
//   } = useForm<LoginForm | any>({
//     resolver: yupResolver(userRegisterSchema),
//     shouldUnregister: false,
//     // defaultValues: { email: '', password:""},
//   });
//   const { loading } = useLoading();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTogglePassword = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   // const { error:err } = useUserStore();
//   const handleRegister = async (values: RegisterInputs) => {
//     values.permission = 'customer';
//     values.newsletter = 0;
//     // registerUserAction(values, inCartView);
//   };

//   const openLogin = (value) => {
//     if (value == 'forgotpassword') {
//       updateForgotScreen();
//     }
//     if (loginCallback) {
//       if (value == 'login') {
//         loginCallback(0);
//       } else if (value == 'getotp') {
//         loginCallback(5);
//       } else if (value == 'forgotpassword') {
//         loginCallback(4);
//       }
//       return;
//     }

//     setModalType(value);
//   };

//   return (
//     <div>
//       <form
//         autoComplete="off"
//         onSubmit={handleSubmit(handleRegister)}
//         className="login-form"
//         noValidate
//       >
//         <h3 className="text-24 weight-600">{t('register')}</h3>
//         <p>
//           {t('readytoExploreOurWorldoFurniture')}?
//           <br />
//           {t('loginToStartShoppingHassleFree')}.
//         </p>

//         {registerUser.map((field) => (
//           <div key={field.name} className="password-input-container">
//             <Input
//               type={
//                 field.type === 'password'
//                   ? showPassword
//                     ? 'text'
//                     : 'password'
//                   : field.type
//               }
//               name={field.name}
//               register={userRegister}
//               control={control}
//               errors={errors}
//               placeholder={field.placeholder}
//               className="form-control"
//               setValue={setValue}
//               trigger={trigger}
//             />
//             {field.type === 'password' && (
//               <span
//                 onClick={handleTogglePassword}
//                 className="password-toggle-icon"
//               >
//                 {showPassword ? (
//                   <i className="fa-solid fa-eye"></i>
//                 ) : (
//                   // Replace with your eye icon class
//                   <i className="fa-solid fa-eye-slash"></i>
//                   // Replace with your eye icon class
//                 )}
//               </span>
//             )}
//           </div>
//         ))}
//         <div className="forgot-password-wrap d-flex justify-content-between align-items-center my-4">
//           <span
//             className="text-14 weight-400"
//             onClick={() => openLogin(ModalTypeEnum.forgotpassword)}
//           >
//             {t('termandcondition')}
//           </span>
//         </div>
//         <Button
//           type="submit"
//           className="btn login-btn"
//           text={t('getotp')}
//           loading={loading}
//           onClick={() => openLogin(ModalTypeEnum.verifyotpregister)}
//         />
//         <p className="register text-center text-14">
//           {t('alreadyAccount')} ?{' '}
//           <span
//             onClick={() => openLogin(ModalTypeEnum.login)}
//             className="register-text cursor-pointer"
//           >
//             {t('loginHere')}
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import Input from '../../shared/fields/Input';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../shared/common/Button';
import { useForm } from 'react-hook-form';
import { LoginForm } from '../../interface/common';
import { userRegisterSchema } from '../../validations/auth/user';
import {
  loginUsingOtpActionRegister,
  setModalType,
  updateForgotScreen,
} from '../../stores/user/user-action';
import { registerUser } from '../../shared/fields/field-data';
import { useLoading } from '../../stores/user/user-store';
import { ModalTypeEnum } from '../../enums';

const Register = ({ loginCallback }: any) => {
  const { t } = useTranslation();
  const {
    register: userRegister,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<LoginForm | any>({
    resolver: yupResolver(userRegisterSchema),
    shouldUnregister: false,
  });
  const { loading } = useLoading();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegister = async (values: any) => {
    values.permission = 'customer';
    values.newsletter = 0;
    // Perform form validation
    const isValid = await trigger();

    if (isValid) {
      loginUsingOtpActionRegister({ email: values }, loginCallback);

      // If form is valid, open the verifyotpregister modal
      // setModalType(ModalTypeEnum.verifyotpregister);
    }
  };

  const openLogin = (value: string) => {
    if (value === 'forgotpassword') {
      updateForgotScreen();
    }

    if (loginCallback) {
      if (value === 'login') {
        loginCallback(2);
      } else if (value === 'getotp') {
        loginCallback(5);
      } else if (value === 'forgotpassword') {
        loginCallback(4);
      }
      return;
    }

    setModalType(value);
  };

  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleRegister)}
        className="login-form"
        noValidate
      >
        <h3 className="text-24 weight-600">{t('register')}</h3>
        <p>
          {t('readytoExploreOurWorldoFurniture')}?
          <br />
          {t('loginToStartShoppingHassleFree')}.
        </p>

        {registerUser.map((field) => (
          <div key={field.name} className="password-input-container">
            <Input
              type={
                field.type === 'password'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : field.type
              }
              name={field.name}
              register={userRegister}
              control={control}
              errors={errors}
              placeholder={field.placeholder}
              className="form-control"
              setValue={setValue}
              trigger={trigger}
            />
            {field.type === 'password' && (
              <span
                onClick={handleTogglePassword}
                className="password-toggle-icon"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </span>
            )}
          </div>
        ))}
        <div className="forgot-password-wrap d-flex justify-content-between align-items-center my-4">
          <span
            className="text-14 weight-400"
            onClick={() => openLogin(ModalTypeEnum.forgotpassword)}
          >
            {t('termandcondition')}
          </span>
        </div>
        <Button
          type="submit"
          className="btn login-btn"
          text={t('getotp')}
          loading={loading}
        />
        <p className="register text-center text-14">
          {t('alreadyAccount')} ?{' '}
          <span
            onClick={() => openLogin(ModalTypeEnum.login)}
            className="register-text cursor-pointer"
          >
            {t('loginHere')}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
