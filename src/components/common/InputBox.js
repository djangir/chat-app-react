import React from "react";

function InputBox({ input, other }) {
  let { label } = other;
  return (
    <div className="form-group mb-3">
      <label>{label}</label>
      <input {...input} />
    </div>
  );
}

export default InputBox;
