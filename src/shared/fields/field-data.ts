import PinCode from '../../components/product-detail-page/PinCode';
import sliderImage1 from '../../assets/images/sign-up-image.png';
import sliderImage2 from '../../assets/images/login-img-2.png';
import sliderImage3 from '../../assets/images/login-img-3.png';

export const loginInputs = [
  { type: 'email', name: 'identifier', placeholder: 'email' },
  { type: 'password', name: 'password', placeholder: 'password' },
];

export const enquireInputs = [
  { type: 'text', name: 'name', placeholder: 'Name' },
  { type: 'email', name: 'email', placeholder: 'email' },
  { type: 'textarea', name: 'message', placeholder: 'Message' },
];

export const loginSlider = [sliderImage1, sliderImage2, sliderImage3];

export const resetPasswordInputs = [
  { type: 'email', name: 'email', placeholder: 'email' },
  { type: 'password', name: 'password', placeholder: 'Password' },
  {
    type: 'password',
    name: 'confirm_password',
    placeholder: 'Confirm Password',
  },
];

export const loginUsingOTP = [
  { type: 'email', name: 'email', placeholder: 'email' },
];

export const registerUser = [
  { type: 'first_name', name: 'first_name', placeholder: 'First Name' },
  { type: 'last_name', name: 'last_name', placeholder: 'Last Name' },
  { type: 'phone', name: 'phone', placeholder: 'Mobile No.' },
  {
    type: 'pincode',
    name: 'pincode',
    placeholder: 'Pin Code',
    component: PinCode,
  },
  { type: 'email', name: 'email', placeholder: 'Email Address' },
  { type: 'password', name: 'password', placeholder: 'Password' },
];

export const userProfile = [
  {
    type: 'text',
    name: 'first_name',
    placeholder: 'First Name',
    class: 'col-md-6',
  },
  {
    type: 'text',
    name: 'last_name',
    placeholder: 'Last Name',
    class: 'col-md-6',
  },
  {
    type: 'phone',
    name: 'phone',
    placeholder: 'Mobile No.',
    class: 'col-md-6',
  },
  {
    type: 'email',
    name: 'email',
    placeholder: 'Email Address',
    class: 'col-md-12',
  },
];

export const accountRemovalProfile = [
  {
    type: 'text',
    name: 'first_name',
    label: 'firstName',
    placeholder: 'First Name',

    class: 'col-md-6',
  },
  {
    type: 'text',
    name: 'last_name',
    label: 'lastName',
    placeholder: 'Last Name',
    class: 'col-md-6',
  },
  {
    type: 'email',
    name: 'email',
    label: 'email',
    placeholder: 'Email Address',
    class: 'col-md-6',
  },
  {
    type: 'phone_number',
    name: 'phone_number',
    label: 'Phone',
    placeholder: 'Phone No.',

    class: 'col-md-6',
  },
];
export const userAddressField = [
  {
    type: 'text',
    name: 'first_name',
    label: 'firstName',
    placeholder: 'firstName',
    className: 'col-md-6',
    parentClassName: 'row',
    required: true,
  },
  {
    type: 'text',
    name: 'last_name',
    label: 'lastName',
    placeholder: 'Last Name',
    className: 'col-md-6',
    parentClassName: '',
    required: true,
  },
  {
    type: 'text',
    name: 'address_name',
    label: 'addressName',
    placeholder: 'Home/Work/Other ',
    className: 'col-md-12',
    parentClassName: '',
    required: true,
  },
  {
    type: 'email',
    name: 'email',
    label: 'email',
    placeholder: 'email',
    className: 'col-md-12',
    parentClassName: 'row',
    required: true,
  },
  {
    type: 'text',
    name: 'mobile_number',
    label: 'mobileNumber',
    placeholder: 'mobileNumber',
    className: 'col-md-6',
    parentClassName: 'row',
    required: true,
  },
  {
    type: 'text',
    name: 'alternate_mobile_number',
    label: 'alternateMobileNumber',
    placeholder: 'enterYourAlternateMobileNumber',
    className: 'col-md-6',
    parentClassName: '',
  },
  {
    type: 'text',
    name: 'postal_code',
    label: 'postalCode',
    max_length: 6,
    parentClassName: 'row',
    placeholder: 'enterYourPostalCode',
    className: 'col-md-6',
    required: true,
  },
  {
    type: 'text',
    name: 'society',
    label: 'society',
    placeholder: 'enterYourSocietyName',
    className: 'col-md-6',
    parentClassName: '',
    required: true,
  },
  {
    type: 'text',
    name: 'area',
    label: 'area',
    placeholder: 'enterYourArea',
    parentClassName: 'row',
    className: 'col-md-6',
    required: true,
  },
  {
    type: 'text',
    name: 'landmark',
    label: 'landmark',
    parentClassName: '',
    placeholder: 'enterLandmark',
    className: 'col-md-6',
    required: true,
  },
  {
    type: 'text',
    name: 'city',
    label: 'city',
    placeholder: 'enterYourCIty',
    className: 'col-md-6',
    parentClassName: 'row',

    required: true,
  },
  {
    type: 'autocomplete',
    name: 'state',
    label: 'state',
    placeholder: 'enterYourState',
    className: 'col-md-6',
    parentClassName: '',
    required: true,
  },
  // {
  //   type: 'radio',
  //   name: 'is_service_lift',
  //   label: 'Service Lift',
  //   className: 'col-md-12',
  //   parentClassName: '',
  //   required: true,
  //   note: 'serviceLiftExtraChargesNote',
  //   options: [
  //     { label: 'Available', value: 'true' },
  //     { label: 'Unavailable', value: 'false' },
  //   ],
  // },
];

