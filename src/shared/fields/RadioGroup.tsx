import React from 'react';

const RadioOption = ({
  label,
  value,
  register,
  name,
  defaultValue,
  className,
  type,
}: any) => {
  return (
    <div>
      <input
        type={type}
        id={value}
        value={value}
        {...register(name)}
        defaultChecked={defaultValue === value}
        className={className}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
};

export default RadioOption;
