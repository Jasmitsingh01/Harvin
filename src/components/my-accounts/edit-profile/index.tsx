import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { profileValidationSchema } from '../../../validations/auth/user';
import { userProfile } from '../../../shared/fields/field-data';
import Input from '../../../shared/fields/Input';
import Button from '../../../shared/common/Button';
import { updateUser } from '../../../stores/user/user-action';
import { userDetail } from '../../../stores/user/user-store';
const EditProfile = () => {
  const { result: user, loading } = userDetail();
  const {
    register: userRegister,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: {
      first_name: user.first_name,
      email: user.email,
      last_name: user.last_name,
      phone: user.phone,
    },
    // defaultValues: { email: '', password:""},
  });

  const handleUpdateProfile = (values) => {
    updateUser(values);
  };

  return (
    <div className="right-side-wrap edit-profile-form-wrap">
      <h3 className="my-account-title text-24 weight-600">
        Edit Your Profile Details
      </h3>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="login-form"
        noValidate
      >
        <div className="row">
          {userProfile.map((field) => (
            <div key={field.name} className={`${field.class}`}>
              <Input
                type={field.type}
                name={field.name}
                register={userRegister}
                defaultValue={user[field.name]}
                control={control}
                errors={errors}
                placeholder={field.placeholder}
                className="form-control"
                setValue={setValue}
                trigger={trigger}
              />
            </div>
          ))}
          <div className="col-md-12">
            <Button
              type="submit"
              className="btn btn-theme mt-4 w-auto px-5"
              text={'Save Changes'}
              loading={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
