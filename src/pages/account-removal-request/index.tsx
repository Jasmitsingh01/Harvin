// import { yupResolver } from '@hookform/resolvers/yup';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { userDetail } from '../../stores/user/user-store';
// import { accountRemovalValidationSchema, profileValidationSchema } from '../../validations/auth/user';
// import { accountRemoval, updateUser } from '../../stores/user/user-action';
// import { accountRemovalProfile, userProfile } from '../../shared/fields/field-data';
// import Button from '../../shared/common/Button';
// import Input from '../../shared/fields/Input';

// const EditProfile = () => {
//   const { result: user, loading } = userDetail();
//   const {
//     register: userRegister,
//     handleSubmit,
//     control,
//     setValue,
//     trigger,
//     reset,
//     formState: { errors },
//   } = useForm<any>({
//     resolver: yupResolver(accountRemovalValidationSchema),
//     defaultValues: {
//       first_name: '',
//       email: '',
//       last_name:'',
//       phone_number: '',
//     },
//     // defaultValues: { email: '', password:""},
//   });

//   const [state, setClear] = useState('');

//   const handleUpdateProfile = (values) => {
//     debugger
//     accountRemoval(values);
//     reset();
//    setClear('')
//   };

//   return (

//     <section className="product-listing-title">
//     <div className="container">

//       <h3 className="my-account-title text-24 weight-600">
//        Account Removal Request
//       </h3>
//       <form
//         autoComplete="off"
//         onSubmit={handleSubmit(handleUpdateProfile)}
//         className="login-form"
//         noValidate
//       >
//         <div className="row">
//           {accountRemovalProfile.map((field) => (
//             <div key={field.name} className={`${field.class}`}>
//               <Input
//                 type={field.type}
//                 name={field.name}
//                 register={userRegister}

//                 control={control}
//                 errors={errors}
//                 placeholder={field.placeholder}
//                 className="form-control"
//                 setValue={setValue}
//                 trigger={trigger}
//                 value={state}
//                 onChange={(name, value) => {
//                     setClear(value);
//                     // handlePincodeChange();
//                   }}
//               />
//             </div>
//           ))}
//           <div className="col-md-12">
//             <Button
//               type="submit"
//               className="btn btn-theme mt-4 w-auto px-5"
//               text={'Submit'}
//               loading={loading}
//             />
//           </div>
//         </div>
//       </form>

//     </div>
//   </section>

//   );
// };

// export default EditProfile;

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { accountRemovalValidationSchema } from '../../validations/auth/user';
import { accountRemoval } from '../../stores/user/user-action';
import { accountRemovalProfile } from '../../shared/fields/field-data';
import Button from '../../shared/common/Button';
import Input from '../../shared/fields/Input';

const EditProfile = () => {
  const {
    register: userRegister,
    handleSubmit,
    control,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(accountRemovalValidationSchema),
    defaultValues: {
      first_name: '',
      email: '',
      last_name: '',
      phone_number: '',
    },
  });

  // Separate state for each input field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleUpdateProfile = (values) => {
    accountRemoval(values);
    reset();
    // Clear all states after submission
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
  };

  return (
    <section className="product-listing-title">
      <div className="container">
        <h3 className="my-account-title text-24 weight-600">
          Account Removal Request
        </h3>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="login-form"
          noValidate
        >
          <div className="row">
            {accountRemovalProfile.map((field) => (
              <div key={field.name} className={`${field.class}`}>
                <Input
                  type={field.type}
                  name={field.name}
                  register={userRegister}
                  control={control}
                  errors={errors}
                  placeholder={field.placeholder}
                  className="form-control"
                  setValue={setValue}
                  trigger={trigger}
                  // Pass appropriate state and setter function
                  value={
                    field.name === 'first_name'
                      ? firstName
                      : field.name === 'last_name'
                      ? lastName
                      : field.name === 'email'
                      ? email
                      : field.name === 'phone_number'
                      ? phoneNumber
                      : ''
                  }
                  onChange={(name, value) => {
                    // Update the correct state based on the input field name
                    if (field.name === 'first_name') setFirstName(value);
                    else if (field.name === 'last_name') setLastName(value);
                    else if (field.name === 'email') setEmail(value);
                    else if (field.name === 'phone_number')
                      setPhoneNumber(value);
                  }}
                />
              </div>
            ))}
            <div className="col-md-12">
              <Button
                type="submit"
                className="btn btn-theme mt-4 w-auto px-5"
                text={'Submit'}
                // loading={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
