import * as yup from 'yup';

export const userAddressValidationSchemas = yup.object().shape({
  first_name: yup.string().required('firstNameIsRequired'),
  // last_name: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('pleaseEnterValidEmail')
    .matches(/^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+com$/, 'emailIsRequired')
    .required('emailIsRequired'),
  address_name: yup.string().required('addressNameIsRequired'),
  mobile_number: yup
    .string()
    .matches(/^(?:\+?\d{1,3})?[6-9]\d{9}$/, 'invalidMobileNumber')
    .required('mobileIsRequired'),
  // postal_code: yup
  //   .string()
  //   .matches(/^[0-9]+$/, 'postalCodeIsRequired')
  //   .min(6, 'Postal code must be exactly 6 digits')
  //   .max(6, 'Postal code must be exactly 6 digits')
  //   .required('postalCodeIsRequired'),
  postal_code: yup
    .string()
    .matches(/^[0-9]+$/, 'Postal code is required')
    .test('is-valid-postal-code', 'Invalid postal code', (value) => {
      // Check if all digits are not the same
      const allDigitsSame = /^(.)\1+$/.test(value);

      // Check if the postal code is in the format of an Indian postal code
      const isIndianPostalCode = /^[1-9][0-9]{5}$/.test(value);

      // Return true only if it's a valid Indian postal code and all digits are not the same
      return isIndianPostalCode && !allDigitsSame;
    })
    .min(6, 'Postal code must be exactly 6 digits')
    .max(6, 'Postal code must be exactly 6 digits')
    .required('Postal code is required'),
  society: yup.string().required('societyIsRequired'),
  area: yup.string().required('areaIsRequired'),
  landmark: yup.string().required('landMarkIsRequired'),
  city: yup.string().required('cityIsRequired'),
  state: yup.string().required('stateIsRequired'),
  // is_service_lift: yup.boolean().required('serviceLiftIsRequired'),
  alternate_mobile_number: yup
    .string()
    .matches(/^[0-9]*$/, 'Alternate Mobile Number must be a number')
    .nullable(),
});
