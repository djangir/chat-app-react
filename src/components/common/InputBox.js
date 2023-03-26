import React from "react";

function InputBox(props) {
  const { input, other } = props;
  let { label } = other;

  return (
    <div className="form-group mb-3">
      {label && <label>{label}</label>}
      <input {...input} />
    </div>
  );
}

InputBox.defaultProps = {
  other: {},
};

export default InputBox;
