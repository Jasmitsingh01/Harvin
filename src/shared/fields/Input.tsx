import React from 'react';
import { InputPropsType } from '../../interface/common';
import { useTranslation } from 'react-i18next';
const Input = ({
  name,
  key,
  value,
  placeholder,
  errors,
  type,
  onChange,
  maxLength,
  className,
  setValue,
  trigger,
  reset,
  clearErrors,
  rows,
  cols,
  inputMode,
  defaultValue,
  ...rest // ref
}: InputPropsType | any) => {
  const { t } = useTranslation();
  const error = errors?.[name]?.message;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setValue && setValue(name, type === 'checkbox' ? checked : value);
    setValue && setValue(name, value);
    trigger && trigger(name);
    onChange && onChange(name, value);
    clearErrors && clearErrors(name);
    reset && reset();
  };

  // useEffect(() => {
  //   // Set the value using setValue
  //   if(setValue){}
  //   setValue && setValue("email", 'suri@indapoint.com');
  // }, [name, setValue]);

  if (type === 'textarea') {
    return (
      <>
        <textarea
          // style={{border:error&&"1px solid red"}}
          key={key}
          rows={rows}
          cols={cols}
          type={type}
          value={value}
          name={name}
          // {...register(name)}
          // {...register(name)}
          placeholder={t(placeholder) || ''}
          className={className}
          onChange={handleInputChange}
          autoComplete="off"
          {...rest}
        />
        {error && <p className="text-danger mt-2">{t(error)}</p>}
      </>
    );
  }
  return (
    <>
      <input
        // style={{border:error&&"1px solid red"}}
        key={key}
        type={type}
        value={value}
        name={name}
        maxLength={maxLength && maxLength}
        defaultValue={defaultValue}
        // {...register(name)}
        // {...register(name)}
        placeholder={t(placeholder) || ''}
        className={className}
        onChange={handleInputChange}
        autoComplete="off"
        inputMode={inputMode}
        {...rest}
      />
      {error && <p className="text-danger mt-2">{t(error)}</p>}
    </>
  );
};

export default Input;
