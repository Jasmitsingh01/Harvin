// import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  name: string;
  type?: string;
  errors: string | any;
  options?: { value: string; label: string }[]; // Add options for radio
}
const TextInput = React.forwardRef<HTMLInputElement, Props | any>(
  (
    {
      className,
      // label,
      // note,
      name,
      errors,
      // children,
      type,
      // inputClassName,
      disabled,
      // value,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();
    const error = errors?.[name]?.message;
    return (
      <div>
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          className={className}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={disabled}
          // aria-invalid={errors ? 'true' : 'false'}
          {...rest}
        />
        {error && <p className="text-danger mt-2">{t(error)}</p>}
      </div>
    );
  }
);

TextInput.displayName = 'Input';
export default TextInput;
