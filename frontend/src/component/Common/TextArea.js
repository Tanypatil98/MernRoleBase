import React from "react";

export default function TextArea(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    type,
    placeholder,
    rows,
    className,
    labelClassName,
    inputClassName,
    errorClassName,
    maxLength,
  } = props;
  return (
    <div className={className}>
      <label className={labelClassName}>{label}</label>
      <textarea
        className={inputClassName}
        type={type}
        rows={rows}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
      {error ? <span className={errorClassName}>{error}</span> : null}
    </div>
  );
}
