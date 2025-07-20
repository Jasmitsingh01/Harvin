import * as yup from 'yup';

export const userResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
  // .matches(/\d/, 'Password must contain at least one digit'),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const userLoginSchema = yup.object().shape({
  // identifier: yup
  //   .string()
  //   .email('Please enter a valid email')
  //   .matches(/^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+com$/, 'Email is required')
  //   .required('Email is required'),
  identifier: yup
    .string()
    .email('Please enter a valid email')
    .matches(
      /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/,
      'Email is required'
    )
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});
export const userLoginOtpSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .matches(
      /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/,
      'Email is required'
    )
    .required('Email is required'),
});
// export const userRegisterSchema = yup.object().shape({
//   first_name: yup.string().required('First name is required'),
//   //last_name: yup.string().required('Last name is required'),
//   email: yup
//     .string()
//     .email('Please enter a valid email')
//     .matches(/^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+com$/, 'Email is required')
//     .required('Email is required'),

//   password: yup
//     .string()
//     .required('Password is required')
//     .min(8, 'Password must be at least 8 characters')
//     .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
//     .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),

//   pincode: yup.string().test('is-valid-pincode', 'Invalid pincode', (value) => {
//     return !value || (value.length === 6 && /^\d{6}$/.test(value));
//   }),

//   phone: yup
//     .string()
//     .required('Phone number is required')
//     .test('is-valid-phone', 'Please enter valid mobile umber', (value) => {
//       // If the phone number is not required and is empty, consider it valid
//       if (!value) {
//         return true;
//       }

//       // Check if the phone number is in a valid format (e.g., 10 digits) and does not contain all zeros
//       return (
//         value.length === 10 &&
//         /^[0-9]{10}$/.test(value) &&
//         !/^(0+)$/.test(value) // Check if all digits are not zero
//       );
//     }),
// });

export const userRegisterSchema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  //last_name: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .matches(
      /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/,
      'Email is required'
    )
    .required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),

  pincode: yup
    .string()
    .required('Pincode is required')
    .max(6, 'Pincode cannot be more than 6 digits')
    .test('is-valid-pincode', 'Invalid Pincode', (value) => {
      const indianPincodeRegex = /^[1-9][0-9]{5}$/;

      if (!value || !indianPincodeRegex.test(value)) {
        return false; // Return false if pincode format is invalid
      }

      // Check if all digits are not the same
      const allDigitsSame = /^(.)\1+$/.test(value);
      return !allDigitsSame; // Return false if all digits are same
    }),
  phone: yup
    .string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Please enter valid mobile number', (value) => {
      // If the phone number is not required and is empty, consider it valid
      if (!value) {
        return true;
      }

      // Check if the phone number is in a valid format (e.g., 10 digits) and does not contain all zeros
      return (
        value.length === 10 &&
        /^[0-9]{10}$/.test(value) &&
        !/^(0+)$/.test(value) // Check if all digits are not zero
      );
    }),
});

// export const productPincodeValidationSchema = yup.object().shape({
//   pincode: yup
//     .string()
//     .required('pleaseEnterPincode')
//     .matches(/^\d{6}$/, 'InvalidPincode'),
// });

export const productPincodeValidationSchema = yup.object().shape({
  pincode: yup
    .string()
    .required('Please enter a pincode')
    .matches(/^[1-9][0-9]{5}$/, 'Invalid Pincode')
    .test('is-valid-pincode', 'Invalid Pincode', (value) => {
      // Check if all digits are not the same
      const allDigitsSame = /^(.)\1+$/.test(value);
      return !allDigitsSame; // Return false if all digits are same
    }),
});

export const profileValidationSchema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  // last_name: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .matches(/^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+com$/, 'Email is required')
    .required('Email is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Please enter valid mobile umber', (value) => {
      // If the phone number is not required and is empty, consider it valid
      if (!value) {
        return true;
      }

      // Check if the phone number is in a valid format (e.g., 10 digits) and does not contain all zeros
      return (
        value.length === 10 &&
        /^[0-9]{10}$/.test(value) &&
        !/^(0+)$/.test(value) // Check if all digits are not zero
      );
    }),
  // phone_code: yup
  //   .string()
  //   .required('pleaseEnterPincode')
  //   .matches(/^\d{6}$/, 'InvalidPincode'),
});

export const accountRemovalValidationSchema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  // last_name: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .matches(/^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+com$/, 'Email is required')
    .required('Email is required'),
  phone_number: yup
    .string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Please enter valid mobile umber', (value) => {
      // If the phone number is not required and is empty, consider it valid
      if (!value) {
        return true;
      }

      // Check if the phone number is in a valid format (e.g., 10 digits) and does not contain all zeros
      return (
        value.length === 10 &&
        /^[0-9]{10}$/.test(value) &&
        !/^(0+)$/.test(value) // Check if all digits are not zero
      );
    }),
  // phone_code: yup
  //   .string()
  //   .required('pleaseEnterPincode')
  //   .matches(/^\d{6}$/, 'InvalidPincode'),
});

export const userEnquireSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  //last_name: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .matches(/^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+com$/, 'Email is required')
    .required('Email is required'),

  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(200, 'Message cannot exceed 200 characters'),
});