export const priceRangeView = [
  { id: 1, min: 0, max: 19999 },
  { id: 2, min: 20000, max: 29999 },
  { id: 3, min: 30000, max: 39999 },
  { id: 4, min: 40000, max: 49999 },
  { id: 5, min: 50000, max: 59999 },
  { id: 6, min: 60000, max: 69999 },
  { id: 7, min: 70000, max: Infinity },
];

export const priceRangeDatum = {
  1: { min: 0, max: 19999 },
  2: { min: 20000, max: 29999 },
  3: { min: 30000, max: 39999 },
  4: { min: 40000, max: 49999 },
  5: { min: 50000, max: 59999 },
  6: { min: 60000, max: 69999 },
  7: { min: 70000, max: Infinity },
};

// export const sortFilterData = [
//   { id: 1, label: 'Price - low to high', val: 'high' },
//   { id: 2, label: 'Price - high to low', val: 'low' },
// ];

export const sortFilterData = [
  { id: 1, label: 'Recommended', val: 'high' },
  { id: 2, label: 'Newest ', val: 'low' },
  { id: 3, label: 'Price - low to high', val: 'high' },
  { id: 4, label: 'Price - high to low', val: 'low' },
  { id: 5, label: 'Name [A-Z]', val: 'high' },
  { id: 6, label: 'Name [Z-A]', val: 'low' },
];

// export const sortFilterDatum = {
//   1: { label: 'Price - low to high', val: 'high' },
//   2: { label: 'Price - high to low', val: 'low' },
// };

export const sortFilterDatum = [
  { id: 1, label: 'Recommended', val: 'high' },
  { id: 2, label: 'Newest ', val: 'low' },
  { id: 3, label: 'Price - low to high', val: 'high' },
  { id: 4, label: 'Price - high to low', val: 'low' },
  { id: 5, label: 'Name [A-Z]', val: 'high' },
  { id: 6, label: 'Name [Z-A]', val: 'low' },
];

export const discountFilterData = [
  { id: 1, label: '10% and below', val: '=<10' },
  { id: 2, label: '10% or more', val: '>=10' },
  { id: 3, label: '20% or more', val: '>=20' },
  { id: 4, label: '30% or more', val: '>=30' },
];

export const discountDatum = {
  1: { id: 1, label: '10% and below', val: '<=10' },
  2: { id: 2, label: '10% or more', val: '>=10' },
  3: { id: 3, label: '20% or more', val: '>= 20' },
  4: { id: 4, label: '30% or more', val: '>= 30' },
};
