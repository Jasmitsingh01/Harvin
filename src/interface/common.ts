import React from 'react';
export interface InavItem {
  title: string;
  href: string;
}
export interface ProductType {
  title: string;
  description: string;
  image: string;
  price: string;
  quantity: number;
  slug: string;
}
export interface CategoryType {
  title: string;
  description: string;
  image: string;
  price: string;
  slug: string;
}
export interface InputPropsType {
  name?: string;
  value?: string;
  placeholder: string;
  error?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface HomePagePropsType {
  products: ProductType[];
  newArrival: ProductType[];
}
export interface MenuType {
  banner_image: string | null | any;

  color_code: string | null;
  is_bold: number | null;
  is_external: null | number;

  submenu: any;
  target: string;
  title: string;
  url: string;
}
interface FooterLink {
  label: string;
  href: string;
}
interface FooterSection {
  title: string;
  links: FooterLink[];
}
export interface FooterData {
  [index: number]: FooterSection;
}
export interface CartHeaderTabItem {
  id: string;
  label: string;
}
export interface UserDetailType {
  address: any[]; // Replace 'any' with the actual type of the 'address' property
  birthdate: null | string; // Replace 'null' with the actual type of the 'birthdate' property
  created_at: string;
  deleted_at: null | string; // Replace 'null' with the actual type of the 'deleted_at' property
  email: string;
  email_verified_at: null | string; // Replace 'null' with the actual type of the 'email_verified_at' property
  first_name: string;
  gender: null | string; // Replace 'null' with the actual type of the 'gender' property
  google2fa_secret: null | string; // Replace 'null' with the actual type of the 'google2fa_secret' property
  id: number;
  is_active: 0 | 1; // Assuming 'is_active' is a boolean, you can adjust the type accordingly
  is_admin: 0 | 1; // Assuming 'is_admin' is a boolean, you can adjust the type accordingly
  is_cart: boolean;
  last_login: null | string; // Replace 'null' with the actual type of the 'last_login' property
  last_name: string;
  newsletter: 0 | 1; // Assuming 'newsletter' is a boolean, you can adjust the type accordingly
  notification: 0 | 1; // Assuming 'notification' is a boolean, you can adjust the type accordingly
  old_id: number;
  profile: null | any; // Replace 'null' with the actual type of the 'profile' property
  shop_id: null | string; // Replace 'null' with the actual type of the 'shop_id' property
  two_factor: 0 | 1; // Assuming 'two_factor' is a boolean, you can adjust the type accordingly
  two_factor_code: string;
  two_factor_expires_at: string;
  two_factor_recovery_codes: null | any[]; // Replace 'null' with the actual type of the 'two_factor_recovery_codes' property
  updated_at: string;
  wallet: any;
}
// ---------login and form utils--------
export interface LoginInput {
  email: string;
  password: string;
}
export interface ResetPasswordInput {
  password: string;
  confirm_password: string;
}
export interface RegisterInputs {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  permission?: string;
  newsletter?: number;
  phone_code?: number;
  phone?: number;
}
export interface LoginUsingOtpInput {
  email: string;
}
export type ResetPasswordForm = Omit<
  ResetPasswordInput,
  'password' | 'confirm_password'
> & {
  password: Pick<LoginInput, 'password'>;
  confirm_password: Pick<LoginInput, 'password'>;
};
export type LoginForm = Omit<LoginInput, 'email' | 'password'> & {
  email: Pick<LoginInput, 'email'>;
  password: Pick<LoginInput, 'password'>;
};
export type LoginUsingOtpForm = Omit<
  LoginUsingOtpInput,
  'email' | 'password'
> & {
  email: Pick<LoginUsingOtpInput, 'email'>;
};

export interface PropsValidationType {
  isMenuActive: (menu: string) => boolean;
  setActiveMenu: (menu: string) => void;
}

export interface UserAddressFieldType {
  type: 'text' | 'email';
  name: string;
  label: string;
  placeholder: string;
  className: string;
  star?: boolean;
}
export interface SocialAuth {
  provider: string;
  access_token: string;
}
