import React from "react";

export default function Button(props) {
  const { text, onClick, className, buttonClassName, disabled, other } = props;

  return (
    <div className={className}>
      <button onClick={onClick} className={buttonClassName} disabled={disabled}>
        {other && other}
        {text}
      </button>
    </div>
  );
}
