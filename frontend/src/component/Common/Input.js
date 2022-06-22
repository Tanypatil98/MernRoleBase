import React from "react";

export default function Input(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    id,
    type,
    placeholder,
    className,
    labelClassName,
    inputClassName,
    errorClassName,
    maxLength,
    labelOtherProps,
    labelHeading,
    accept,
    onClick,
    imageProps,
    checked,
    multiple,
    disabled,
    min,
    max
  } = props;
  return (
    <div className={className}>
      {labelHeading && labelHeading}
      <label
        htmlFor={id}
        className={`${labelClassName} ${checked && "checked"}`}
      >
        {labelOtherProps && labelOtherProps}
        {label}
      </label>
      <input
        className={inputClassName}
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onClick={onClick}
        maxLength={maxLength}
        accept={accept}
        checked={checked}
        multiple={multiple}
        disabled={disabled}
        min={min}
        max={max}
      />
      {imageProps && imageProps}
      {error ? <span className={errorClassName}>{error}</span> : null}
    </div>
  );
}
