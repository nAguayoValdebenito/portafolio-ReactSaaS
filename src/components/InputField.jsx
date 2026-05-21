import { forwardRef } from 'react';

const InputField = forwardRef(({
  label, type, name, value, onChange, placeholder,
  required, rightElement, disabled,
  error, errorMessage, className = '',
}, ref) => (
  <div className="flex flex-col gap-2">
    <label className="font-label-md text-label-md text-on-surface" htmlFor={name}>
      {label}
    </label>
    <div className="relative w-full">
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error && errorMessage ? `${name}-error` : undefined}
        className={`w-full bg-surface-container-lowest border rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-outline shadow-sm focus:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-container-low ${
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-outline-variant focus:ring-primary focus:border-primary'
        } ${rightElement ? 'pr-10' : ''} ${className}`}
      />
      {rightElement && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {rightElement}
        </div>
      )}
    </div>
    {error && errorMessage && (
      <p id={`${name}-error`} className="font-body-sm text-body-sm text-red-600" role="alert">
        {errorMessage}
      </p>
    )}
  </div>
));

InputField.displayName = 'InputField';

export default InputField;
